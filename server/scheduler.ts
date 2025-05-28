import { scheduleJob } from 'node-schedule';
import { storage } from './storage';
import { MastodonClient } from './mastodon';
import { getVerseByIndex, formatVerseForPosting } from './verses';

export async function postDailyVerse(userId: number): Promise<boolean> {
  try {
    console.log(`Posting daily verse for user ID: ${userId}`);
    
    // Get the user
    const user = await storage.getUser(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return false;
    }
    
    // Check if the user has Mastodon credentials
    if (!user.mastodonInstance || !user.mastodonAccessToken) {
      console.error(`User ${userId} missing Mastodon credentials`);
      return false;
    }
    
    // Get the verse based on current index
    const verse = await getVerseByIndex(user.currentVerseIndex || 0);
    if (!verse) {
      console.error(`No verse found for index ${user.currentVerseIndex}`);
      return false;
    }
    
    // Format the verse for posting
    const status = await formatVerseForPosting(verse);
    
    // Post to Mastodon
    const mastodon = new MastodonClient(
      user.mastodonInstance,
      user.mastodonAccessToken
    );
    
    const result = await mastodon.postStatus(status);
    
    // Log the post in our database
    await storage.createPost({
      userId: user.id,
      verseId: verse.id,
      postId: result.id,
      postedAt: new Date(),
      success: true,
    });
    
    // Update user's stats
    await storage.incrementDaysPosted(user.id);
    
    // Get total verse count to handle wrapping
    const totalVerses = await storage.getTotalVerseCount();
    const nextIndex = (user.currentVerseIndex + 1) % totalVerses;
    await storage.updateCurrentVerseIndex(user.id, nextIndex);
    
    console.log(`Successfully posted verse for user ${userId}, new index: ${nextIndex}`);
    return true;
  } catch (error) {
    console.error(`Error posting verse for user ${userId}:`, error);
    
    // Log the error
    try {
      const user = await storage.getUser(userId);
      const verse = user ? await getVerseByIndex(user.currentVerseIndex || 0) : undefined;
      
      if (user && verse) {
        await storage.createPost({
          userId: user.id,
          verseId: verse.id,
          postedAt: new Date(),
          success: false,
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      }
    } catch (logError) {
      console.error('Error logging failed post:', logError);
    }
    
    return false;
  }
}

export function scheduleDailyPosts(): void {
  // Schedule job to run at 5:00 AM every day
  scheduleJob('0 5 * * *', async () => {
    console.log('Running scheduled daily verse posting at 5:00 AM');
    
    try {
      // Get all users with Mastodon setup
      const allUsers = await storage.getAllUsersWithMastodon();
      
      // Post for each user
      for (const user of allUsers) {
        try {
          await postDailyVerse(user.id);
        } catch (error) {
          console.error(`Error posting for user ${user.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in daily posting scheduler:', error);
    }
  });
  
  console.log('Daily post scheduler initialized for 5:00 AM');
}

// Mock function for the MemStorage implementation
// In a real app, we'd implement this in storage.ts
storage.getAllUsersWithMastodon = async function(): Promise<any[]> {
  return Array.from(this.users.values()).filter(
    user => user.mastodonInstance && user.mastodonAccessToken
  );
};
