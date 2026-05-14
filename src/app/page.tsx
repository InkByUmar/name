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
  Zap,
  Star,
  ChevronRight,
  HelpCircle,
  Info,
  ExternalLink,
  MessageSquare
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    
    toast({
      title: "Copied to Clipboard",
      description: `"${text}" is ready to use.`
    });
  };

  const toggleFavorite = (text: string) => {
    const newFavs = favorites.includes(text) 
      ? favorites.filter(f => f !== text)
      : [text, ...favorites];
    
    setFavorites(newFavs);
    localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
  };

  const generateRandom = () => {
    const randomWords = ["Titan", "Ghost", "Nitro", "Bane", "Viper", "Omega", "Raven", "Zod", "Pulse", "Shadow", "Neon", "Void"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 99);
    setInputText(`${randomWord}${randomNum}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 left-0 w-full z-50 bg-white border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#25D366] p-1.5 rounded-lg">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-black tracking-tight text-gray-900 uppercase">
            STYLISH <span className="text-[#25D366]">GAME NAME</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#25D366]">Home</a>
          <a href="#how-to-use" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors">How to Use</a>
          <a href="#about-us" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors">About Us</a>
          <a href="#faq" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors">FAQ</a>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="pt-12 pb-8 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-widest mb-2">
          <Zap className="w-3 h-3" /> Premium Unicode Generator
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight uppercase">
          Forge Your <span className="text-[#25D366]">Identity</span>
        </h1>
        
        <div className="relative max-w-md mx-auto mt-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your name..."
              className="h-12 text-base border-none focus-visible:ring-0 px-4 font-bold text-gray-800"
            />
            <Button onClick={generateRandom} variant="outline" size="icon" className="h-12 w-12 rounded-xl border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'] as StyleCategory[]).map((cat) => (
            <Button
              key={cat}
              onClick={() => setActiveTab(cat)}
              variant={activeTab === cat ? "default" : "outline"}
              className={`h-8 px-6 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                activeTab === cat 
                  ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                  : 'bg-white border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30'
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Section 1: Left Symbol */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#25D366]" /> 01. Left Flank
              </h3>
              <ScrollArea className="h-[140px]">
                <div className="grid grid-cols-5 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLeft("")}
                    className={`h-11 rounded-xl border text-[10px] uppercase font-bold ${selectedLeft === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-white'}`}
                  >
                    None
                  </Button>
                  {LEFT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedLeft(sym)}
                      className={`h-11 text-xl rounded-xl transition-all border ${selectedLeft === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:border-[#25D366]/20 hover:bg-white'}`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Section 2: Right Symbol */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Sword className="w-3.5 h-3.5 text-[#25D366]" /> 02. Right Flank
              </h3>
              <ScrollArea className="h-[140px]">
                <div className="grid grid-cols-5 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRight("")}
                    className={`h-11 rounded-xl border text-[10px] uppercase font-bold ${selectedRight === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-white'}`}
                  >
                    None
                  </Button>
                  {RIGHT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedRight(sym)}
                      className={`h-11 text-xl rounded-xl transition-all border ${selectedRight === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:border-[#25D366]/20 hover:bg-white'}`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Section 3: Font Styles */}
          <div className="lg:col-span-12">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-[#25D366]" /> 03. Neural Font Forge
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase px-3">{filteredStyles.length} Variations</Badge>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredStyles.map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-4 rounded-2xl border transition-all flex flex-col gap-2 ${
                          isActive 
                            ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm' 
                            : 'border-gray-100 bg-white hover:border-[#25D366]/30 hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider">{style.name}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(transformed);
                            }}
                            className="h-7 w-7 rounded-lg hover:bg-[#25D366] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
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
        </div>

        {/* SEO CONTENT */}
        <div className="mt-20 space-y-20">
          <section id="how-to-use" className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">How to Forge Your <span className="text-[#25D366]">Identity</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Input Name", text: "Type your desired nickname in the central forge input." },
                { title: "Select Patterns", text: "Inject tactical prefixes and suffixes from the symbol arsenal." },
                { title: "Export Identity", text: "Choose a neural font transformation and copy your final name." }
              ].map((step, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="text-2xl font-black text-[#25D366]/20">0{i+1}</div>
                  <h4 className="font-bold text-gray-900">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="about-us" className="bg-[#25D366]/5 rounded-[2.5rem] p-10 md:p-16">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-2xl font-black text-gray-900 uppercase">The #1 Unicode Forge</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Stylish Game Name is the world's most stable generator for PUBG, Free Fire, and BGMI. We manually audit every Unicode block to ensure your name renders perfectly across all devices without question marks.
              </p>
            </div>
          </section>

          <section id="faq" className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-black text-gray-900 uppercase text-center">Intel <span className="text-[#25D366]">Report</span></h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm font-bold">Why no question marks?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500">We use 'Safe-Zone' Unicode characters that are natively supported by modern mobile gaming engines.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-bold">Is this tool free?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500">Always. Stylish Game Name is 100% free and requires no registration for unlimited use.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      {/* COMPACT LIVE PREVIEW DOCK */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-3 z-50 shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl flex items-center justify-center min-h-[44px] shadow-inner overflow-hidden">
              <span className="text-sm md:text-base font-bold text-gray-900 tracking-normal text-center break-all">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`h-11 w-11 rounded-xl transition-all ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40' : 'text-gray-400'}`}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              onClick={() => handleCopy(livePreviewText)}
              className="h-11 px-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#25D366]/10 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> Copy
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-16 bg-gray-50 border-t border-gray-100 text-center space-y-4">
        <div className="flex items-center gap-2 justify-center opacity-40 grayscale">
          <Gamepad2 className="w-4 h-4" />
          <span className="text-[10px] font-black tracking-tighter">STYLISH GAME NAME</span>
        </div>
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
