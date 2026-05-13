"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Zap, 
  Search, 
  Copy, 
  Heart, 
  Trophy, 
  Filter, 
  Gamepad2, 
  LayoutGrid,
  TrendingUp,
  RotateCcw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STYLE_OPTIONS, StyleCategory } from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { AIAliasGenerator } from "@/components/AIAliasGenerator";
import { IdentityStorage } from "@/components/IdentityStorage";

export default function Home() {
  const [inputText, setInputText] = useState("Your Name");
  const [activeTab, setActiveTab] = useState<StyleCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavs = localStorage.getItem("stylish-glyph-favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const filteredStyles = useMemo(() => {
    return STYLE_OPTIONS.filter(style => 
      activeTab === 'all' || style.category.includes(activeTab)
    );
  }, [activeTab]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    // Save to history
    const history = JSON.parse(localStorage.getItem("stylish-glyph-history") || "[]");
    const newHistory = [text, ...history.filter((h: string) => h !== text)].slice(0, 50);
    localStorage.setItem("stylish-glyph-history", JSON.stringify(newHistory));
    
    window.dispatchEvent(new Event("storage-update"));

    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFavorite = (text: string) => {
    const newFavs = favorites.includes(text) 
      ? favorites.filter(f => f !== text)
      : [text, ...favorites];
    
    setFavorites(newFavs);
    localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event("storage-update"));
    
    toast({
      title: favorites.includes(text) ? "Removed from Favorites" : "Added to Favorites",
      description: `"${text}" updated in your collection.`
    });
  };

  const generateRandom = () => {
    const randomWords = ["Slayer", "Warrior", "Ghost", "Ninja", "Shadow", "Rider", "Legend", "Sniper", "King", "Reaper", "Vortex", "Cipher"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 999);
    setInputText(`${randomWord}${randomNum}`);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="py-12 px-4 text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-4 animate-pulse-neon">
          <Zap className="w-3 h-3" /> Instant Gamer Stylizer
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold text-white tracking-tighter neon-glow">
          STYLISH <span className="text-accent">GLYPH</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
          The ultimate fancy text generator for PUBG, Free Fire, and BGMI. Transform your gamer identity with 80+ unique styles and AI-powered tag suggestions.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Main Workspace */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Input Area */}
          <section className="glass-morphism rounded-3xl p-6 md:p-10 space-y-6 neon-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gamepad2 className="w-40 h-40" />
            </div>
            
            <div className="relative space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold uppercase tracking-wider text-primary">Enter your IGN</label>
                <Button variant="ghost" size="sm" onClick={generateRandom} className="text-accent hover:text-accent/80 gap-2">
                  <RotateCcw className="w-4 h-4" /> Random
                </Button>
              </div>
              <div className="relative">
                <Input 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your name..."
                  className="h-20 text-3xl md:text-4xl font-headline font-bold bg-background/50 border-primary/30 focus:border-primary px-8 rounded-2xl transition-all"
                  autoFocus
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
                  <Badge variant="outline" className="border-accent text-accent">Real-time Rendering</Badge>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pt-4">
              {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft', 'gothic', 'symbols'] as StyleCategory[]).map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  variant={activeTab === cat ? "default" : "outline"}
                  className={`capitalize transition-all duration-300 ${activeTab === cat ? 'bg-primary neon-border' : 'bg-transparent border-primary/20 hover:border-primary/60'}`}
                >
                  {cat === 'all' && <LayoutGrid className="w-4 h-4 mr-2" />}
                  {cat === 'pubg' && <Trophy className="w-4 h-4 mr-2" />}
                  {cat === 'freefire' && <Zap className="w-4 h-4 mr-2" />}
                  {cat}
                </Button>
              ))}
            </div>
          </section>

          {/* Style Results Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStyles.map((style) => {
              const transformed = style.transform(inputText || "Sample");
              const isFav = favorites.includes(transformed);
              return (
                <div 
                  key={style.id}
                  className="glass-morphism group relative p-5 rounded-2xl border border-white/5 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{style.name}</span>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleFavorite(transformed)}
                        className={`h-8 w-8 rounded-full transition-colors ${isFav ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </Button>
                      <Button 
                        onClick={() => handleCopy(style.id, transformed)}
                        className={`h-8 px-4 text-xs font-bold rounded-full transition-all duration-300 ${copiedId === style.id ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary/80'}`}
                      >
                        {copiedId === style.id ? "COPIED" : "COPY"}
                      </Button>
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-mono font-medium truncate py-2 select-all">
                    {transformed}
                  </div>
                </div>
              );
            })}
          </section>

          {/* AI Generator Integration */}
          <AIAliasGenerator />
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-8 space-y-8">
            <IdentityStorage />
            
            {/* Trending Section */}
            <div className="glass-morphism rounded-2xl p-6 border border-accent/20">
              <h3 className="text-lg font-headline font-bold text-accent flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" /> Popular Right Now
              </h3>
              <div className="flex flex-wrap gap-2">
                {["亗 IGN 亗", "꧁༺ KILLER ༻꧂", "々 SKULL ×", "༺ JOKER ༻", "★ VAMP ★"].map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => setInputText(trend.replace(/[^a-zA-Z]/g, '').trim() || trend)}
                    className="px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10 text-xs font-medium hover:bg-accent hover:text-secondary-foreground transition-all"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Text Block */}
            <article className="prose prose-invert prose-sm">
              <h4 className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">About Stylish Glyph</h4>
              <p className="text-muted-foreground/80 leading-relaxed text-xs">
                Welcome to <strong>Stylish Glyph</strong>, the premium gamer tag creator. Our platform provides specialized character mapping for <strong>PUBG Mobile</strong>, <strong>Garena Free Fire</strong>, and <strong>Roblox</strong>. Most games have strict limitations on special characters; our styles are specifically curated to ensure high compatibility while maintaining a aggressive gaming aesthetic. Use our <strong>AI alias generator</strong> to find unique names based on your playstyle.
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <p className="text-muted-foreground text-sm font-light">
          &copy; {new Date().getFullYear()} Stylish Glyph. Created for the global gaming community.
        </p>
      </footer>
    </div>
  );
}
