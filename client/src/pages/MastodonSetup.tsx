import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';
import { initMastodonAuth } from '@/lib/mastodon';
import { Globe } from 'lucide-react';

const MastodonSetup: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [instance, setInstance] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instance.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Mastodon instance",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store instance in sessionStorage for later use in OAuth flow
      sessionStorage.setItem('mastodonInstance', instance);
      
      // Initialize Mastodon OAuth
      const data = await initMastodonAuth(instance);
      
      // Store OAuth credentials in sessionStorage
      sessionStorage.setItem('mastodonClientId', data.client_id);
      sessionStorage.setItem('mastodonClientSecret', data.client_secret);
      sessionStorage.setItem('mastodonRedirectUri', data.redirect_uri);
      sessionStorage.setItem('mastodonAuthUrl', data.auth_url);
      
      // Navigate to OAuth loading screen
      navigate('/oauth-loading');
    } catch (error) {
      console.error('Error connecting to Mastodon:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Mastodon instance. Please check the URL and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-3xl mx-auto">
          <CardContent className="p-0">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Connect Mastodon Account</h1>
              <p className="text-neutral-600 dark:text-neutral-300">Enter your Mastodon instance to get started</p>
            </div>
            
            {/* Mosque architecture image */}
            <div className="relative w-full h-40 mb-6 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=300" 
                alt="Beautiful mosque architecture" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="mastodon-instance" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Mastodon Instance
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Globe className="h-5 w-5" />
                  </div>
                  <Input
                    id="mastodon-instance"
                    placeholder="mastodon.social"
                    className="pl-10"
                    value={instance}
                    onChange={(e) => setInstance(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  For example: mastodon.social, fosstodon.org, etc.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/terms')}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600"
                >
                  {isLoading ? 'Connecting...' : 'Connect to Mastodon'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default MastodonSetup;
