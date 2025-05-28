import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-primary-500 dark:text-primary-400 text-2xl font-amiri font-bold">ورد</span>
            <span className="text-neutral-800 dark:text-white text-lg font-medium ml-2">Wird</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/about" className="hover:text-primary-500 dark:hover:text-primary-400">
              About
            </Link>
            <Link href="/privacy" className="hover:text-primary-500 dark:hover:text-primary-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary-500 dark:hover:text-primary-400">
              Terms of Service
            </Link>
            <a 
              href="https://github.com/username/wird" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-500 dark:hover:text-primary-400"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
          <p>"Whoever guides someone to goodness will have a reward like one who did it." — Sahih Muslim 1893</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
