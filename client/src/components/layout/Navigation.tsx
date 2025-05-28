import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet } from '@/components/ui/sheet';
import { SheetContent } from '@/components/ui/sheet';
import { SheetTrigger } from '@/components/ui/sheet';
import { 
  User, 
  Settings, 
  Info, 
  Menu, 
  Moon, 
  Sun,
  Globe,
  Clock,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavigationProps {
  username?: string;
}

const Navigation: React.FC<NavigationProps> = ({ username }) => {
  const { theme, setTheme } = useTheme();
  const [, navigate] = useLocation();
  const [language, setLanguage] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
    // In a real app, we would implement language switching functionality
  };

  return (
    <motion.nav 
      className="bg-white dark:bg-[#1f1433] shadow-md sticky top-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary text-3xl font-amiri font-bold ml-2">ورد</span>
              <span className="text-neutral-800 dark:text-white text-xl font-bold ml-2">Wird</span>
            </motion.div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard" className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/profile" className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/about" className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Globe className="h-4 w-4 mr-2" />
                  {language}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLanguage('English')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLanguage('العربية')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            {/* User Menu (if logged in) */}
            {username && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    {username}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/post-schedule')}>
                    <Clock className="h-4 w-4 mr-2" />
                    Post Schedule
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    // Clear session storage
                    sessionStorage.removeItem('username');
                    navigate('/');
                  }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 pt-10">
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center text-lg font-medium py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center text-lg font-medium py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center text-lg font-medium py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center text-lg font-medium py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Info className="h-5 w-5 mr-2" />
                    About
                  </Link>
                  
                  <hr className="border-neutral-200 dark:border-neutral-700" />
                  
                  <div className="px-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Language</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => switchLanguage(language === 'English' ? 'العربية' : 'English')}
                      >
                        {language === 'English' ? 'العربية' : 'English'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium">Theme</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      >
                        {theme === 'dark' ? 'Light' : 'Dark'}
                      </Button>
                    </div>
                  </div>
                  
                  {username && (
                    <>
                      <hr className="border-neutral-200 dark:border-neutral-700" />
                      <Button 
                        variant="destructive" 
                        className="mt-2"
                        onClick={() => {
                          sessionStorage.removeItem('username');
                          setMobileMenuOpen(false);
                          navigate('/');
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
