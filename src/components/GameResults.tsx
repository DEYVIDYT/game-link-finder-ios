
import React from "react";
import { DownloadLink, extractDomain } from "@/services/gameApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react"; 
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface GameResultsProps {
  results: DownloadLink[];
}

const GameResults: React.FC<GameResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDownload = (url: string) => {
    // Open the download URL in a new tab
    window.open(url, "_blank");
    toast({
      title: "Download Started",
      description: "Opening download link in a new tab",
    });
  };

  return (
    <div className="space-y-4 mt-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-center text-secondary">
        {results.length} Result{results.length !== 1 ? "s" : ""} Found
      </h2>
      
      {results.map((game, index) => (
        <Card key={index} className="glass-effect overflow-hidden">
          <div className="p-4">
            <h3 className="font-bold text-lg text-foreground">{game.title}</h3>
            
            <div className="flex flex-wrap gap-x-4 text-sm text-muted-foreground mt-2">
              <div>Uploaded: {formatDate(game.uploadDate)}</div>
              {game.fileSize !== "N/A" && (
                <div>Size: {game.fileSize}</div>
              )}
            </div>

            <Separator className="my-3 bg-border/50" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {game.uris.map((uri, uriIndex) => {
                const domain = extractDomain(uri);
                return (
                  <Button
                    key={uriIndex}
                    onClick={() => handleDownload(uri)}
                    className={cn(
                      "text-xs bg-muted hover:bg-muted/80 text-foreground",
                      "flex items-center gap-2 transition-all"
                    )}
                  >
                    <Download className="h-4 w-4" />
                    Download via {domain}
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GameResults;
