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
  Share2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STYLE_OPTIONS, StyleCategory } from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { AIAliasGenerator } from "@/components/AIAliasGenerator";
import { IdentityStorage } from "@/components/IdentityStorage";
import { SymbolSelector } from "@/components/SymbolSelector";

export default function Home() {
  const [inputText, setInputText] = useState("Vanquisher");
  const [activeTab, setActiveTab] = useState<StyleCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavs = localStorage.getItem("stylish-glyph-favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const filteredStyles = useMemo(() => {
    if (activeTab === 'symbols') return [];
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

    setTimeout(() => setCopiedId(null), 1500);
    
    toast({
      title: "Tactical Copy Successful",
      description: `"${text}" copied to clipboard.`
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
    const randomWords = ["Rampage", "Omega", "Cipher", "Vortex", "Slayer", "Apex", "Ronin", "Zenith", "Glitch", "Phantom", "Havoc", "Fury"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 999);
    setInputText(`${randomWord}${randomNum}`);
  };

  const handleSymbolSelect = (symbol: string) => {
    setInputText(prev => prev + symbol);
  };

  return (
    <div className="min-h-screen relative overflow-hidden gaming-grid">
      <div className="scanline"></div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsla(280,100%,60%,0.1),transparent_70%)] pointer-events-none"></div>

      {/* Hero Section */}
      <header className="pt-20 pb-12 px-4 text-center max-w-6xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-morphism border-primary/40 text-primary text-xs font-bold tracking-[0.2em] uppercase animate-pulse-fast">
          <Crosshair className="w-4 h-4" /> Level Up Your Identity
        </div>
        <h1 className="text-6xl md:text-8xl font-headline font-black text-white tracking-tighter neon-glow-primary">
          STYLISH <span className="text-accent neon-glow-accent">GLYPH</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-tight">
          Elite fancy text engine for <span className="text-primary">PUBG</span>, <span className="text-accent">Free Fire</span>, and <span className="text-white">BGMI</span>. 
          Deploy 120+ unique styles into battle.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        {/* Left Column - Interaction Zone */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Central Command Input */}
          <section className="glass-morphism rounded-3xl p-8 border-t border-l border-white/10 neon-border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Gamepad2 className="w-48 h-48" />
            </div>
            
            <div className="relative space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Input Target String
                </label>
                <Button variant="ghost" size="sm" onClick={generateRandom} className="text-accent hover:bg-accent/10 gap-2 font-black tracking-widest uppercase text-[10px]">
                  <RotateCcw className="w-3 h-3" /> Re-roll Random
                </Button>
              </div>
              
              <div className="relative">
                <Input 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="DEPLOY NAME..."
                  className="h-24 text-4xl md:text-6xl font-headline font-black bg-background/40 border-primary/20 focus:border-primary px-8 rounded-2xl transition-all selection:bg-primary/30"
                  autoFocus
                />
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2">
                {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft', 'gothic', 'symbols'] as StyleCategory[]).map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    variant={activeTab === cat ? "default" : "outline"}
                    className={`capitalize h-11 px-6 font-black tracking-widest text-[11px] transition-all duration-300 ${
                      activeTab === cat 
                        ? 'bg-primary neon-border-primary border-none text-white' 
                        : 'glass-morphism border-white/5 hover:border-primary/50'
                    }`}
                  >
                    {cat === 'all' && <LayoutGrid className="w-4 h-4 mr-2" />}
                    {cat === 'pubg' && <Trophy className="w-4 h-4 mr-2" />}
                    {cat === 'freefire' && <Flame className="w-4 h-4 mr-2" />}
                    {cat === 'cod' && <Crosshair className="w-4 h-4 mr-2" />}
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Special Feature: Symbol Selector (visible when tab is symbols or always) */}
          {activeTab === 'symbols' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SymbolSelector onSelect={handleSymbolSelect} />
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStyles.map((style) => {
                const transformed = style.transform(inputText || "Vanquisher");
                const isFav = favorites.includes(transformed);
                const isCopied = copiedId === style.id;
                
                return (
                  <div 
                    key={style.id}
                    className="glass-morphism group relative p-6 rounded-2xl border border-white/5 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{style.name}</span>
                        <Badge variant="outline" className="w-fit text-[8px] h-4 mt-1 border-white/10 text-muted-foreground px-1 uppercase">Compatible</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => toggleFavorite(transformed)}
                          className={`h-9 w-9 rounded-xl transition-colors ${isFav ? 'text-primary' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                        </Button>
                        <Button 
                          onClick={() => handleCopy(style.id, transformed)}
                          className={`h-9 px-6 text-[10px] font-black tracking-[0.1em] rounded-xl transition-all duration-300 ${
                            isCopied ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-accent hover:bg-accent/80 text-secondary-foreground'
                          }`}
                        >
                          {isCopied ? "COPIED" : "COPY"}
                        </Button>
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-medium truncate py-2 select-all font-body text-white/90 group-hover:text-white transition-colors">
                      {transformed}
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {/* AI Zone */}
          <AIAliasGenerator />
        </div>

        {/* Right Column - Tactical Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-8 space-y-8">
            <SymbolSelector onSelect={handleSymbolSelect} />
            <IdentityStorage />
            
            {/* Real-time Trending Stats */}
            <div className="glass-morphism rounded-2xl p-6 border border-accent/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <TrendingUp className="w-24 h-24" />
              </div>
              <h3 className="text-sm font-headline font-black text-accent flex items-center gap-2 mb-6 uppercase tracking-widest">
                <TrendingUp className="w-5 h-5" /> Combat Proven Tags
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {["亗 IGN 亗", "꧁༺ KILLER ༻꧂", "々 SKULL ×", "༺ JOKER ༻", "★ VAMP ★", "〆 ZERO 〆"].map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => setInputText(trend.replace(/[^a-zA-Z]/g, '').trim() || trend)}
                    className="px-3 py-3 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all text-left"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            {/* Tactical Briefing (SEO) */}
            <article className="glass-morphism p-6 rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-black flex items-center gap-2">
                <Ghost className="w-3 h-3" /> Intel Briefing
              </h4>
              <p className="text-muted-foreground/60 leading-relaxed text-[11px] font-medium uppercase tracking-tight">
                Stylish Glyph is the primary forge for elite gamer tags. Optimized for <span className="text-white">PUBG Mobile</span>, <span className="text-white">Garena Free Fire</span>, and <span className="text-white">BGMI</span>. 
                Our engine ensures 100% character compatibility while maintaining aggressive aesthetics. Deploy the <span className="text-accent">AI Forge</span> for data-driven alias generation.
              </p>
              <div className="flex gap-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-primary font-black text-lg">120+</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Styles</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-black text-lg">∞</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Combos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">100%</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-widest">Secure</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Global Action Bar */}
      <footer className="mt-10 py-12 border-t border-white/5 glass-morphism text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="flex justify-center gap-6 mb-8">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors"><Gamepad2 className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors"><Trophy className="w-5 h-5" /></Button>
          </div>
          <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.4em] opacity-50">
            &copy; {new Date().getFullYear()} STYLISH GLYPH COMMAND CENTER. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}