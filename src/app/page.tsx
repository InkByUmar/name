"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Zap, 
  Copy, 
  Heart, 
  Trophy, 
  LayoutGrid,
  TrendingUp,
  RotateCcw,
  Flame,
  Ghost,
  Crosshair,
  Gamepad2,
  Share2,
  Menu,
  X,
  Shield,
  Box,
  Sword
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  STYLE_OPTIONS, 
  StyleCategory, 
  LEFT_SYMBOLS, 
  RIGHT_SYMBOLS,
  TRENDING_NAMES,
  POPULAR_SYMBOLS
} from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { AIAliasGenerator } from "@/components/AIAliasGenerator";
import { IdentityStorage } from "@/components/IdentityStorage";
import { SymbolSelector } from "@/components/SymbolSelector";

export default function Home() {
  const [inputText, setInputText] = useState("Vanquisher");
  const [activeTab, setActiveTab] = useState<StyleCategory>("all");
  const [copiedText, setCopiedText] = useState<string | null>(null);
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    
    const history = JSON.parse(localStorage.getItem("stylish-glyph-history") || "[]");
    const newHistory = [text, ...history.filter((h: string) => h !== text)].slice(0, 50);
    localStorage.setItem("stylish-glyph-history", JSON.stringify(newHistory));
    
    window.dispatchEvent(new Event("storage-update"));

    setTimeout(() => setCopiedText(null), 2000);
    
    toast({
      title: "Tactical Copy Confirmed",
      description: `Target acquired: "${text}"`
    });
  };

  const toggleFavorite = (text: string) => {
    const newFavs = favorites.includes(text) 
      ? favorites.filter(f => f !== text)
      : [text, ...favorites];
    
    setFavorites(newFavs);
    localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
    window.dispatchEvent(new Event("storage-update"));
  };

  const generateRandom = () => {
    const randomWords = ["Slayer", "Omega", "Vortex", "Rogue", "Titan", "Phantom", "Glitch", "Wraith", "Havoc", "Fury", "Bane", "Apex", "Ronin"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 99);
    setInputText(`${randomWord}${randomNum}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden gaming-grid bg-background">
      <div className="scanline"></div>
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-white/5 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg shadow-[0_0_15px_hsl(var(--primary)/0.4)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-black tracking-tighter neon-glow-primary">
            STYLISH <span className="text-accent">GAME NAME</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">How to Use</a>
          <a href="#" className="nav-link">Blog</a>
          <a href="#" className="nav-link">About Us</a>
          <Button size="sm" className="bg-success hover:bg-success/80 text-white font-black px-6 rounded-full shadow-[0_0_15px_hsl(var(--success)/0.3)]">
            JOIN DISCORD
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Input Area */}
      <header className="pt-32 pb-12 px-4 text-center max-w-4xl mx-auto space-y-6 relative z-10">
        <Badge variant="outline" className="px-4 py-1.5 border-primary/30 text-primary uppercase font-black tracking-widest text-[10px] bg-primary/5 animate-pulse">
          Elite Tactical Identity Deployment
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
          BATTLE-READY <span className="text-primary neon-glow-primary">NICKNAMES</span>
        </h1>
        
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-success rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex gap-2">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="ENTER YOUR NAME..."
              className="h-16 text-xl md:text-2xl font-bold bg-muted/80 border-white/5 focus:border-primary/40 px-8 rounded-xl placeholder:opacity-20 uppercase tracking-wider"
            />
            <Button onClick={generateRandom} size="icon" className="h-16 w-16 rounded-xl bg-muted border border-white/5 hover:bg-muted/60 transition-all text-accent">
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft', 'symbols'] as StyleCategory[]).map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? "default" : "outline"}
              className={`h-9 px-5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300 ${
                activeTab === cat 
                  ? 'bg-primary border-none text-white shadow-[0_0_15px_hsl(var(--primary)/0.3)]' 
                  : 'bg-muted/40 border-white/5 text-muted-foreground hover:border-primary/40'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 relative z-10">
        
        {/* Main Workspace - 3 Separate Styling Sections */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section 1: Left Symbol Injector */}
            <div className="glass-morphism p-6 rounded-2xl border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                <Shield className="w-4 h-4" /> Left Flank Styles
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {LEFT_SYMBOLS.slice(0, 12).map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    onClick={() => handleCopy(`${sym} ${inputText}`)}
                    className="h-12 text-xl bg-white/5 border-white/5 hover:border-primary/40 hover:text-primary transition-all p-0"
                  >
                    {sym}
                  </Button>
                ))}
              </div>
            </div>

            {/* Section 2: Right Symbol Injector */}
            <div className="glass-morphism p-6 rounded-2xl border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                <Sword className="w-4 h-4" /> Right Flank Styles
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {RIGHT_SYMBOLS.slice(0, 12).map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    onClick={() => handleCopy(`${inputText} ${sym}`)}
                    className="h-12 text-xl bg-white/5 border-white/5 hover:border-accent/40 hover:text-accent transition-all p-0"
                  >
                    {sym}
                  </Button>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Full Font Transformations */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Box className="w-4 h-4" /> Neural Font Forge
              </h3>
              <span className="text-[10px] text-muted-foreground/50 font-black uppercase">{filteredStyles.length} STYLES READY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStyles.slice(0, 24).map((style) => {
                const transformed = style.transform(inputText || "Vanquisher");
                const isFav = favorites.includes(transformed);
                const isCopied = copiedText === transformed;
                
                return (
                  <div 
                    key={style.id}
                    className="glass-morphism group p-5 rounded-xl border-white/5 hover:border-primary/20 transition-all hover:bg-white/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary">{style.name}</span>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => toggleFavorite(transformed)}
                          className={`h-7 w-7 rounded-lg transition-all ${isFav ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </Button>
                        <Button 
                          onClick={() => handleCopy(transformed)}
                          className={`h-7 px-4 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                            isCopied ? 'bg-success text-white' : 'bg-primary/20 text-primary hover:bg-primary/30'
                          }`}
                        >
                          {isCopied ? "COPIED" : "COPY"}
                        </Button>
                      </div>
                    </div>
                    <div className="text-lg md:text-xl font-bold truncate text-white/90">
                      {transformed}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AIAliasGenerator />
        </div>

        {/* Sidebar Panel */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-20 space-y-8">
            <SymbolSelector onSelect={(s) => setInputText(prev => prev + s)} />
            <IdentityStorage />
            
            {/* Trending Tags Section - Fixed Question Marks */}
            <div className="glass-morphism rounded-2xl p-6 border-accent/20">
              <h3 className="text-xs font-black text-accent flex items-center gap-2 mb-6 uppercase tracking-widest">
                <TrendingUp className="w-4 h-4" /> Trending Ops
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {TRENDING_NAMES.map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => handleCopy(trend)}
                    className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-white/70 hover:bg-accent/10 hover:text-accent hover:border-accent/40 transition-all"
                  >
                    <span>{trend}</span>
                    <Copy className="w-3 h-3 opacity-30" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tactical Intel */}
            <article className="glass-morphism p-6 rounded-2xl border-white/5 space-y-4">
              <h4 className="text-muted-foreground uppercase tracking-widest text-[9px] font-black flex items-center gap-2">
                <Ghost className="w-4 h-4" /> Tactical Intel
              </h4>
              <p className="text-muted-foreground/70 leading-relaxed text-[11px] font-medium uppercase tracking-tight">
                Stylish Game Name is the elite forge for high-tier gaming identities. Optimized for <span className="text-white">PUBG</span>, <span className="text-white">Free Fire</span>, and <span className="text-white">BGMI</span>. 
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-16 border-t border-white/5 glass-morphism text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="flex justify-center gap-6">
            <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            <Gamepad2 className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
            <Trophy className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          </div>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            &copy; {new Date().getFullYear()} STYLISH GAME NAME COMMAND. ALL SYSTEMS NOMINAL.
          </p>
        </div>
      </footer>
    </div>
  );
}
