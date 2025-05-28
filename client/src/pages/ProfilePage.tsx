import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
  Card 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import PostPreview from '@/components/dashboard/PostPreview';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Link2, 
  Grid,
  Clock8, 
  Settings,
  ListIcon,
  Share2
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please connect your Mastodon account first.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, toast]);

  // Fetch user profile data
  const { data, isLoading } = useQuery({
    queryKey: [`/api/dashboard?username=${username}`],
    enabled: !!username,
  });

  if (isLoading || !data) {
    return (
      <AppLayout username={username || undefined}>
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  const { user, stats, currentVerse, recentPosts } = data;
  const displayName = username?.split('@')[0] || 'User';
  const mastodonInstance = user.mastodonInstance;

  // Create some dummy stats for the profile page
  const joinDate = new Date(user.startDate || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <AppLayout username={username || undefined}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/80 to-secondary/80 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-opacity-30 flex items-end p-6">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">
                  {displayName}'s Profile
                </h1>
              </div>
            </div>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-8 border-4 border-white dark:border-neutral-800 rounded-full">
              <Avatar className="h-32 w-32">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${displayName}`} />
                <AvatarFallback className="bg-primary text-2xl">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Action Buttons */}
            <div className="absolute -bottom-16 right-4 flex space-x-2">
              <Button onClick={() => navigate('/settings')} variant="outline" size="sm" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="mt-20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {displayName}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span>@{displayName}</span>
                  <Badge variant="outline" className="text-xs">
                    {mastodonInstance}
                  </Badge>
                </div>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg text-neutral-900 dark:text-white">{stats.daysPosted}</div>
                  <div className="text-neutral-600 dark:text-neutral-400">Posts</div>
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div className="text-center">
                  <div className="font-bold text-lg text-neutral-900 dark:text-white">{user.currentVerseIndex}</div>
                  <div className="text-neutral-600 dark:text-neutral-400">Verse Index</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Joined {joinDate}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Posts at 5:00 AM daily</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Connected to {mastodonInstance}</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                <Link2 className="h-4 w-4 mr-2" />
                <a 
                  href={`https://${mastodonInstance}/@${displayName}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Mastodon
                </a>
              </div>
            </div>

            {/* Recent Posts Tab */}
            <Tabs defaultValue="posts" className="w-full mt-8">
              <TabsList className="mb-4">
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  <span>Posts</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Clock8 className="h-4 w-4" />
                  <span>Schedule</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <ListIcon className="h-4 w-4" />
                  <span>Stats</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-6">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                  Recent Posts
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Post */}
                  <PostPreview
                    verseText={currentVerse.verseText}
                    reference={`[Surah ${currentVerse.surahNameEnglish}, Verse ${currentVerse.verseNumber}]`}
                    username={displayName}
                    postTime="Posted today at 5:00 AM"
                    postUrl={`https://${mastodonInstance}/@${displayName}`}
                  />

                  {/* Recent Posts */}
                  {recentPosts && recentPosts.slice(0, 3).map((post, index) => (
                    <PostPreview
                      key={index}
                      verseText={post.verse?.verseText || ""}
                      reference={`[Surah ${post.verse?.surahNameEnglish || ""}, Verse ${post.verse?.verseNumber || ""}]`}
                      username={displayName}
                      postTime={new Date(post.postedAt).toLocaleString()}
                      postUrl={`https://${mastodonInstance}/@${displayName}`}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Posting Schedule</CardTitle>
                    <CardDescription>
                      View and manage your scheduled Quran verse posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                        <div>
                          <h3 className="font-medium">Daily Quran Verse</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Posts at 5:00 AM every day
                          </p>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      
                      <div className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                        <h3 className="font-medium mb-2">Next Scheduled Post</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Verse:</span>
                            <span className="text-sm font-medium">
                              Surah {data.nextVerse.surahNameEnglish}, Verse {data.nextVerse.verseNumber}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Time:</span>
                            <span className="text-sm font-medium">5:00 AM Tomorrow</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={() => navigate('/post-schedule')} variant="outline" size="sm">
                      View Full Schedule
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Posting Statistics</CardTitle>
                    <CardDescription>
                      An overview of your Quran verse posting activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                        <h3 className="text-sm text-neutral-600 dark:text-neutral-400">
                          Total Days
                        </h3>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {stats.daysPosted}
                        </p>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                        <h3 className="text-sm text-neutral-600 dark:text-neutral-400">
                          Completion
                        </h3>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {Math.round((user.currentVerseIndex / 6236) * 100)}%
                        </p>
                      </div>
                      <div className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg">
                        <h3 className="text-sm text-neutral-600 dark:text-neutral-400">
                          Streak
                        </h3>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {stats.daysPosted} days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default ProfilePage;