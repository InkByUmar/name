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
    toast({ title: "Deployed to Clipboard", description: `"${text}" ready for use.` });
  };

  const clearHistory = () => {
    localStorage.removeItem("stylish-glyph-history");
    setHistory([]);
    toast({ title: "History Purged" });
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
    <div className="glass-morphism rounded-2xl border border-primary/20 p-6 flex flex-col h-full">
      <Tabs defaultValue="favorites" className="flex-1 flex flex-col">
        <TabsList className="bg-background/50 border border-primary/10 w-full h-12 p-1 rounded-xl">
          <TabsTrigger value="favorites" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest rounded-lg">
            <Heart className="w-3 h-3" /> Arsenal
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-black uppercase text-[10px] tracking-widest rounded-lg">
            <History className="w-3 h-3" /> Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="flex-1 mt-6">
          <ScrollArea className="h-[350px] pr-4">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
                <Shield className="w-12 h-12" />
                <p className="text-[10px] font-black uppercase tracking-widest">Arsenal Empty. <br/>Tag styles to add them.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {favorites.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10 group hover:border-primary/40 transition-all">
                    <span className="font-medium text-sm truncate mr-2 text-white/90">{item}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-primary" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeItem('fav', idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="history" className="flex-1 mt-6">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{history.length} ACTIVE LOGS</span>
            <Button variant="ghost" size="sm" className="h-6 text-[9px] font-black uppercase text-destructive hover:bg-destructive/10" onClick={clearHistory}>
              Wipe Logs
            </Button>
          </div>
          <ScrollArea className="h-[310px] pr-4">
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
                <Target className="w-12 h-12" />
                <p className="text-[10px] font-black uppercase tracking-widest">No Recent Ops.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
                    <span className="font-medium text-sm truncate mr-2 text-white/70">{item}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-accent" onClick={() => copyToClipboard(item)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem('hist', idx)}>
                        <Trash2 className="w-4 h-4" />
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