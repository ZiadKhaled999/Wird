import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';

const OAuthLoading: React.FC = () => {
  const [, navigate] = useLocation();
  const [status, setStatus] = useState('Initializing connection...');

  useEffect(() => {
    const prepareAuthentication = async () => {
      // Check if we have all required session variables
      const instance = sessionStorage.getItem('mastodonInstance');
      const clientId = sessionStorage.getItem('mastodonClientId');
      const clientSecret = sessionStorage.getItem('mastodonClientSecret');
      const redirectUri = sessionStorage.getItem('mastodonRedirectUri');
      const authUrl = sessionStorage.getItem('mastodonAuthUrl');
      
      if (!instance || !clientId || !clientSecret || !redirectUri || !authUrl) {
        // If any required parameter is missing, go back to setup
        console.error('Missing authentication parameters. Redirecting to setup.');
        navigate('/mastodon-setup');
        return;
      }
      
      setStatus('Verifying Mastodon instance...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('Preparing authorization...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to redirect screen
      navigate('/redirect');
    };
    
    prepareAuthentication();
  }, [navigate]);

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-3xl mx-auto">
          <CardContent className="p-0">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Connecting to Mastodon</h1>
              <p className="text-neutral-600 dark:text-neutral-300">Please wait while we securely connect your account</p>
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-700 dark:text-neutral-300">
                {status}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default OAuthLoading;
