
import { toast } from "@/hooks/use-toast";

export interface DownloadLink {
  title: string;
  uploadDate: string;
  fileSize: string;
  uris: string[];
}

export interface ApiSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

export interface GameApiResponse {
  name: string;
  downloads: DownloadLink[];
}

export const DEFAULT_API: ApiSource = {
  id: "default",
  name: "Repack-Games",
  url: "https://hydralinks.cloud/sources/repack-games.json",
  enabled: true,
};

// Function to extract domain from URL
export const extractDomain = (url: string): string => {
  try {
    const hostname = new URL(url).hostname;
    // Get the domain without subdomains
    const parts = hostname.split(".");
    if (parts.length > 2) {
      return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    }
    return hostname;
  } catch (error) {
    return "Unknown Source";
  }
};

// Fetch games from a single API source
export const fetchGames = async (
  apiSource: ApiSource
): Promise<GameApiResponse | null> => {
  try {
    const response = await fetch(apiSource.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${apiSource.name}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${apiSource.name}:`, error);
    toast({
      title: "API Error",
      description: `Failed to fetch games from ${apiSource.name}`,
      variant: "destructive",
    });
    return null;
  }
};

// Search games across multiple API sources
export const searchGames = async (
  query: string,
  apiSources: ApiSource[]
): Promise<DownloadLink[]> => {
  if (!query) return [];
  
  const enabledSources = apiSources.filter(source => source.enabled);
  if (enabledSources.length === 0) return [];

  try {
    const searchPromises = enabledSources.map(source => fetchGames(source));
    const results = await Promise.all(searchPromises);
    
    const allDownloads: DownloadLink[] = [];
    
    results.forEach(result => {
      if (result && result.downloads) {
        const filteredDownloads = result.downloads.filter(download => 
          download.title.toLowerCase().includes(query.toLowerCase())
        );
        allDownloads.push(...filteredDownloads);
      }
    });
    
    // Sort by most recent upload date
    return allDownloads.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  } catch (error) {
    console.error("Error searching games:", error);
    toast({
      title: "Search Error",
      description: "Failed to search for games",
      variant: "destructive",
    });
    return [];
  }
};

// Local storage functions
export const loadApiSources = (): ApiSource[] => {
  try {
    const savedSources = localStorage.getItem("apiSources");
    if (savedSources) {
      return JSON.parse(savedSources);
    }
  } catch (error) {
    console.error("Error loading API sources:", error);
  }
  return [DEFAULT_API];
};

export const saveApiSources = (sources: ApiSource[]): void => {
  try {
    localStorage.setItem("apiSources", JSON.stringify(sources));
  } catch (error) {
    console.error("Error saving API sources:", error);
    toast({
      title: "Settings Error",
      description: "Failed to save API sources",
      variant: "destructive",
    });
  }
};
