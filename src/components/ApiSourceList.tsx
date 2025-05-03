
import React from "react";
import { ApiSource } from "@/services/gameApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { DEFAULT_API } from "@/services/gameApi";

interface ApiSourceListProps {
  sources: ApiSource[];
  onToggle: (source: ApiSource) => void;
  onDelete: (id: string) => void;
}

const ApiSourceList: React.FC<ApiSourceListProps> = ({
  sources,
  onToggle,
  onDelete,
}) => {
  if (sources.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No API sources added yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sources.map((source) => (
        <Card key={source.id} className="glass-effect p-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{source.name}</h4>
              <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-xs">
                {source.url}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={source.enabled}
                onCheckedChange={() => {
                  onToggle({
                    ...source,
                    enabled: !source.enabled,
                  });
                }}
                className="data-[state=checked]:bg-primary"
              />
              
              {source.id !== DEFAULT_API.id && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(source.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ApiSourceList;
