import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Check if there's an auth error in the URL query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const authError = searchParams.get('auth_error');
    const username = searchParams.get('username');
    const authenticated = searchParams.get('authenticated');
    
    // If authentication was successful, redirect to dashboard
    if (username && authenticated === 'true') {
      // Store username in session storage for later use
      sessionStorage.setItem('username', username);
      
      // Reset the URL to remove query parameters
      window.history.replaceState({}, document.title, '/');
      
      // Go to dashboard
      setIsVisible(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
      return;
    }
    
    // If there was an auth error, show it after splash screen and redirect to setup
    if (authError) {
      sessionStorage.setItem('auth_error', authError);
      // Reset the URL to remove query parameters
      window.history.replaceState({}, document.title, '/');
    }
    
    // Normal flow - go to welcome screen
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        navigate('/welcome');
      }, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5 
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.8 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { 
        repeat: Infinity, 
        repeatType: "reverse" as const,
        duration: 2.5, 
        ease: "easeInOut" 
      }
    },
    exit: { 
      scale: 1.2, 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#8152E1] to-[#6039b0] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect x="0" y="0" width="30" height="30" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          {/* Animated circles */}
          <motion.div 
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 1.2, ease: "easeOut" }
            }}
            exit={{ 
              scale: 1.2, 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeIn" }
            }}
          >
            <motion.div 
              className="w-64 h-64 rounded-full bg-white opacity-5"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse" as const,
                duration: 2.5, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>

          <motion.div 
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 1.2, ease: "easeOut", delay: 0.4 }
            }}
            exit={{ 
              scale: 1.2, 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeIn" }
            }}
          >
            <motion.div 
              className="w-48 h-48 rounded-full bg-white opacity-5"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.05, 0.08, 0.05],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse" as const,
                duration: 2.5, 
                ease: "easeInOut",
                delay: 0.2
              }}
            />
          </motion.div>

          {/* Logo and text */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="h-40 w-40 mb-8 flex items-center justify-center">
              <h1 className="text-8xl font-bold text-white font-amiri">ورد</h1>
            </div>
          </motion.div>

          <motion.h2 
            className="text-3xl font-bold text-white font-sans mb-3 tracking-wide"
            variants={itemVariants}
          >
            WIRD
          </motion.h2>

          <motion.p 
            className="text-lg text-white/90 mb-6"
            variants={itemVariants}
          >
            Automated Quran Verse Posting
          </motion.p>

          <motion.div
            className="mt-8 flex space-x-2"
            variants={itemVariants}
          >
            <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
            <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
            <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
