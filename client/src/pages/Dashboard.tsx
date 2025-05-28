import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, Clock, ExternalLink, Server, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import CountdownTimer from '@/components/dashboard/CountdownTimer';
import PostPreview from '@/components/dashboard/PostPreview';
import { resetProgress, disconnectMastodon } from '@/lib/mastodon';
import IslamicPattern from '@/assets/IslamicPattern';

interface DashboardData {
  user: {
    id: number;
    username: string;
    mastodonInstance: string;
    daysPosted: number;
    currentVerseIndex: number;
  };
  stats: {
    daysPosted: number;
    timeUntilNextPost: number;
  };
  currentVerse: {
    id: number;
    surahNumber: number;
    surahName: string;
    surahNameEnglish: string;
    verseNumber: number;
    verseText: string;
    verseTextEnglish: string;
  };
  nextVerse: {
    id: number;
    surahNameEnglish: string;
    verseNumber: number;
  };
  recentPosts: any[];
}

const Dashboard: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check URL params for username and authenticated flag
    const params = new URLSearchParams(window.location.search);
    const usernameParam = params.get('username');
    const authenticated = params.get('authenticated');
    
    if (usernameParam && authenticated === 'true') {
      setUsername(usernameParam);
      // Clean URL
      window.history.replaceState({}, document.title, '/dashboard');
    } else {
      // Check if username is in sessionStorage
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
    }
  }, [navigate, toast]);

  // Fetch dashboard data
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: [`/api/dashboard?username=${username}`],
    enabled: !!username,
    refetchInterval: 60000, // Refresh every minute to update countdown
  });

  // Reset progress mutation
  const resetMutation = useMutation({
    mutationFn: () => resetProgress(username!),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your progress has been reset.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/dashboard?username=${username}`] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to reset progress: ${error}`,
        variant: "destructive",
      });
    },
  });

  // Disconnect mutation
  const disconnectMutation = useMutation({
    mutationFn: () => disconnectMastodon(username!),
    onSuccess: () => {
      toast({
        title: "Account Disconnected",
        description: "Your Mastodon account has been disconnected.",
      });
      sessionStorage.removeItem('username');
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to disconnect account: ${error}`,
        variant: "destructive",
      });
    },
  });

  if (isLoading || !data) {
    return (
      <AppLayout username={username || undefined}>
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout username={username || undefined}>
        <Card className="p-8 max-w-3xl mx-auto">
          <CardContent className="p-0">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Error Loading Dashboard</h1>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {error instanceof Error ? error.message : "An unknown error occurred."}
              </p>
              <Button 
                onClick={() => queryClient.invalidateQueries({ queryKey: [`/api/dashboard?username=${username}`] })}
                className="bg-primary-500 hover:bg-primary-600"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </AppLayout>
    );
  }

  const { user, stats, currentVerse, nextVerse } = data;

  return (
    <AppLayout username={username || undefined}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card max-w-5xl mx-auto p-8"
      >
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">Dashboard</h1>
            <p className="text-neutral-600 dark:text-neutral-300">Your daily Quran verse automation is active</p>
          </div>
          <Badge variant="outline" className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Active</span>
          </Badge>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Section */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-24 relative">
                <div className="absolute inset-0 opacity-20">
                  <IslamicPattern />
                </div>
              </div>
              
              <CardContent className="px-6 pb-6 -mt-12">
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full border-4 border-white dark:border-neutral-800 overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                    <div className="h-full w-full flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                      <User className="h-8 w-8" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {user.username}
                  </h2>
                  <div className="flex items-center justify-center mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <Server className="h-3 w-3 mr-1.5" />
                    <span>{user.mastodonInstance}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <a 
                    href={`https://${user.mastodonInstance}/@${user.username.split('@')[0]}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary-500 hover:text-secondary-600 text-sm flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-1.5" />
                    <span>View Profile</span>
                  </a>
                </div>
              </CardContent>
            </Card>
            
            {/* Settings Section */}
            <Card className="p-6">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Daily Post Time</label>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Posts will be published at this time</p>
                  </div>
                  <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    5:00 AM
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Reset Progress</label>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Start the cycle from the beginning</p>
                  </div>
                  <Button 
                    variant="destructive"
                    size="sm"
                    onClick={() => resetMutation.mutate()}
                    disabled={resetMutation.isPending}
                    className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 px-3 py-1.5 rounded text-sm font-medium"
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Disconnect Account</label>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Stop posting and remove connection</p>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => disconnectMutation.mutate()}
                    disabled={disconnectMutation.isPending}
                    className="bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 px-3 py-1.5 rounded text-sm font-medium"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Stats and Next Post */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Days Counter */}
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <CalendarCheck className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Days Posted</h3>
                    <div className="mt-1 flex items-baseline">
                      <p className="text-3xl font-semibold text-neutral-900 dark:text-white">
                        {stats.daysPosted}
                      </p>
                      <p className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">days</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Next Post Countdown */}
              <Card className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                    <Clock className="h-5 w-5 text-secondary-500 dark:text-secondary-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Next Post In</h3>
                    <div className="mt-1">
                      <CountdownTimer targetTime={Date.now() + stats.timeUntilNextPost} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Current Verse Preview */}
            <Card className="p-6">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Latest Post</h2>
              
              <PostPreview
                verseText={currentVerse.verseText}
                reference={`[Surah ${currentVerse.surahNameEnglish}, Verse ${currentVerse.verseNumber}]`}
                username={user.username}
                postTime="Posted today at 5:00 AM"
                postUrl={`https://${user.mastodonInstance}/@${user.username.split('@')[0]}`}
              />
              
              {/* Next Post Preview */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Coming Tomorrow</h3>
                <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Next verse from <span className="font-medium text-neutral-900 dark:text-white">
                      Surah {nextVerse.surahNameEnglish}, Verse {nextVerse.verseNumber}
                    </span> will be posted tomorrow at 5:00 AM.
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Post History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Recent Posts</h2>
                <a href="#" className="text-sm text-secondary-500 hover:text-secondary-600">View All</a>
              </div>
              
              <div className="space-y-4">
                {/* Display recent posts if available */}
                {data.recentPosts && data.recentPosts.length > 0 ? (
                  data.recentPosts.map((post, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0 last:pb-0">
                      <div className="min-w-[48px] text-center">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                          <span className="text-xs font-medium text-primary-800 dark:text-primary-300">
                            {new Date(post.postedAt).getDate()}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          {new Date(post.postedAt).toLocaleString('default', { month: 'short' }).toUpperCase()}
                        </p>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          Surah {post.verse?.surahNameEnglish}, Verse {post.verse?.verseNumber}
                        </p>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 font-amiri" dir="rtl">
                          {post.verse?.verseText}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-neutral-500 dark:text-neutral-400">
                    <p>No posts yet. Your first post will appear here tomorrow!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
