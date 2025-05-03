
import { useState } from "react";
import Layout from "@/components/Layout";
import GameSearch from "@/components/GameSearch";
import GameResults from "@/components/GameResults";
import { DownloadLink, searchGames } from "@/services/gameApi";
import { useApi } from "@/context/ApiContext";
import { Card } from "@/components/ui/card";

const Index = () => {
  const { apiSources, multiSearch } = useApi();
  const [searchResults, setSearchResults] = useState<DownloadLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const results = await searchGames(query, apiSources);
      setSearchResults(results);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="max-w-2xl">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">GameLink Finder</h1>
          <p className="text-muted-foreground">
            Find download links for your favorite games
          </p>
        </div>

        <GameSearch onSearch={handleSearch} isLoading={isLoading} />
        
        {isLoading ? (
          <Card className="p-8 glass-effect text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="h-8 w-8 border-t-2 border-primary rounded-full animate-spin mb-4"></div>
              <p>Searching games...</p>
            </div>
          </Card>
        ) : (
          <>
            {hasSearched && searchResults.length === 0 && (
              <Card className="p-8 glass-effect text-center">
                <p>No games found. Try a different search term.</p>
              </Card>
            )}
            <GameResults results={searchResults} />
          </>
        )}

        {!hasSearched && (
          <Card className="p-8 glass-effect text-center text-muted-foreground">
            <p>Search for a game to find download links</p>
            {apiSources.length > 1 && multiSearch && (
              <p className="text-xs mt-2">
                Multi-search enabled ({apiSources.filter(s => s.enabled).length} sources)
              </p>
            )}
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Index;
