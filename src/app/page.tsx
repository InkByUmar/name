"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Copy, 
  Heart, 
  RotateCcw,
  Shield,
  Box,
  Sword,
  Search,
  Zap,
  Gamepad2,
  Share2,
  Menu,
  TrendingUp,
  Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  STYLE_OPTIONS, 
  StyleCategory, 
  LEFT_SYMBOLS, 
  RIGHT_SYMBOLS,
  TRENDING_NAMES
} from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { AIAliasGenerator } from "@/components/AIAliasGenerator";
import { IdentityStorage } from "@/components/IdentityStorage";
import { SymbolSelector } from "@/components/SymbolSelector";

export default function Home() {
  const [inputText, setInputText] = useState("Pro_Gamer");
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
      title: "Successfully Copied",
      description: `Name "${text}" is ready to use.`
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
    const randomWords = ["Killer", "Phoenix", "Titan", "Rogue", "Apex", "Shadow", "Falcon", "Ghost", "Nitro", "Bane", "Viper", "Omega"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 999);
    setInputText(`${randomWord}_${randomNum}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Top Navigation */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            STYLISH <span className="text-primary">GAME NAME</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="nav-link text-primary">Home</a>
          <a href="#" className="nav-link">How to Use</a>
          <a href="#" className="nav-link">Blog</a>
          <a href="#" className="nav-link">About Us</a>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-full shadow-lg shadow-primary/20">
            GET STARTED
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Header Area */}
      <header className="pt-20 pb-12 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5" /> Premium Font Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Create Your <span className="text-primary">Legendary</span> Gaming Identity
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
          Generate stylish names and fancy text with unique symbols for PUBG, Free Fire, and BGMI. 100% compatible symbols with zero question marks.
        </p>
        
        <div className="relative max-w-xl mx-auto mt-10">
          <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your name here..."
              className="h-14 text-lg border-none focus-visible:ring-0 px-6 font-semibold"
            />
            <Button onClick={generateRandom} variant="outline" size="icon" className="h-14 w-14 rounded-xl border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10">
          {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft', 'symbols'] as StyleCategory[]).map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? "default" : "outline"}
              className={`h-9 px-6 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                activeTab === cat 
                  ? 'bg-primary border-none text-white shadow-md shadow-primary/20' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
        
        {/* Main Interface - 3 Styling Sections */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section 1: Left Symbol Injector */}
            <div className="premium-card p-6 rounded-3xl space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Prefix Styles
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {LEFT_SYMBOLS.slice(0, 12).map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    onClick={() => handleCopy(`${sym} ${inputText}`)}
                    className="h-12 text-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all p-0 rounded-xl"
                  >
                    {sym}
                  </Button>
                ))}
              </div>
            </div>

            {/* Section 2: Right Symbol Injector */}
            <div className="premium-card p-6 rounded-3xl space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Sword className="w-4 h-4 text-primary" /> Suffix Styles
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {RIGHT_SYMBOLS.slice(0, 12).map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    onClick={() => handleCopy(`${inputText} ${sym}`)}
                    className="h-12 text-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all p-0 rounded-xl"
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Box className="w-4 h-4 text-primary" /> Font Transformations
              </h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase">{filteredStyles.length} Styles Available</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStyles.slice(0, 24).map((style) => {
                const transformed = style.transform(inputText || "Pro_Gamer");
                const isFav = favorites.includes(transformed);
                const isCopied = copiedText === transformed;
                
                return (
                  <div 
                    key={style.id}
                    className="premium-card p-5 rounded-2xl flex flex-col justify-between h-32"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase text-gray-400">{style.name}</span>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => toggleFavorite(transformed)}
                          className={`h-7 w-7 rounded-lg ${isFav ? 'text-primary' : 'text-gray-300'}`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </Button>
                        <Button 
                          onClick={() => handleCopy(transformed)}
                          className={`h-7 px-4 text-[10px] font-bold uppercase rounded-lg transition-all ${
                            isCopied ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isCopied ? "Copied" : "Copy"}
                        </Button>
                      </div>
                    </div>
                    <div className="text-lg font-bold truncate text-gray-800">
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
          <div className="sticky top-24 space-y-8">
            <SymbolSelector onSelect={(s) => setInputText(prev => prev + s)} />
            <IdentityStorage />
            
            {/* Trending Tags Section */}
            <div className="premium-card rounded-3xl p-6">
              <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2 mb-6 uppercase tracking-widest">
                <TrendingUp className="w-4 h-4 text-primary" /> Most Popular
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {TRENDING_NAMES.map((trend) => (
                  <button 
                    key={trend}
                    onClick={() => handleCopy(trend)}
                    className="flex justify-between items-center px-4 py-3 rounded-xl bg-gray-50 border border-transparent text-sm font-semibold text-gray-600 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                  >
                    <span>{trend}</span>
                    <Copy className="w-3.5 h-3.5 opacity-30" />
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Blog/Info Card */}
            <article className="bg-primary p-6 rounded-3xl text-white space-y-3 shadow-xl shadow-primary/20">
              <h4 className="uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
                <Award className="w-4 h-4" /> Why Choose Us?
              </h4>
              <p className="text-white/80 leading-relaxed text-xs font-medium">
                Our generator uses high-stability Unicode characters specifically tested for mobile battle royale games. No missing glyphs, just pure style.
              </p>
            </article>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-20 py-16 bg-white border-t border-gray-100 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="flex justify-center gap-8">
            <Share2 className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
            <Gamepad2 className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
            <TrendingUp className="w-5 h-5 text-gray-400 hover:text-primary transition-colors cursor-pointer" />
          </div>
          <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Stylish Game Name. Professional Identity Forge.
          </p>
        </div>
      </footer>
    </div>
  );
}
