import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/components/layout/AppLayout';

const Terms: React.FC = () => {
  const [, navigate] = useLocation();
  const [accepted, setAccepted] = useState(false);

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
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Terms and Conditions</h1>
              <p className="text-neutral-600 dark:text-neutral-300">Please review before continuing</p>
            </div>
            
            <div className="h-64 overflow-y-auto border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-6 bg-neutral-50 dark:bg-neutral-800/50">
              <div className="space-y-4 text-sm">
                <h2 className="font-bold text-lg">1. Introduction</h2>
                <p>
                  Welcome to Wird, an open-source initiative designed to automate the sharing of Quranic verses on Mastodon accounts. By using this application, you agree to these terms and conditions.
                </p>
                
                <h2 className="font-bold text-lg">2. Service Description</h2>
                <p>
                  Wird provides an automated service that posts Quranic verses to your Mastodon account daily. The service requires access to your Mastodon account.
                </p>
                
                <h2 className="font-bold text-lg">3. Privacy and Data</h2>
                <p>
                  We store your Mastodon instance information and authentication tokens securely in Firebase. We don't collect personal information beyond what's necessary for the service.
                </p>
                
                <h2 className="font-bold text-lg">4. User Responsibilities</h2>
                <p>
                  You are responsible for your Mastodon account and ensuring that automated religious content is acceptable to your audience and platform guidelines.
                </p>
                
                <h2 className="font-bold text-lg">5. Limitations</h2>
                <p>
                  Wird is provided "as is" without warranties. We strive for reliability but cannot guarantee uninterrupted service.
                </p>
                
                <h2 className="font-bold text-lg">6. Open Source License</h2>
                <p>
                  Wird is open-source under the Apache License. You are free to modify and distribute the code under the terms of this license.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="accept-terms" 
                  checked={accepted}
                  onCheckedChange={(checked) => setAccepted(checked === true)}
                />
                <Label htmlFor="accept-terms" className="text-sm text-neutral-700 dark:text-neutral-300">
                  I have read and agree to the Terms and Conditions and Privacy Policy
                </Label>
              </div>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/welcome')}
                  className="w-full sm:w-auto"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => navigate('/mastodon-setup')}
                  disabled={!accepted}
                  className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-300 dark:disabled:bg-neutral-700"
                >
                  Continue
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
};

export default Terms;
