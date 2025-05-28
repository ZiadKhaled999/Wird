import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';

const Redirect: React.FC = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [authUrl, setAuthUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get the auth URL from session storage
    const url = sessionStorage.getItem('mastodonAuthUrl');
    if (!url) {
      toast({
        title: "Error",
        description: "Authorization URL not found. Please try again.",
        variant: "destructive",
      });
      navigate('/mastodon-setup');
      return;
    }
    
    setAuthUrl(url);
  }, [navigate, toast]);

  const handleRedirect = () => {
    if (authUrl) {
      // Make sure we store all necessary OAuth parameters in the session storage
      // These will be needed when we're redirected back to the callback URL
      const instance = sessionStorage.getItem('mastodonInstance');
      const clientId = sessionStorage.getItem('mastodonClientId');
      const clientSecret = sessionStorage.getItem('mastodonClientSecret');
      const redirectUri = sessionStorage.getItem('mastodonRedirectUri');
      
      if (!instance || !clientId || !clientSecret || !redirectUri) {
        toast({
          title: "Error",
          description: "Missing OAuth parameters. Please try again from the beginning.",
          variant: "destructive",
        });
        navigate('/mastodon-setup');
        return;
      }
      
      // The URL needs to include all necessary OAuth parameters
      window.location.href = authUrl;
    } else {
      toast({
        title: "Error",
        description: "Unable to redirect to Mastodon. Please try again.",
        variant: "destructive",
      });
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
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Authorize on Mastodon</h1>
              <p className="text-neutral-600 dark:text-neutral-300">You'll be redirected to authorize Wird on your Mastodon instance</p>
            </div>
            
            <Alert className="bg-neutral-100 dark:bg-neutral-800 mb-6 border border-neutral-200 dark:border-neutral-700">
              <InfoIcon className="h-4 w-4 text-secondary-500" />
              <AlertTitle className="text-neutral-800 dark:text-neutral-200">What happens next?</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>You'll be redirected to your Mastodon instance.</li>
                  <li>After logging in, grant Wird permission to post on your behalf.</li>
                  <li>You'll be redirected back to Wird to complete setup.</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <div className="text-center">
              <Button 
                onClick={handleRedirect}
                className="inline-flex items-center bg-primary-500 hover:bg-primary-600"
              >
                <span>Continue to Mastodon</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default Redirect;
