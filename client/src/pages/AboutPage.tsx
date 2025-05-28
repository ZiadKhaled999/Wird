import React from 'react';
import { motion } from 'framer-motion';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Book, Code, Users, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage: React.FC = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">About Wird</h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              An open-source initiative designed to automate the sharing of Quranic verses on Mastodon accounts
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-primary to-secondary">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-6xl font-amiri font-bold text-white mb-2">ورد</h2>
                  <p className="text-xl text-white">Automatic Quranic Wisdom</p>
                </div>
              </div>
            </div>
            <CardContent className="p-8">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Inspired by the concept of <em>Sadaqah Jariyah</em> (ongoing charity), Wird empowers account administrators to consistently share divine wisdom, ensuring their audience starts each day with a reminder from the Quran. Built by a global community of Muslim developers, this project aims to bridge technology and faith, making religious content sharing effortless and sustainable.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="features" className="mt-10">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Features</span>
              </TabsTrigger>
              <TabsTrigger value="how" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>How It Works</span>
              </TabsTrigger>
              <TabsTrigger value="tech" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>Technology</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Our Team</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Key Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M9 12h6" />
                      <path d="M12 9v6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">One-Time Setup</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Connect your Mastodon account once, and Wird takes care of the rest, posting verses automatically with no further intervention needed.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Daily Automation</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Verses are posted at 5:00 AM daily, ensuring your audience receives consistent spiritual content to start their day.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Complete Quran Cycle</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Wird cycles through the entire Quran, from Al-Baqarah to An-Nas, and then starts again, creating an infinite loop of blessings.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customizable Options</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Choose to include Arabic text, English translations, verse references, and set your preferred posting time.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="how" className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">How It Works</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Connect Your Account</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Enter your Mastodon instance and authenticate through OAuth to grant Wird posting permissions.
                    </p>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Automated Daily Posts</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      At 5:00 AM every day, Wird posts a Quranic verse to your account from our carefully prepared database.
                    </p>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      The dashboard displays the number of days posted, current verse, and upcoming posts in an easy-to-use interface.
                    </p>
                  </div>
                </div>
                
                <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <h3 className="text-xl font-bold mb-2">Technical Process</h3>
                  <ul className="list-disc ml-6 space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>A Python-based scheduler triggers daily tasks at the specified time.</li>
                    <li>Verses are fetched from a structured database with both Arabic text and English translations.</li>
                    <li>Content is formatted according to your preferences and posted via the Mastodon API.</li>
                    <li>Your progress is tracked to ensure you continue from where you left off.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Technology Stack</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <h3 className="text-xl font-bold mb-4">Frontend</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">React</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— UI library</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Framer Motion</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Animations</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Tailwind CSS</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Styling</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">ShadCN/UI</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Component library</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Wouter</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Routing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <h3 className="text-xl font-bold mb-4">Backend</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Node.js</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Runtime</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Express</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Web framework</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">Mastodon API</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Social integration</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">node-schedule</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Cron-like scheduling</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <span className="font-medium">PostgreSQL</span>
                      <span className="text-neutral-500 dark:text-neutral-400 ml-2">— Data storage</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <a href="https://github.com/username/wird" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Button>
                </a>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Our Team</h2>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Wird is an open-source project built by a global community of Muslim developers and contributors. Everyone is welcome to contribute to this project as part of <em>Sadaqah Jariyah</em>.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700 text-center">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                    <Users className="h-12 w-12 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-bold">Become a Contributor</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    Join us in spreading light, one verse at a time
                  </p>
                </div>
              </div>
              
              <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 mt-6">
                <h3 className="text-xl font-bold mb-4">How to Contribute</h3>
                <ul className="list-disc ml-6 space-y-2 text-neutral-600 dark:text-neutral-400">
                  <li>Report issues via GitHub</li>
                  <li>Improve verses and translations</li>
                  <li>Enhance features and UI components</li>
                  <li>Create documentation and tutorials</li>
                  <li>Spread the word about Wird</li>
                </ul>
              </div>
              
              <div className="text-center mt-8">
                <blockquote className="italic text-lg text-neutral-600 dark:text-neutral-400">
                  "Whoever guides someone to goodness will have a reward like one who did it."
                </blockquote>
                <p className="mt-2 font-medium">— Sahih Muslim 1893</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default AboutPage;