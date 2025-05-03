
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApiSource } from "@/services/gameApi";
import { useToast } from "@/hooks/use-toast"; 
import { v4 as uuidv4 } from "uuid";

interface ApiSourceFormProps {
  onSubmit: (source: ApiSource) => void;
}

const ApiSourceForm: React.FC<ApiSourceFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !url.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and URL are required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Basic URL validation
      new URL(url);
      
      const newSource: ApiSource = {
        id: uuidv4(),
        name: name.trim(),
        url: url.trim(),
        enabled: true,
      };
      
      onSubmit(newSource);
      
      // Reset form
      setName("");
      setUrl("");
      
      toast({
        title: "API Source Added",
        description: `Added ${name} successfully`,
      });
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-effect p-4">
      <h3 className="text-md font-semibold mb-4">Add New API Source</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">
            Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="API Source Name"
            className="bg-muted/50 border-muted"
          />
        </div>
        
        <div>
          <label htmlFor="url" className="block text-sm mb-1">
            URL
          </label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/api.json"
            className="bg-muted/50 border-muted"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/80"
        >
          Add API Source
        </Button>
      </form>
    </Card>
  );
};

export default ApiSourceForm;
