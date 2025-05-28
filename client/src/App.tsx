import { Switch, Route } from "wouter";
import { ThemeProvider } from "next-themes";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import SplashScreen from "@/pages/SplashScreen";
import Welcome from "@/pages/Welcome";
import Terms from "@/pages/Terms";
import MastodonSetup from "@/pages/MastodonSetup";
import OAuthLoading from "@/pages/OAuthLoading";
import Redirect from "@/pages/Redirect";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import AboutPage from "@/pages/AboutPage";
import PostSchedulePage from "@/pages/PostSchedulePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={SplashScreen} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/terms" component={Terms} />
      <Route path="/mastodon-setup" component={MastodonSetup} />
      <Route path="/oauth-loading" component={OAuthLoading} />
      <Route path="/redirect" component={Redirect} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/post-schedule" component={PostSchedulePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
