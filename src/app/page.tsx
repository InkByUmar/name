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
  CheckCircle2
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
    const randomWords = ["Rampage", "Omega", "Cipher", "Vortex", "Slayer", "Apex", "Ronin", "Zenith", "Glitch", "Phantom", "Havoc", "Fury", "Titan", "Rogue", "Bane"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 999);
    setInputText(`${randomWord}${randomNum}`);
  };

  const handleSymbolSelect = (symbol: string) => {
    setInputText(prev => prev + symbol);
  };

  return (
    <div className="min-h-screen relative overflow-hidden gaming-grid font-headline">
      <div className="scanline"></div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] hero-gradient pointer-events-none"></div>

      {/* Header Section */}
      <header className="pt-24 pb-16 px-4 text-center max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-morphism border-primary/40 text-primary text-[10px] font-black tracking-[0.3em] uppercase animate-pulse-fast shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <Crosshair className="w-4 h-4" /> Strategic Identity Deployment
        </div>
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter neon-glow-primary">
          STYLISH <span className="text-accent neon-glow-accent">GLYPH</span>
        </h1>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium leading-relaxed uppercase tracking-tight">
          Elite fancy text engine optimized for <span className="text-primary font-black">PUBG</span>, <span className="text-accent font-black">Free Fire</span>, and <span className="text-white font-black">BGMI</span>. 
          Deploy 120+ battle-ready styles into combat.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32 relative z-10">
        {/* Left Column - Main Workspace */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Main Input Control Center */}
          <section className="glass-morphism rounded-[2.5rem] p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
              <Gamepad2 className="w-96 h-96" />
            </div>
            
            <div className="relative space-y-8">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                  <Flame className="w-4 h-4" /> Input Payload
                </label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={generateRandom} 
                  className="text-accent hover:bg-accent/10 gap-2 font-black tracking-widest uppercase text-[10px] h-8"
                >
                  <RotateCcw className="w-3 h-3" /> Randomize
                </Button>
              </div>
              
              <div className="relative">
                <Input 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="DEPLOY NAME..."
                  className="h-28 text-4xl md:text-7xl font-black bg-background/50 border-white/5 focus:border-primary/50 focus:ring-primary/20 px-10 rounded-3xl transition-all selection:bg-primary/40 placeholder:opacity-20 uppercase"
                  autoFocus
                />
              </div>

              {/* Navigation Categories */}
              <div className="flex flex-wrap gap-3">
                {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'symbols'] as StyleCategory[]).map((cat) => (
                  <Button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    variant={activeTab === cat ? "default" : "outline"}
                    className={`capitalize h-12 px-8 font-black tracking-[0.2em] text-[10px] transition-all duration-500 rounded-xl ${
                      activeTab === cat 
                        ? 'bg-primary neon-border-primary border-none text-white' 
                        : 'glass-morphism border-white/10 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    {cat === 'all' && <LayoutGrid className="w-4 h-4 mr-2" />}
                    {cat === 'pubg' && <Trophy className="w-4 h-4 mr-2" />}
                    {cat === 'freefire' && <Flame className="w-4 h-4 mr-2" />}
                    {cat === 'cod' && <Crosshair className="w-4 h-4 mr-2" />}
                    {cat === 'symbols' && <Zap className="w-4 h-4 mr-2" />}
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Styles Display Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
            {filteredStyles.map((style) => {
              const transformed = style.transform(inputText || "Vanquisher");
              const isFav = favorites.includes(transformed);
              const isCopied = copiedId === style.id;
              
              return (
                <div 
                  key={style.id}
                  className="glass-morphism group relative p-8 rounded-3xl border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">{style.name}</span>
                      <div className="flex gap-2">
                        {style.category.map(c => (
                          <Badge key={c} variant="outline" className="text-[7px] h-4 border-white/5 text-muted-foreground px-1.5 uppercase font-black">{c}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleFavorite(transformed)}
                        className={`h-10 w-10 rounded-xl transition-all ${isFav ? 'text-primary scale-110' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`}
                      >
                        <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                      </Button>
                      <Button 
                        onClick={() => handleCopy(style.id, transformed)}
                        className={`h-10 px-8 text-[10px] font-black tracking-[0.2em] rounded-xl transition-all duration-500 shadow-lg ${
                          isCopied ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-accent hover:bg-accent/80 text-secondary-foreground'
                        }`}
                      >
                        {isCopied ? "DEPLOYED" : "COPY"}
                      </Button>
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold truncate py-3 select-all text-white/90 group-hover:text-white transition-colors">
                    {transformed}
                  </div>
                </div>
              );
            })}
          </section>

          {/* AI Generation Zone */}
          <AIAliasGenerator />
        </div>

        {/* Right Column - Side Panel */}
        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-10 space-y-10">
            <SymbolSelector onSelect={handleSymbolSelect} />
            <IdentityStorage />
            
            {/* Trending Tags Display */}
            <div className="glass-morphism rounded-3xl p-8 border border-accent/20 relative overflow-hidden shadow-2xl">
              <div className="absolute -right-6 -top-6 opacity-[0.05]">
                <TrendingUp className="w-32 h-32" />
              </div>
              <h3 className="text-xs font-black text-accent flex items-center gap-3 mb-8 uppercase tracking-[0.4em]">
                <TrendingUp className="w-5 h-5" /> Combat Proven
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["亗 IGN 亗", "꧁༺ KILLER ༻꧂", "々 SKULL ×", "༺ JOKER ༻", "★ VAMP ★", "〆 ZERO 〆"].map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => setInputText(trend.replace(/[^a-zA-Z]/g, '').trim() || trend)}
                    className="px-4 py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all text-left shadow-md hover:shadow-accent/20"
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>

            {/* Tactical Intel */}
            <article className="glass-morphism p-8 rounded-3xl border border-white/5 space-y-6">
              <h4 className="text-muted-foreground uppercase tracking-[0.4em] text-[9px] font-black flex items-center gap-3">
                <Ghost className="w-4 h-4" /> Intel Briefing
              </h4>
              <p className="text-muted-foreground/70 leading-relaxed text-[11px] font-medium uppercase tracking-tight">
                Stylish Glyph is the primary forge for elite gamer tags. Optimized for <span className="text-white">PUBG Mobile</span>, <span className="text-white">Free Fire</span>, and <span className="text-white">BGMI</span>. 
                Our engine ensures 100% character compatibility while maintaining aggressive aesthetics.
              </p>
              <div className="flex gap-6 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-primary font-black text-2xl">120+</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Styles</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent font-black text-2xl">∞</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Combos</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-2xl">100%</span>
                  <span className="text-[8px] text-muted-foreground font-black uppercase tracking-[0.2em]">Uptime</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Footer System */}
      <footer className="mt-20 py-20 border-t border-white/5 glass-morphism text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="flex justify-center gap-8">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-all hover:scale-125"><Share2 className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-all hover:scale-125"><Gamepad2 className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-all hover:scale-125"><Trophy className="w-6 h-6" /></Button>
          </div>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.6em] opacity-40">
            &copy; {new Date().getFullYear()} STYLISH GLYPH COMMAND CENTER. MISSION READY.
          </p>
        </div>
      </footer>
    </div>
  );
}
