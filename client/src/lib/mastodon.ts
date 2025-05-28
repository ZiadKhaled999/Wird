import { apiRequest } from './queryClient';

// Initialize Mastodon authentication
export async function initMastodonAuth(instance: string) {
  try {
    const response = await apiRequest('POST', '/api/auth/mastodon/init', { instance });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initializing Mastodon auth:', error);
    throw error;
  }
}

// Handle manual posting (for testing)
export async function triggerManualPost(username: string) {
  try {
    const response = await apiRequest('POST', '/api/post/manual', { username });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error triggering manual post:', error);
    throw error;
  }
}

// Reset user progress
export async function resetProgress(username: string) {
  try {
    const response = await apiRequest('POST', '/api/user/reset', { username });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting progress:', error);
    throw error;
  }
}

// Disconnect Mastodon account
export async function disconnectMastodon(username: string) {
  try {
    const response = await apiRequest('POST', '/api/user/disconnect', { username });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error disconnecting Mastodon:', error);
    throw error;
  }
}
