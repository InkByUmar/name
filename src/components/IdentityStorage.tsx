"use client";

import { useState, useEffect } from "react";
import { Heart, History, Trash2, Copy, Shield, Target } from "lucide-react";
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
    toast({ title: "Copied", description: `"${text}" is on your clipboard.` });
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
    <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl p-5 flex flex-col">
      <Tabs defaultValue="favorites" className="w-full">
        <TabsList className="bg-gray-50 border border-gray-100 w-full h-10 p-1 rounded-xl">
          <TabsTrigger value="favorites" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase text-[10px] tracking-wider rounded-lg transition-all">
            <Heart className="w-3.5 h-3.5" /> Collection
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase text-[10px] tracking-wider rounded-lg transition-all">
            <History className="w-3.5 h-3.5" /> Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="mt-6">
          <ScrollArea className="h-[250px] pr-2">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-30">
                <Shield className="w-8 h-8 text-gray-300" />
                <p className="text-[10px] font-bold uppercase text-gray-400">Your collection is empty.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {favorites.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-transparent group hover:border-primary/20 transition-all">
                    <span className="text-xs font-bold truncate mr-2 text-gray-700">{item}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-primary" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-gray-300 hover:text-destructive" onClick={() => removeItem('fav', idx)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[10px] font-bold uppercase text-gray-400">{history.length} Logs</span>
            <Button variant="ghost" size="sm" className="h-5 text-[10px] font-bold uppercase text-destructive hover:bg-destructive/5" onClick={clearHistory}>
              Clear
            </Button>
          </div>
          <ScrollArea className="h-[220px] pr-2">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-30">
                <Target className="w-8 h-8 text-gray-300" />
                <p className="text-[10px] font-bold uppercase text-gray-400">No recent activity.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                    <span className="text-xs font-medium truncate mr-2 text-gray-500">{item}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-primary" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-gray-300 hover:text-destructive" onClick={() => removeItem('hist', idx)}>
                        <Trash2 className="w-3.5 h-3.5" />
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
