import { Tabs } from "@ark-ui/react/tabs";
import { createFileRoute, Link } from "@tanstack/react-router";
import Editor from "@monaco-editor/react";
import {
  AlertCircleIcon,
  BarChartIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  InfoIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGardenStore } from "@/lib/garden";
import cn from "@/lib/utils";
import createMetaTags from "@/lib/util/createMetaTags";

import type { GardenSchema } from "@omnidotdev/garden";

export const Route = createFileRoute("/visualizer")({
  head: () => ({
    meta: createMetaTags({
      title: "Garden Visualizer",
      description: "Visualize and edit your Garden schema",
    }),
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as "visualize" | "edit") || "visualize",
    fontSize: Number(search.fontSize) || 14,
  }),
  component: VisualizerPage,
});

const INSTRUCTIONS_STORAGE_KEY = "garden_instructions_visible";

/**
 * Visualizer page.
 */
function VisualizerPage() {
  const { tab, fontSize } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [showInstructions, setShowInstructions] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(INSTRUCTIONS_STORAGE_KEY);
      return stored !== null ? stored === "true" : true;
    }
    return true;
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      {/* Header with garden selector */}
      <div className="border-border border-b bg-card p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <h1 className="font-bold text-2xl">Garden Visualizer</h1>

              <Button
                variant="ghost"
                className="ml-2 gap-2 rounded-full px-2"
                onClick={() => {
                  const newValue = !showInstructions;
                  setShowInstructions(newValue);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(
                      INSTRUCTIONS_STORAGE_KEY,
                      newValue.toString(),
                    );
                  }
                }}
              >
                <InfoIcon className="h-5 w-5" /> Instructions
              </Button>
            </div>

            <Link
              to="/"
              className="ml-3 rounded border border-primary/20 px-3 py-1 text-primary text-sm hover:border-primary/40 hover:text-primary/80"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Instructions panel (conditionally displayed) */}
      {showInstructions && isClient && (
        <div className="border-b bg-accent/50 p-4">
          <div className="container mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-lg text-primary">
                  Garden Visualization Instructions
                </h2>
                <div className="mt-2 space-y-2 text-foreground text-sm">
                  <p>
                    <strong>Navigation:</strong> Click on any garden, subgarden,
                    or sprout to navigate or view details.
                  </p>
                  <p>
                    <strong>Expand/condense subgardens:</strong> Toggle this
                    option in the controls panel to show subgardens directly
                    within the current garden view.
                  </p>
                  <p>
                    <strong>Tabs:</strong> Switch between Visualize and Edit
                    modes to view or modify your garden structure.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setShowInstructions(false);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(INSTRUCTIONS_STORAGE_KEY, "false");
                  }
                }}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        <div className="container mx-auto h-full p-4">
          <div className="h-full">
            <GardenTabs
              activeTab={tab}
              onTabChange={(newTab) =>
                navigate({ search: { tab: newTab, fontSize } })
              }
              fontSize={fontSize}
              onFontSizeChange={(newSize) =>
                navigate({ search: { tab, fontSize: newSize } })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GardenTabs({
  activeTab,
  onTabChange,
  fontSize,
  onFontSizeChange,
}: {
  activeTab: "visualize" | "edit";
  onTabChange: (tab: "visualize" | "edit") => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}) {
  const [isClient, setIsClient] = useState(false);
  const { activeSchema } = useGardenStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(details) =>
        onTabChange(details.value as "visualize" | "edit")
      }
      className="flex h-full flex-col"
    >
      <Tabs.List className="grid w-full grid-cols-2 rounded-lg bg-muted p-1 md:max-w-md">
        <Tabs.Trigger
          value="visualize"
          className={cn(
            "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "visualize"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <BarChartIcon size={16} />
          Visualize Garden
        </Tabs.Trigger>

        <Tabs.Trigger
          value="edit"
          className={cn(
            "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            activeTab === "edit"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <CodeIcon size={16} />
          Edit Garden
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="visualize" className="mt-6 flex-1">
        <div className="flex h-full w-full items-center justify-center">
          {isClient ? <GardenVisualizer schema={activeSchema} /> : "Loading visualizer..."}
        </div>
      </Tabs.Content>

      <Tabs.Content value="edit" className="mt-6">
        <SchemaEditor fontSize={fontSize} onFontSizeChange={onFontSizeChange} />
      </Tabs.Content>
    </Tabs.Root>
  );
}

function GardenVisualizer({ schema }: { schema: GardenSchema }) {
  // Dynamically import Garden component
  const [Garden, setGarden] = useState<React.ComponentType<{ schema: GardenSchema }> | null>(null);

  useEffect(() => {
    import("@omnidotdev/garden").then((mod) => {
      setGarden(() => mod.Garden);
    });
  }, []);

  if (!Garden) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading Garden component...</p>
      </div>
    );
  }

  return <Garden schema={schema} />;
}

function SchemaEditor({
  fontSize,
  onFontSizeChange,
}: {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}) {
  const [schemaText, setSchemaText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { activeSchema, setActiveSchema } = useGardenStore();

  useEffect(() => {
    setSchemaText(JSON.stringify(activeSchema, null, 2));
  }, [activeSchema]);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(schemaText);
      setActiveSchema(parsed);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  };

  const handleReset = () => {
    setSchemaText(JSON.stringify(activeSchema, null, 2));
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Garden Editor</CardTitle>
        <CardDescription>
          Edit the JSON schema for your Garden visualization
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Font size controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Font Size:</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onFontSizeChange(Math.max(10, fontSize - 2))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center text-sm">{fontSize}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onFontSizeChange(Math.min(24, fontSize + 2))}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-[400px]">
          <TextEditor
            error={error}
            schemaText={schemaText}
            setSchemaText={setSchemaText}
            setError={setError}
            fontSize={fontSize}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TextEditor({
  schemaText,
  setSchemaText,
  error,
  setError,
  fontSize,
}: {
  schemaText: string;
  setSchemaText: (text: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  fontSize: number;
}) {
  const [editorTheme, setEditorTheme] = useState<string>("light");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Check for dark mode
    const isDark = document.documentElement.classList.contains("dark");
    setEditorTheme(isDark ? "vs-dark" : "light");

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setEditorTheme(isDarkNow ? "vs-dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full overflow-hidden rounded-md border border-border">
      <Editor
        defaultLanguage="json"
        value={schemaText}
        theme={editorTheme}
        onChange={(value) => {
          if (value) setSchemaText(value);
          setError(null);
        }}
        options={{
          padding: { top: 10, bottom: 10 },
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      <div className="absolute top-4 right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          title="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon size={16} color="green" />
          ) : (
            <CopyIcon size={16} />
          )}
        </Button>

        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircleIcon size={16} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="max-h-32 overflow-auto font-mono text-xs">
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
