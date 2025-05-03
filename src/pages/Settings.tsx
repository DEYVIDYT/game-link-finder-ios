
import React from "react";
import Layout from "@/components/Layout";
import ApiSourceForm from "@/components/ApiSourceForm";
import ApiSourceList from "@/components/ApiSourceList";
import { useApi } from "@/context/ApiContext";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const {
    apiSources,
    addApiSource,
    updateApiSource,
    removeApiSource,
    multiSearch,
    setMultiSearch,
  } = useApi();

  return (
    <Layout className="max-w-2xl">
      <div className="space-y-6">
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage API sources and search preferences
          </p>
        </div>

        <Card className="glass-effect p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Multi-Search</h3>
              <p className="text-sm text-muted-foreground">
                Search across all enabled API sources
              </p>
            </div>
            <Switch
              checked={multiSearch}
              onCheckedChange={setMultiSearch}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">API Sources</h2>
          <ApiSourceList
            sources={apiSources}
            onToggle={updateApiSource}
            onDelete={removeApiSource}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add New API Source</h2>
          <ApiSourceForm onSubmit={addApiSource} />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
