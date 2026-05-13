"use client";

import { useState, useEffect } from "react";
import { Heart, History, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export function IdentityStorage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavs = localStorage.getItem("stylish-glyph-favorites");
    const savedHistory = localStorage.getItem("stylish-glyph-history");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    // Listen for custom events to update history/favorites from other components
    const handleUpdate = () => {
      const currentFavs = localStorage.getItem("stylish-glyph-favorites");
      const currentHistory = localStorage.getItem("stylish-glyph-history");
      if (currentFavs) setFavorites(JSON.parse(currentFavs));
      if (currentHistory) setHistory(JSON.parse(currentHistory));
    };

    window.addEventListener("storage-update", handleUpdate);
    return () => window.removeEventListener("storage-update", handleUpdate);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `"${text}" copied to clipboard.` });
  };

  const clearHistory = () => {
    localStorage.removeItem("stylish-glyph-history");
    setHistory([]);
    toast({ title: "History Cleared" });
  };

  const removeItem = (list: 'fav' | 'hist', index: number) => {
    if (list === 'fav') {
      const newFavs = [...favorites];
      newFavs.splice(index, 1);
      setFavorites(newFavs);
      localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
    } else {
      const newHist = [...history];
      newHist.splice(index, 1);
      setHistory(newHist);
      localStorage.setItem("stylish-glyph-history", JSON.stringify(newHist));
    }
  };

  return (
    <div className="glass-morphism rounded-xl border border-primary/20 p-4 h-full flex flex-col">
      <Tabs defaultValue="favorites" className="flex-1 flex flex-col">
        <TabsList className="bg-background/50 border border-primary/10 w-full">
          <TabsTrigger value="favorites" className="flex-1 gap-2 data-[state=active]:bg-primary">
            <Heart className="w-4 h-4" /> Favorites
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 gap-2 data-[state=active]:bg-primary">
            <History className="w-4 h-4" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="flex-1 mt-4">
          <ScrollArea className="h-[400px] pr-4">
            {favorites.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">No favorites yet. Click the heart on any style!</p>
            ) : (
              <div className="space-y-2">
                {favorites.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-primary/5 border border-primary/10 group">
                    <span className="font-mono text-sm truncate mr-2">{item}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeItem('fav', idx)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="flex-1 mt-4">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs text-muted-foreground">{history.length} items</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={clearHistory}>
              Clear All
            </Button>
          </div>
          <ScrollArea className="h-[365px] pr-4">
            {history.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">No recent conversions.</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/20 border border-white/5 group">
                    <span className="font-mono text-sm truncate mr-2">{item}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground" onClick={() => removeItem('hist', idx)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
