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
  Zap,
  Sparkles,
  Info,
  HelpCircle,
  CheckCircle2,
  Layers
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

type ActiveTab = 'left' | 'right' | 'fonts';

export default function Home() {
  const [inputText, setInputText] = useState("ProGamer");
  const [selectedLeft, setSelectedLeft] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState("bold");
  const [styleCategory, setStyleCategory] = useState<StyleCategory>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveTab>('fonts');
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
      styleCategory === 'all' || style.category.includes(styleCategory)
    );
  }, [styleCategory]);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `"${text}" is ready for battle.`
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
      <nav className="sticky top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#25D366] p-1.5 rounded-lg shrink-0">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm md:text-base font-black tracking-tight text-gray-900 uppercase truncate">
            STYLISH <span className="text-[#25D366]">GAME NAME</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#25D366]">Home</a>
          <a href="#how-to-use" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors">How to Use</a>
          <a href="#about-us" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors">About Us</a>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="pt-8 pb-4 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-widest mb-1">
          <Zap className="w-3 h-3" /> 100% Stable Unicode Engine
        </div>
        <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight uppercase">
          Create Your <span className="text-[#25D366]">Gamer Identity</span>
        </h1>
        
        <div className="relative max-w-md mx-auto mt-4 md:mt-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your name..."
              className="h-10 md:h-12 text-sm md:text-base border-none focus-visible:ring-0 px-3 md:px-4 font-bold text-gray-800"
            />
            <Button onClick={generateRandom} variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs (Font Filtering) - Scrollable on mobile */}
        <div className="mt-6">
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex justify-start md:justify-center gap-2 px-4">
              {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'] as StyleCategory[]).map((cat) => (
                <Button
                  key={cat}
                  onClick={() => {
                    setStyleCategory(cat);
                    setActiveFilter('fonts');
                  }}
                  variant={styleCategory === cat ? "default" : "outline"}
                  className={`h-8 px-4 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                    styleCategory === cat 
                      ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                      : 'bg-white border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30'
                  }`}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Visibility Filter Buttons - Stackable on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-6 pb-4 max-w-2xl mx-auto border-b border-gray-50">
          <Button
            onClick={() => setActiveFilter('left')}
            variant={activeFilter === 'left' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'left' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:text-[#25D366] hover:border-[#25D366]/30'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" /> Left Symbol
          </Button>
          <Button
            onClick={() => setActiveFilter('right')}
            variant={activeFilter === 'right' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'right' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:text-[#25D366] hover:border-[#25D366]/30'
            }`}
          >
            <Sword className="w-4 h-4 mr-2" /> Right Symbol
          </Button>
          <Button
            onClick={() => setActiveFilter('fonts')}
            variant={activeFilter === 'fonts' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'fonts' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:text-[#25D366] hover:border-[#25D366]/30'
            }`}
          >
            <Type className="w-4 h-4 mr-2" /> Font Styles
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pb-48">
        <div className="space-y-6">
          
          {/* Section 1: Left Symbol */}
          {activeFilter === 'left' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#25D366]" /> 01. Left Symbol Injection
              </h3>
              <ScrollArea className="h-[250px] md:h-[200px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLeft("")}
                    className={`h-11 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold ${selectedLeft === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-white'}`}
                  >
                    None
                  </Button>
                  {LEFT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedLeft(sym)}
                      className={`h-11 text-lg md:text-xl rounded-xl transition-all border ${selectedLeft === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:border-[#25D366]/20 hover:bg-white'}`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Section 2: Right Symbol */}
          {activeFilter === 'right' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Sword className="w-3.5 h-3.5 text-[#25D366]" /> 02. Right Symbol Injection
              </h3>
              <ScrollArea className="h-[250px] md:h-[200px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRight("")}
                    className={`h-11 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold ${selectedRight === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:bg-white'}`}
                  >
                    None
                  </Button>
                  {RIGHT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedRight(sym)}
                      className={`h-11 text-lg md:text-xl rounded-xl transition-all border ${selectedRight === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 hover:border-[#25D366]/20 hover:bg-white'}`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Section 3: Font Styles */}
          {activeFilter === 'fonts' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-[#25D366]" /> 03. Tactical Font Forge
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase px-3">{filteredStyles.length} Styles Loaded</Badge>
              </div>
              
              <ScrollArea className="h-[400px] md:h-[450px] pr-2 md:pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {filteredStyles.map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-4 md:p-5 rounded-2xl border transition-all flex flex-col gap-2 ${
                          isActive 
                            ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm' 
                            : 'border-gray-50 bg-white hover:border-[#25D366]/30 hover:shadow-md'
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
                            className="h-7 w-7 md:h-8 md:w-8 rounded-lg hover:bg-[#25D366] hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Button>
                        </div>
                        <div className="text-xs md:text-sm font-bold truncate text-gray-800">
                          {transformed}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* SEO CONTENT */}
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 border-t border-gray-50 pt-12 md:pt-16">
          <section id="how-to-use" className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">How to Forge Your <span className="text-[#25D366]">Legacy</span></h2>
              <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto">Follow these 3 simple steps to create a high-compatibility nickname for any mobile game.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                { title: "Input Basic Name", text: "Type your regular nickname into the central forge input at the top of the page.", icon: <Type className="w-5 h-5" /> },
                { title: "Customize Layout", text: "Use the filter buttons to toggle between Left Symbols, Right Symbols, and Font Styles.", icon: <Layers className="w-5 h-5" /> },
                { title: "Deploy Identity", text: "Check the Live Preview dock at the bottom and copy your finalized gaming tag.", icon: <CheckCircle2 className="w-5 h-5" /> }
              ].map((step, i) => (
                <div key={i} className="p-6 md:p-8 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 space-y-3 md:space-y-4 hover:shadow-xl hover:shadow-gray-200/40 transition-all">
                  <div className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#25D366]">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="about-us" className="bg-[#25D366]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 border border-[#25D366]/10">
            <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase">The Global Unicode Forge</h2>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Stylish Game Name is the world's most stable generator for PUBG, Free Fire, BGMI, and Roblox. Unlike other generators that use erratic math symbols, we manually audit every character map to ensure your name renders perfectly across all devices. Our mission is to provide the gaming community with professional-grade identity tools that are 100% free and easy to use.
              </p>
            </div>
          </section>

          <section id="faq" className="max-w-3xl mx-auto space-y-8 md:space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase">Tactical <span className="text-[#25D366]">Intel</span></h2>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Frequently Asked Questions</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
              <AccordionItem value="item-1" className="border border-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 bg-white">
                <AccordionTrigger className="text-xs md:text-sm font-bold hover:no-underline py-4 md:py-5 text-left">Why are there no question marks in my name?</AccordionTrigger>
                <AccordionContent className="text-[11px] md:text-xs text-gray-500 leading-relaxed pb-4 md:pb-5">
                  We use "Safe-Zone" Unicode characters. Standard fancy text generators often use characters from obscure math blocks that modern gaming engines don't support. We manually bridge these gaps using Letterlike Symbols that are natively supported by Android and iOS.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 bg-white">
                <AccordionTrigger className="text-xs md:text-sm font-bold hover:no-underline py-4 md:py-5 text-left">Does this work for BGMI and Free Fire?</AccordionTrigger>
                <AccordionContent className="text-[11px] md:text-xs text-gray-500 leading-relaxed pb-4 md:pb-5">
                  Yes! All symbols (ツ, 亗, 々) and font styles (Bold, Script, Italic) are tested specifically for compatibility with high-end mobile titles including BGMI, Free Fire MAX, COD Mobile, and Roblox.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 bg-white">
                <AccordionTrigger className="text-xs md:text-sm font-bold hover:no-underline py-4 md:py-5 text-left">Is this tool free to use?</AccordionTrigger>
                <AccordionContent className="text-[11px] md:text-xs text-gray-500 leading-relaxed pb-4 md:pb-5">
                  Stylish Game Name is 100% free for the gaming community. We do not require registration, email signups, or downloads.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      {/* COMPACT LIVE PREVIEW DOCK (Smaller, cleaner and responsive) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 md:p-4 z-50 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center gap-2 md:gap-3">
          <div className="flex-1 min-w-0">
            <div className="bg-gray-50 border border-gray-100 px-3 md:px-4 py-2 md:py-2.5 rounded-xl flex items-center justify-center min-h-[38px] md:min-h-[42px] shadow-inner overflow-hidden">
              <span className="text-xs md:text-sm font-bold text-gray-900 tracking-normal text-center break-all truncate">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-1.5 md:gap-2 shrink-0">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`h-9 w-9 md:h-11 md:w-11 rounded-xl transition-all ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40' : 'text-gray-400'}`}
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              onClick={() => handleCopy(livePreviewText)}
              className="h-9 md:h-11 px-4 md:px-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#25D366]/10 flex items-center gap-2"
            >
              <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Copy</span>
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-12 md:py-20 bg-gray-50 border-t border-gray-100 text-center space-y-3 md:space-y-4 px-4">
        <div className="flex items-center gap-2 justify-center opacity-40 grayscale">
          <Gamepad2 className="w-4 h-4" />
          <span className="text-[10px] font-black tracking-tighter uppercase">STYLISH GAME NAME</span>
        </div>
        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">&copy; {new Date().getFullYear()} MISSION CRITICAL IDENTITY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}