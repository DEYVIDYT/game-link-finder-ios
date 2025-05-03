
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const GameSearch: React.FC<GameSearchProps> = ({ onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <Card className={cn("glass-effect p-4 md:p-6 w-full max-w-2xl mx-auto")}>
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-muted focus-visible:ring-primary"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="bg-primary hover:bg-primary/80"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
    </Card>
  );
};

export default GameSearch;
