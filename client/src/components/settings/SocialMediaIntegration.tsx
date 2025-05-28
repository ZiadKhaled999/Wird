import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Facebook, Globe, LogIn, LogOut, Check, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SocialMediaIntegrationProps {
  mastodonConnected: boolean;
  mastodonInstance?: string;
  facebookConnected: boolean;
  facebookPageName?: string;
  onConnectMastodon: () => void;
  onDisconnectMastodon: () => void;
  onConnectFacebook: () => void;
  onDisconnectFacebook: () => void;
  onTogglePlatform: (platform: 'mastodon' | 'facebook', enabled: boolean) => void;
}

const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({
  mastodonConnected,
  mastodonInstance,
  facebookConnected,
  facebookPageName,
  onConnectMastodon,
  onDisconnectMastodon,
  onConnectFacebook,
  onDisconnectFacebook,
  onTogglePlatform
}) => {
  const { toast } = useToast();
  const [mastodonEnabled, setMastodonEnabled] = useState(mastodonConnected);
  const [facebookEnabled, setFacebookEnabled] = useState(facebookConnected);

  const handleMastodonToggle = (enabled: boolean) => {
    setMastodonEnabled(enabled);
    onTogglePlatform('mastodon', enabled);
    
    toast({
      title: enabled ? "Mastodon posting enabled" : "Mastodon posting disabled",
      description: enabled 
        ? "Daily verses will be posted to your Mastodon account" 
        : "Daily verses will not be posted to your Mastodon account",
    });
  };

  const handleFacebookToggle = (enabled: boolean) => {
    setFacebookEnabled(enabled);
    onTogglePlatform('facebook', enabled);
    
    toast({
      title: enabled ? "Facebook posting enabled" : "Facebook posting disabled",
      description: enabled 
        ? "Daily verses will be posted to your Facebook page" 
        : "Daily verses will not be posted to your Facebook page",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Connections</CardTitle>
        <CardDescription>
          Connect your social media accounts to post Quran verses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mastodon" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="mastodon" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Mastodon</span>
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mastodon" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mastodon-enabled">Enable Mastodon Posting</Label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Post daily verses to your Mastodon account
                </p>
              </div>
              <Switch 
                id="mastodon-enabled" 
                checked={mastodonEnabled}
                onCheckedChange={handleMastodonToggle}
                disabled={!mastodonConnected}
              />
            </div>
            
            <Separator className="my-4" />
            
            {mastodonConnected ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                      Connected to Mastodon
                    </h3>
                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                      {mastodonInstance ? `Instance: ${mastodonInstance}` : "Your Mastodon account is connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={onDisconnectMastodon}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-neutral-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Connect your Mastodon account
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Connect to post Quran verses to your Mastodon timeline
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-3"
                  onClick={onConnectMastodon}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Connect Mastodon
                </Button>
              </div>
            )}
            
            <div className="mt-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-4 w-4 text-neutral-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">About Mastodon Integration</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Mastodon is a federated social network that allows you to connect to different instances while still being able to interact with users on other instances.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="facebook" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="facebook-enabled">Enable Facebook Posting</Label>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Post daily verses to your Facebook page
                </p>
              </div>
              <Switch 
                id="facebook-enabled" 
                checked={facebookEnabled}
                onCheckedChange={handleFacebookToggle}
                disabled={!facebookConnected}
              />
            </div>
            
            <Separator className="my-4" />
            
            {facebookConnected ? (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Connected to Facebook
                    </h3>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      {facebookPageName ? `Page: ${facebookPageName}` : "Your Facebook page is connected"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={onDisconnectFacebook}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-neutral-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Connect your Facebook account
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Connect to post Quran verses to your Facebook page
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-3 bg-[#1877F2] hover:bg-[#0D62D0]"
                  onClick={onConnectFacebook}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Connect Facebook
                </Button>
              </div>
            )}
            
            <div className="mt-4 p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-4 w-4 text-neutral-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">About Facebook Integration</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    You'll need to grant permission for the app to post to your Facebook page. We only request the minimum permissions needed to post on your behalf.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SocialMediaIntegration;