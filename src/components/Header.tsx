
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10 glass-effect backdrop-blur-lg border-b border-border/50">
      <div className="container max-w-2xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1">
            <Search className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">GameLink Finder</span>
        </Link>
        
        <Link to={location.pathname === "/settings" ? "/" : "/settings"}>
          <Button
            variant={location.pathname === "/settings" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "flex items-center gap-2",
              location.pathname === "/settings" && "bg-primary"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>{location.pathname === "/settings" ? "Search" : "Settings"}</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
