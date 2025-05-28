import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import AppLayout from '@/components/layout/AppLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  MoonStar, 
  Sun, 
  Monitor, 
  Languages, 
  Clock, 
  BookOpen,
  Save
} from 'lucide-react';
import DataImportExport from '@/components/settings/DataImportExport';
import SocialMediaIntegration from '@/components/settings/SocialMediaIntegration';
import ArabicLanguageSettings from '@/components/settings/ArabicLanguageSettings';
import { useLocation } from 'wouter';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [, navigate] = useLocation();
  const [username, setUsername] = useState<string | null>(null);
  
  // Post settings
  const [postTime, setPostTime] = useState('05:00');
  const [includeEnglish, setIncludeEnglish] = useState(true);
  const [includeArabic, setIncludeArabic] = useState(true);
  const [includeReference, setIncludeReference] = useState(true);
  
  // Arabic language settings
  const [arabicFontSize, setArabicFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [arabicTextAlign, setArabicTextAlign] = useState<'right' | 'center'>('right');
  
  // Social media connections
  const [mastodonConnected, setMastodonConnected] = useState(false);
  const [mastodonInstance, setMastodonInstance] = useState<string | undefined>(undefined);
  const [facebookConnected, setFacebookConnected] = useState(false);

  // Check if user is logged in
  React.useEffect(() => {
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

  const saveSettings = () => {
    // In a real implementation, we would save these settings to the server
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <AppLayout username={username || undefined}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Settings</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Customize your Wird experience and post preferences
            </p>
          </div>
          
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <MoonStar className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="posting" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Posting</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="connections" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>Connections</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Data</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how Wird looks on your device
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                      <Button 
                        variant={theme === 'light' ? 'default' : 'outline'} 
                        className="w-full sm:w-auto justify-start"
                        onClick={() => setTheme('light')}
                      >
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                      </Button>
                      <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'} 
                        className="w-full sm:w-auto justify-start"
                        onClick={() => setTheme('dark')}
                      >
                        <MoonStar className="mr-2 h-4 w-4" />
                        Dark
                      </Button>
                      <Button 
                        variant={theme === 'system' ? 'default' : 'outline'} 
                        className="w-full sm:w-auto justify-start"
                        onClick={() => setTheme('system')}
                      >
                        <Monitor className="mr-2 h-4 w-4" />
                        System
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full sm:w-52">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center">
                            <span className="mr-2">🇬🇧</span>
                            <span>English</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ar">
                          <div className="flex items-center">
                            <span className="mr-2">🇸🇦</span>
                            <span>العربية</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Change the language of the interface
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="posting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Posting Schedule</CardTitle>
                  <CardDescription>
                    Customize when and how Quran verses are posted to your Mastodon account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="postTime">Daily Post Time</Label>
                    <input
                      id="postTime"
                      type="time"
                      value={postTime}
                      onChange={(e) => setPostTime(e.target.value)}
                      className="flex h-10 w-full sm:w-52 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Set the time when verses will be posted daily (24-hour format)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="auto-post" 
                      checked={true} 
                      disabled 
                    />
                    <Label htmlFor="auto-post">Enable automatic posting</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                  <CardDescription>
                    Customize how Quran verses appear in your posts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-arabic">Include Arabic Text</Label>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Display the original Arabic verse text
                      </p>
                    </div>
                    <Switch 
                      id="include-arabic" 
                      checked={includeArabic}
                      onCheckedChange={setIncludeArabic}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-english">Include English Translation</Label>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Display the English translation of the verse
                      </p>
                    </div>
                    <Switch 
                      id="include-english" 
                      checked={includeEnglish}
                      onCheckedChange={setIncludeEnglish}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-reference">Include Verse Reference</Label>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Display the Surah name and verse number
                      </p>
                    </div>
                    <Switch 
                      id="include-reference" 
                      checked={includeReference}
                      onCheckedChange={setIncludeReference}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end">
            <Button onClick={saveSettings} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default SettingsPage;