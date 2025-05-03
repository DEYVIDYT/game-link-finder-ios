
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ApiSource, DEFAULT_API, loadApiSources, saveApiSources } from "@/services/gameApi";

interface ApiContextType {
  apiSources: ApiSource[];
  addApiSource: (source: ApiSource) => void;
  removeApiSource: (id: string) => void;
  updateApiSource: (source: ApiSource) => void;
  multiSearch: boolean;
  setMultiSearch: (value: boolean) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: ReactNode }) {
  const [apiSources, setApiSources] = useState<ApiSource[]>([DEFAULT_API]);
  const [multiSearch, setMultiSearch] = useState<boolean>(false);

  // Load API sources from local storage on component mount
  useEffect(() => {
    const sources = loadApiSources();
    if (sources && sources.length > 0) {
      setApiSources(sources);
    }
    
    // Load multi-search setting
    try {
      const savedMultiSearch = localStorage.getItem("multiSearch");
      if (savedMultiSearch !== null) {
        setMultiSearch(JSON.parse(savedMultiSearch));
      }
    } catch (error) {
      console.error("Error loading multi-search setting:", error);
    }
  }, []);

  // Save multi-search setting when changed
  useEffect(() => {
    try {
      localStorage.setItem("multiSearch", JSON.stringify(multiSearch));
    } catch (error) {
      console.error("Error saving multi-search setting:", error);
    }
  }, [multiSearch]);

  // Add a new API source
  const addApiSource = (source: ApiSource) => {
    const newSources = [...apiSources, source];
    setApiSources(newSources);
    saveApiSources(newSources);
  };

  // Remove an API source by ID
  const removeApiSource = (id: string) => {
    // Don't allow removing the default API
    if (id === DEFAULT_API.id) return;
    
    const newSources = apiSources.filter(source => source.id !== id);
    setApiSources(newSources);
    saveApiSources(newSources);
  };

  // Update an existing API source
  const updateApiSource = (updatedSource: ApiSource) => {
    const newSources = apiSources.map(source => 
      source.id === updatedSource.id ? updatedSource : source
    );
    setApiSources(newSources);
    saveApiSources(newSources);
  };

  return (
    <ApiContext.Provider
      value={{
        apiSources,
        addApiSource,
        removeApiSource,
        updateApiSource,
        multiSearch,
        setMultiSearch,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}
