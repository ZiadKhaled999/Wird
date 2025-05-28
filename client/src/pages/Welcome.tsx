import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/components/layout/AppLayout';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

const Welcome: React.FC = () => {
  const [, navigate] = useLocation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AppLayout>
      <motion.div
        className="pt-6 pb-12 md:pt-12 md:pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left content area - intro text */}
            <motion.div 
              className="lg:col-span-2 flex flex-col justify-center"
              variants={itemVariants}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
                Automate Your <span className="text-primary">Quranic</span> Wisdom
              </h1>
              
              <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-8 leading-relaxed">
                Connect your Mastodon account once, and our system will 
                automatically post one verse from the Quran daily at 5:00 AM, 
                forever.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button 
                  onClick={() => navigate('/terms')}
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 text-base py-6 px-8"
                  size="lg"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate('/about')}
                  className="flex items-center gap-2 border-neutral-300 dark:border-neutral-700 text-base py-6 px-8"
                  size="lg"
                >
                  <span>Learn More</span>
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center mt-8 text-sm text-neutral-600 dark:text-neutral-400">
                <Github className="h-4 w-4 mr-2" /> 
                <span>Open source project</span>
                <span className="mx-2">•</span>
                <span>MIT License</span>
              </div>
            </motion.div>
            
            {/* Right content area - cards/features */}
            <motion.div 
              className="lg:col-span-3"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Main card with image and Arabic text */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/80 to-primary/100 shadow-xl">
                  <div className="absolute inset-0 bg-opacity-30">
                    <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <pattern id="islamic-pattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                        <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
                    </svg>
                  </div>
                  
                  <div className="relative z-10 p-8 text-center">
                    <h2 className="font-amiri text-5xl font-bold text-white mb-8" dir="rtl">
                      بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </h2>
                    
                    <div className="py-6 px-8 rounded-xl bg-white/10 backdrop-blur-sm inline-block mb-6">
                      <p className="font-amiri text-3xl font-bold text-white" dir="rtl">
                        ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ
                      </p>
                    </div>
                    
                    <p className="text-white/90 font-medium">
                      [All] praise is [due] to Allah, Lord of the worlds
                    </p>
                    <p className="text-white/80 text-sm mt-1">
                      Surah Al-Fatihah, Verse 2
                    </p>
                  </div>
                </div>
                
                {/* Feature cards - stacked below the main card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <Card className="bg-white/80 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">Daily Posts</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Consistent 5AM posting
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">One-Time Setup</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Connect and forget
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 dark:bg-neutral-800/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-neutral-900 dark:text-white">Full Quran</h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        Cycles through all verses
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Welcome;
