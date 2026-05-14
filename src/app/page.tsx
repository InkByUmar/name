"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  Copy, 
  Heart, 
  RotateCcw,
  Shield,
  Type,
  Sword,
  Gamepad2,
  Menu,
  Sparkles,
  CheckCircle2,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  STYLE_OPTIONS, 
  StyleCategory, 
  LEFT_SYMBOLS, 
  RIGHT_SYMBOLS
} from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { IdentityStorage } from "@/components/IdentityStorage";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const [inputText, setInputText] = useState("ProGamer");
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
    if (!text) return;
    navigator.clipboard.writeText(text);
    
    const history = JSON.parse(localStorage.getItem("stylish-glyph-history") || "[]");
    const newHistory = [text, ...history.filter((h: string) => h !== text)].slice(0, 50);
    localStorage.setItem("stylish-glyph-history", JSON.stringify(newHistory));
    
    window.dispatchEvent(new Event("storage-update"));

    toast({
      title: "Identity Copied",
      description: `Successfully moved to clipboard.`
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
    const randomWords = ["Titan", "Ghost", "Nitro", "Bane", "Viper", "Omega", "Raven", "Zod", "Pulse", "Shadow", "Neon", "Void"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 99);
    setInputText(`${randomWord}${randomNum}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Top Navigation */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#25D366] p-1.5 rounded-lg shadow-sm">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-black tracking-tight text-gray-900">
            STYLISH <span className="text-[#25D366]">GLYPH</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#25D366]">Home</a>
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">How to Use</a>
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Blog</a>
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">About Us</a>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Header Area */}
      <header className="pt-10 pb-6 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-widest">
          <Zap className="w-3 h-3" /> Professional Name Forge
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">
          Craft Your <span className="text-[#25D366]">Gaming Identity</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium max-w-lg mx-auto leading-relaxed">
          Premium character generator optimized for PUBG, Free Fire, and BGMI. 100% stable Unicode symbols only.
        </p>
        
        <div className="relative max-w-md mx-auto mt-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-lg shadow-[#25D366]/5 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your name..."
              className="h-10 text-sm border-none focus-visible:ring-0 px-4 font-bold text-gray-800"
            />
            <Button onClick={generateRandom} variant="outline" size="icon" className="h-10 w-10 rounded-xl border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'] as StyleCategory[]).map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? "default" : "outline"}
              className={`h-7 px-4 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all ${
                activeTab === cat 
                  ? 'bg-[#25D366] border-none text-white shadow-md shadow-[#25D366]/20' 
                  : 'bg-white border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-48">
        
        {/* Step 1: Left Flank */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#25D366]" /> 01. Prefix
            </h3>
            <ScrollArea className="h-[180px]">
              <div className="grid grid-cols-4 gap-2 pr-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedLeft("")}
                  className={`h-9 rounded-xl border text-[10px] uppercase font-bold ${selectedLeft === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50'}`}
                >
                  None
                </Button>
                {LEFT_SYMBOLS.map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    onClick={() => setSelectedLeft(sym)}
                    className={`h-9 text-lg rounded-xl transition-all border ${selectedLeft === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-[#25D366]/5 hover:text-[#25D366]'}`}
                  >
                    {sym}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Step 2: Font Forge */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-[#25D366]" /> 02. Neural Font
              </h3>
              <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase">{filteredStyles.length} Styles</Badge>
            </div>
            
            <ScrollArea className="h-[450px] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredStyles.map((style) => {
                  const transformed = style.transform(inputText || "Name");
                  const isActive = selectedStyleId === style.id;
                  
                  return (
                    <div 
                      key={style.id}
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`cursor-pointer p-3 rounded-2xl border transition-all flex flex-col gap-1 ${
                        isActive 
                          ? 'border-[#25D366] bg-[#25D366]/5 shadow-inner' 
                          : 'border-gray-50 bg-gray-50 hover:border-[#25D366]/20 hover:bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider">{style.name}</span>
                        {isActive && <CheckCircle2 className="w-3 h-3 text-[#25D366]" />}
                      </div>
                      <div className="text-sm font-bold truncate text-gray-800">
                        {transformed}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Step 3: Right Flank */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-100 p-5 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Sword className="w-3.5 h-3.5 text-[#25D366]" /> 03. Suffix
            </h3>
            <ScrollArea className="h-[180px]">
              <div className="grid grid-cols-4 gap-2 pr-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedRight("")}
                  className={`h-9 rounded-xl border text-[10px] uppercase font-bold ${selectedRight === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50'}`}
                >
                  None
                </Button>
                {RIGHT_SYMBOLS.map((sym, i) => (
                  <Button 
                    key={i} 
                    variant="ghost" 
                    onClick={() => setSelectedRight(sym)}
                    className={`h-9 text-lg rounded-xl transition-all border ${selectedRight === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-[#25D366]/5 hover:text-[#25D366]'}`}
                  >
                    {sym}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Hub */}
          <IdentityStorage />
        </div>
      </main>

      {/* FIXED LIVE PREVIEW DOCK */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 p-5 md:p-8 z-50 shadow-[0_-25px_50px_rgba(0,0,0,0.04)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full text-center md:text-left">
            <div className="text-[10px] font-black text-[#25D366] uppercase tracking-[0.25em] mb-3 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Identity Link Preview
            </div>
            <div className="bg-gray-50 border-2 border-[#25D366]/10 p-6 rounded-3xl flex items-center justify-center min-h-[80px] shadow-inner">
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-normal text-center break-all">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`flex-1 md:flex-none h-16 w-16 rounded-2xl border-gray-200 transition-all active:scale-90 ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/30' : 'text-gray-400'}`}
            >
              <Heart className={`w-7 h-7 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              size="lg"
              onClick={() => handleCopy(livePreviewText)}
              className="flex-1 md:w-64 h-16 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Copy className="w-5 h-5" /> Copy Link
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-10 bg-white border-t border-gray-50 text-center">
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} Stylish Glyph. Premium Unicode Forge.
        </p>
      </footer>
    </div>
  );
}
