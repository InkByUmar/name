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
  Award,
  Sparkles,
  CheckCircle2
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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [inputText, setInputText] = useState("Pro_Gamer");
  const [selectedLeft, setSelectedLeft] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState("bold");
  const [activeTab, setActiveTab] = useState<StyleCategory>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavs = localStorage.getItem("stylish-glyph-favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  const currentStyle = useMemo(() => 
    STYLE_OPTIONS.find(s => s.id === selectedStyleId) || STYLE_OPTIONS[0]
  , [selectedStyleId]);

  const livePreviewText = useMemo(() => {
    const transformed = currentStyle.transform(inputText || "Name");
    return `${selectedLeft} ${transformed} ${selectedRight}`.trim();
  }, [inputText, selectedLeft, selectedRight, currentStyle]);

  const filteredStyles = useMemo(() => {
    return STYLE_OPTIONS.filter(style => 
      activeTab === 'all' || style.category.includes(activeTab)
    );
  }, [activeTab]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    
    const history = JSON.parse(localStorage.getItem("stylish-glyph-history") || "[]");
    const newHistory = [text, ...history.filter((h: string) => h !== text)].slice(0, 50);
    localStorage.setItem("stylish-glyph-history", JSON.stringify(newHistory));
    
    window.dispatchEvent(new Event("storage-update"));

    toast({
      title: "Copied!",
      description: `"${text}" is on your clipboard.`
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
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Premium Top Navigation */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            STYLISH <span className="text-primary">GLYPH</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="nav-link text-primary">Home</a>
          <a href="#" className="nav-link">Features</a>
          <a href="#" className="nav-link">Guides</a>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6">
            LAUNCH AI
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Header Area */}
      <header className="pt-12 pb-8 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
          <Zap className="w-3 h-3" /> Professional Name Engine
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          The Ultimate <span className="text-primary">Gamer Tag</span> Forge
        </h1>
        <p className="text-gray-500 text-sm font-medium max-w-xl mx-auto">
          Create premium identifiers for PUBG, Free Fire, and BGMI. 100% Unicode stability with zero broken glyphs.
        </p>
        
        <div className="relative max-w-lg mx-auto mt-8">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter base name..."
              className="h-12 text-base border-none focus-visible:ring-0 px-5 font-semibold"
            />
            <Button onClick={generateRandom} variant="outline" size="icon" className="h-12 w-12 rounded-xl border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20">
              <RotateCcw className="w-4 h-4" />
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
              className={`h-8 px-5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                activeTab === cat 
                  ? 'bg-primary border-none text-white shadow-lg shadow-primary/20' 
                  : 'bg-white border-gray-100 text-gray-500 hover:text-primary hover:border-primary/30'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-40">
        
        {/* Step 1: Left Symbols */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-primary" /> 01. Prefix
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedLeft("")}
                className={`h-10 rounded-xl border ${selectedLeft === "" ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-gray-50'}`}
              >
                None
              </Button>
              {LEFT_SYMBOLS.map((sym, i) => (
                <Button 
                  key={i} 
                  variant="ghost" 
                  onClick={() => setSelectedLeft(sym)}
                  className={`h-10 text-lg rounded-xl transition-all border ${selectedLeft === sym ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-gray-50 hover:bg-primary/5 hover:text-primary'}`}
                >
                  {sym}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Font Forge */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-primary" /> 02. Neural Font
              </h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary font-bold">{filteredStyles.length} Options</Badge>
            </div>
            
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredStyles.map((style) => {
                  const transformed = style.transform(inputText || "Name");
                  const isActive = selectedStyleId === style.id;
                  
                  return (
                    <div 
                      key={style.id}
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col gap-1 ${
                        isActive 
                          ? 'border-primary bg-primary/5 shadow-inner' 
                          : 'border-gray-50 bg-gray-50 hover:border-primary/20 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold uppercase text-gray-400">{style.name}</span>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-primary" />}
                      </div>
                      <div className="text-base font-bold truncate text-gray-800">
                        {transformed}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Step 3: Right Symbols */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Sword className="w-3.5 h-3.5 text-primary" /> 03. Suffix
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedRight("")}
                className={`h-10 rounded-xl border ${selectedRight === "" ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-gray-50'}`}
              >
                None
              </Button>
              {RIGHT_SYMBOLS.map((sym, i) => (
                <Button 
                  key={i} 
                  variant="ghost" 
                  onClick={() => setSelectedRight(sym)}
                  className={`h-10 text-lg rounded-xl transition-all border ${selectedRight === sym ? 'border-primary bg-primary/5 text-primary' : 'border-gray-50 bg-gray-50 hover:bg-primary/5 hover:text-primary'}`}
                >
                  {sym}
                </Button>
              ))}
            </div>
          </div>

          {/* Identity Hub */}
          <IdentityStorage />
        </div>
      </main>

      {/* FIXED LIVE PREVIEW BOX */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 md:p-6 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full">
            <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Digital Identity Preview
            </div>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center justify-center min-h-[60px]">
              <span className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight text-center break-all">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`flex-1 md:flex-none h-14 w-14 rounded-2xl border-gray-200 ${favorites.includes(livePreviewText) ? 'text-primary fill-current' : 'text-gray-400'}`}
            >
              <Heart className={`w-6 h-6 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              size="lg"
              onClick={() => handleCopy(livePreviewText)}
              className="flex-1 md:w-64 h-14 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-3 transition-transform active:scale-95"
            >
              <Copy className="w-5 h-5" /> Copy Identity
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-12 bg-gray-50 border-t border-gray-100 text-center opacity-50">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Stylish Glyph. Pro Identity forge.
        </p>
      </footer>
    </div>
  );
}

