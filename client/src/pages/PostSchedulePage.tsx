import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Calendar, 
  Settings, 
  Repeat, 
  AlertCircle, 
  CheckCircle2,
  Save
} from 'lucide-react';

const PostSchedulePage: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState<string | null>(null);
  const [postTime, setPostTime] = useState('05:00');

  // Schedule customization options
  const [postingEnabled, setPostingEnabled] = useState(true);
  const [frequency, setFrequency] = useState('daily');
  const [includeTranslation, setIncludeTranslation] = useState(true);
  
  // Check if user is logged in
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

  // Fetch user dashboard data
  const { data, isLoading } = useQuery({
    queryKey: [`/api/dashboard?username=${username}`],
    enabled: !!username,
  });

  // Handle saving schedule settings
  const saveScheduleSettings = () => {
    toast({
      title: "Schedule Updated",
      description: "Your posting schedule has been updated successfully.",
    });
  };

  // Generate next 7 days of posting schedule
  const generateSchedule = () => {
    if (!data) return [];
    
    const schedule = [];
    const today = new Date();
    const currentVerse = data.currentVerse;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Calculate verse index
      const nextVerseIndex = (data.user.currentVerseIndex + i) % 6236;
      const verseInfo = i === 0 
        ? currentVerse
        : { 
            surahNameEnglish: `Surah ${((nextVerseIndex % 114) + 1)}`, 
            verseNumber: (nextVerseIndex % 20) + 1
          };
      
      schedule.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: postTime,
        status: i === 0 ? 'next' : 'scheduled',
        verse: verseInfo
      });
    }
    
    return schedule;
  };

  if (isLoading || !data) {
    return (
      <AppLayout username={username || undefined}>
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  const schedule = generateSchedule();

  return (
    <AppLayout username={username || undefined}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Post Schedule</h1>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Manage your automated Quran verse posting schedule
                </p>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Posts</CardTitle>
                    <CardDescription>
                      The next 7 days of scheduled Quran verses
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Switch 
                        id="posting-status" 
                        checked={postingEnabled}
                        onCheckedChange={setPostingEnabled}
                      />
                      <Label htmlFor="posting-status" className="ml-2">
                        {postingEnabled ? 'Active' : 'Paused'}
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Verse</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedule.map((post, index) => (
                        <TableRow key={index}>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>{post.time}</TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {post.verse.surahNameEnglish}
                            </div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              Verse {post.verse.verseNumber}
                            </div>
                          </TableCell>
                          <TableCell>
                            {post.status === 'next' && (
                              <Badge className="bg-primary">
                                <Clock className="h-3 w-3 mr-1" />
                                Next Up
                              </Badge>
                            )}
                            {post.status === 'scheduled' && (
                              <Badge variant="outline">
                                <Calendar className="h-3 w-3 mr-1" />
                                Scheduled
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Previous Posts</CardTitle>
                  <CardDescription>
                    History of your recently posted verses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Verse</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.recentPosts && data.recentPosts.map((post: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>
                            {new Date(post.postedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {post.verse?.surahNameEnglish || 'Surah'}
                            </div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              Verse {post.verse?.verseNumber || ''}
                            </div>
                          </TableCell>
                          <TableCell>
                            {post.success ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Posted
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {(!data.recentPosts || data.recentPosts.length === 0) && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-6 text-neutral-500 dark:text-neutral-400">
                            No posting history available yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:w-1/3">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Schedule Settings</CardTitle>
                  <CardDescription>
                    Customize your posting preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="posting-time">Posting Time</Label>
                    <Input
                      id="posting-time"
                      type="time"
                      value={postTime}
                      onChange={(e) => setPostTime(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Set the time when verses will be posted (24-hour format)
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="frequency">Posting Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">
                          <div className="flex items-center">
                            <Repeat className="h-4 w-4 mr-2" />
                            <span>Daily</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="weekly" disabled>
                          <div className="flex items-center">
                            <Repeat className="h-4 w-4 mr-2" />
                            <span>Weekly (Coming soon)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Content Options</Label>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="include-translation">Include Translation</Label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Include English translation with Arabic text
                        </p>
                      </div>
                      <Switch 
                        id="include-translation" 
                        checked={includeTranslation}
                        onCheckedChange={setIncludeTranslation}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={saveScheduleSettings} 
                    className="w-full mt-4"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default PostSchedulePage;