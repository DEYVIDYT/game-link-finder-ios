
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className={cn("container pt-20 pb-10 px-4", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
