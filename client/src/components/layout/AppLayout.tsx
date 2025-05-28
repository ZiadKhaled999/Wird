import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface AppLayoutProps {
  children: ReactNode;
  username?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, username }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navigation username={username} />
      <main className="flex-grow pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
