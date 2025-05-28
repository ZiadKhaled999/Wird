import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MastodonClient } from "./mastodon";
import { initializeVerses } from "./verses";
import { scheduleDailyPosts, postDailyVerse } from "./scheduler";
import { z } from "zod";
import { updateUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Quran verses
  await initializeVerses();
  
  // Setup daily post scheduler
  scheduleDailyPosts();
  
  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  // User profile route
  app.get("/api/user/profile", async (req, res) => {
    try {
      // In a real app, we'd get the user ID from a session
      const username = req.query.username as string;
      if (!username) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send sensitive data to the client
      const { password, mastodonAccessToken, ...safeUser } = user;
      
      res.json(safeUser);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  });
  
  // Mastodon OAuth initialization
  app.post("/api/auth/mastodon/init", async (req, res) => {
    try {
      const { instance } = z.object({
        instance: z.string().min(1),
      }).parse(req.body);
      
      // Create Mastodon app for this instance
      const mastodon = new MastodonClient(instance);
      
      // Get domain for the redirect URI
      const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || req.headers.host || '';
      
      const app = await mastodon.createApp(domain);
      
      // We'll use the original redirect_uri for the OAuth flow
      // This is important because some Mastodon instances validate the exact redirect URI
      const authUrl = mastodon.getAuthorizationUrl(app.client_id, app.redirect_uri);
      
      // We'll include state parameter in the authorization URL to help with the callback
      const stateParam = Buffer.from(JSON.stringify({
        instance,
        client_id: app.client_id,
        client_secret: app.client_secret
      })).toString('base64');
      
      // Append state to the auth URL
      const finalAuthUrl = `${authUrl}&state=${stateParam}`;
      
      // Store client credentials in session (in a real app)
      // For this example, we'll send it back to the client
      res.json({
        instance,
        client_id: app.client_id,
        client_secret: app.client_secret,
        redirect_uri: app.redirect_uri,
        auth_url: finalAuthUrl,
        state: stateParam
      });
    } catch (error) {
      console.error("Mastodon auth init error:", error);
      res.status(500).json({ message: "Failed to initialize Mastodon authentication", error: String(error) });
    }
  });
  
  // Mastodon OAuth callback
  app.get("/api/auth/callback", async (req, res) => {
    try {
      const { code, state } = req.query;
      console.log("Received callback with code:", code);
      console.log("Full query params:", req.query);
      
      if (!code) {
        return res.status(400).json({ message: "Authorization code missing" });
      }
      let instance, client_id, client_secret;
      
      if (state) {
        try {
          // Decode state parameter which should contain our OAuth credentials
          const stateData = JSON.parse(Buffer.from(state as string, 'base64').toString());
          instance = stateData.instance;
          client_id = stateData.client_id;
          client_secret = stateData.client_secret;
          
          console.log("Successfully decoded state parameter with OAuth credentials");
        } catch (error) {
          console.error("Failed to decode state parameter:", error);
        }
      }
      
      // If we couldn't get the credentials from state, try query parameters as fallback
      if (!instance || !client_id || !client_secret) {
        instance = req.query.instance as string;
        client_id = req.query.client_id as string;
        client_secret = req.query.client_secret as string;
      }
      
      if (!instance || !client_id || !client_secret) {
        console.error("Missing OAuth parameters:", { 
          instance: instance || "missing", 
          client_id: client_id ? "present" : "missing", 
          client_secret: client_secret ? "present" : "missing"
        });
        
        // Instead of showing an error, redirect to a page to collect missing parameters
        return res.redirect('/?auth_error=missing_params');
      }
      
      // Reconstruct the redirect URI - this must match exactly what was used during authorization
      const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || req.headers.host || '';
      const redirect_uri = `https://${domain}/api/auth/callback`;
      
      const mastodon = new MastodonClient(instance as string);
      
      // Exchange code for token
      const token = await mastodon.getAccessToken(
        client_id as string,
        client_secret as string,
        redirect_uri as string,
        code as string
      );
      
      // Verify credentials to get account info
      const mastodonWithToken = new MastodonClient(instance as string, token.access_token);
      const account = await mastodonWithToken.verifyCredentials();
      
      // In a real app, we'd associate this with the logged-in user
      // For this example, create/update a user
      let user = await storage.getUserByMastodonId(account.id);
      
      if (user) {
        // Update existing user
        user = await storage.updateUser(user.id, {
          mastodonInstance: instance as string,
          mastodonAccessToken: token.access_token,
        });
      } else {
        // Create new user
        const username = `${account.username}@${instance}`;
        // In a real app, we'd have a proper registration flow
        const password = "placeholder"; // Not secure, just for demo
        
        user = await storage.createUser({
          username,
          password,
          mastodonInstance: instance as string,
          mastodonAccessToken: token.access_token,
          mastodonId: account.id,
          startDate: new Date(),
          currentVerseIndex: 0,
          daysPosted: 0,
        });
      }
      
      // Redirect to dashboard with user info
      if (user && user.username) {
        res.redirect(`/?username=${user.username}&authenticated=true`);
      } else {
        res.status(500).json({ message: "Failed to create or update user" });
      }
    } catch (error) {
      console.error("Mastodon callback error:", error);
      res.status(500).json({ message: "Failed to complete authentication", error: String(error) });
    }
  });
  
  // Dashboard data
  app.get("/api/dashboard", async (req, res) => {
    try {
      const username = req.query.username as string;
      if (!username) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Get recent posts
      const recentPosts = await storage.getRecentPostsByUserId(user.id, 5);
      
      // Get current and next verse
      const currentVerse = await storage.getVerseByIndex(user.currentVerseIndex || 0);
      const nextVerse = await storage.getVerseByIndex(((user.currentVerseIndex || 0) + 1) % await storage.getTotalVerseCount());
      
      // Calculate time until next post (5 AM tomorrow)
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(5, 0, 0, 0);
      const timeUntilNextPost = tomorrow.getTime() - now.getTime();
      
      // Don't send sensitive data to the client
      const { password, mastodonAccessToken, ...safeUser } = user;
      
      res.json({
        user: safeUser,
        stats: {
          daysPosted: user.daysPosted || 0,
          timeUntilNextPost,
        },
        currentVerse,
        nextVerse,
        recentPosts,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  });
  
  // Manual post trigger (for testing)
  app.post("/api/post/manual", async (req, res) => {
    try {
      const { username } = z.object({
        username: z.string(),
      }).parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const success = await postDailyVerse(user.id);
      
      if (success) {
        res.json({ message: "Post successful" });
      } else {
        res.status(500).json({ message: "Failed to post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  });
  
  // Reset progress
  app.post("/api/user/reset", async (req, res) => {
    try {
      const { username } = z.object({
        username: z.string(),
      }).parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      await storage.updateUser(user.id, {
        currentVerseIndex: 0,
        daysPosted: 0,
        startDate: new Date(),
      });
      
      res.json({ message: "Progress reset successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  });
  
  // Disconnect Mastodon
  app.post("/api/user/disconnect", async (req, res) => {
    try {
      const { username } = z.object({
        username: z.string(),
      }).parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      await storage.updateUser(user.id, {
        mastodonInstance: null,
        mastodonAccessToken: null,
        mastodonId: null,
      });
      
      res.json({ message: "Account disconnected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
