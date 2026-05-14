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
import { IdentityStorage } from "@/components/IdentityStorage";
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
    
    const history = JSON.parse(localStorage.getItem("stylish-glyph-history") || "[]");
    const newHistory = [text, ...history.filter((h: string) => h !== text)].slice(0, 50);
    localStorage.setItem("stylish-glyph-history", JSON.stringify(newHistory));
    
    window.dispatchEvent(new Event("storage-update"));

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
    window.dispatchEvent(new Event("storage-update"));
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
          <span className="text-base font-black tracking-tight text-gray-900">
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
      <header className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-widest mb-2">
          <Zap className="w-3 h-3" /> Premium Unicode Generator
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          Create Your <span className="text-[#25D366]">Unique Gaming Name</span>
        </h1>
        <p className="text-gray-500 text-sm font-medium max-w-lg mx-auto leading-relaxed">
          Generate stylish gamer tags for PUBG, Free Fire, and BGMI. 100% stable Unicode symbols with no question marks.
        </p>
        
        <div className="relative max-w-md mx-auto mt-8">
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
          
          {/* Section 1 & 2: Symbols (Top Row) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#25D366]" /> 01. Left Symbol
              </h3>
              <ScrollArea className="h-[200px]">
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

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Sword className="w-3.5 h-3.5 text-[#25D366]" /> 02. Right Symbol
              </h3>
              <ScrollArea className="h-[200px]">
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

          {/* Section 3: Font Styles (Full Width Row) */}
          <div className="lg:col-span-12 space-y-4">
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-[#25D366]" /> 03. Fancy Font Styles
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase px-3">{filteredStyles.length} Variations</Badge>
              </div>
              
              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredStyles.map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-5 rounded-2xl border transition-all flex flex-col gap-3 ${
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
        </div>

        {/* SEO CONTENT SECTIONS */}
        <div className="mt-20 space-y-24">
          
          {/* How to Use Section */}
          <section id="how-to-use" className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">How to Generate <span className="text-[#25D366]">Stylish Names</span></h2>
              <p className="text-gray-500 text-sm">Follow these simple steps to forge your professional gaming identity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100 relative overflow-hidden group">
                <div className="text-4xl font-black text-[#25D366]/20 absolute -top-2 -right-2">01</div>
                <div className="bg-white p-3 w-fit rounded-xl shadow-sm text-[#25D366]"><Type className="w-5 h-5" /></div>
                <h4 className="font-bold text-gray-900">Enter Name</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Type your nickname in the input box at the top of the page. Use letters or numbers.</p>
              </div>
              
              <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100 relative overflow-hidden group">
                <div className="text-4xl font-black text-[#25D366]/20 absolute -top-2 -right-2">02</div>
                <div className="bg-white p-3 w-fit rounded-xl shadow-sm text-[#25D366]"><Sparkles className="w-5 h-5" /></div>
                <h4 className="font-bold text-gray-900">Customize</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Select a prefix symbol, choose a unique font style, and add a suffix symbol for the perfect look.</p>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl space-y-4 border border-gray-100 relative overflow-hidden group">
                <div className="text-4xl font-black text-[#25D366]/20 absolute -top-2 -right-2">03</div>
                <div className="bg-white p-3 w-fit rounded-xl shadow-sm text-[#25D366]"><Copy className="w-5 h-5" /></div>
                <h4 className="font-bold text-gray-900">Copy & Paste</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Once satisfied with the live preview, click the copy button and paste it into your favorite game.</p>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section id="about-us" className="bg-[#25D366]/5 rounded-[3rem] p-12 md:p-20">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <Badge className="bg-[#25D366] text-white border-none px-4 py-1">Mission Control</Badge>
              <h2 className="text-3xl font-black text-gray-900">The #1 Unicode Forge for Gamers</h2>
              <p className="text-gray-600 leading-relaxed">
                Stylish Game Name was founded to solve a simple problem: gamers wanted cool, symbolic names but often faced "question mark" boxes on mobile devices. Our engine is built on **Stable Unicode Mappings**, ensuring every font and symbol you choose will render perfectly across **PUBG, Free Fire, BGMI, COD Mobile, and Roblox**.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500"><CheckCircle2 className="w-4 h-4 text-[#25D366]" /> 100% Mobile Stable</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500"><CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Unicode 15.0 Ready</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500"><CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Zero Question Marks</div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Frequently Asked <span className="text-[#25D366]">Questions</span></h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-gray-100">
                <AccordionTrigger className="text-sm font-bold text-gray-700 hover:text-[#25D366] hover:no-underline">Why do some symbols show as boxes?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                  Most generators use unstable Unicode math ranges. Our generator uses "Safe-Zone" symbols that are battle-tested for mobile gaming compatibility. If you see a box, ensure your device is running the latest OS update.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-gray-100">
                <AccordionTrigger className="text-sm font-bold text-gray-700 hover:text-[#25D366] hover:no-underline">Is this generator free to use?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                  Yes! Stylish Game Name is 100% free and requires no registration. You can generate unlimited names and copy them instantly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-100">
                <AccordionTrigger className="text-sm font-bold text-gray-700 hover:text-[#25D366] hover:no-underline">Which games support these symbols?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                  Our symbols and fonts are optimized for PUBG Mobile, BGMI, Free Fire (FF), Call of Duty Mobile (CODM), Roblox, Minecraft, and Fortnite.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-100">
                <AccordionTrigger className="text-sm font-bold text-gray-700 hover:text-[#25D366] hover:no-underline">Can I add my own symbols?</AccordionTrigger>
                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                  Currently, we provide a curated list of the best-performing symbols. We update our "Arsenal" frequently to include trending symbols from the gaming community.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      {/* FIXED LIVE PREVIEW DOCK */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6 md:p-8 z-50 shadow-[0_-15px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full text-center md:text-left">
            <div className="text-[9px] font-black text-[#25D366] uppercase tracking-[0.25em] mb-3 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Identity Preview
            </div>
            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex items-center justify-center min-h-[70px] shadow-inner overflow-hidden">
              <span className="text-lg md:text-xl font-bold text-gray-900 tracking-normal text-center break-all">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`flex-1 md:flex-none h-14 w-14 rounded-2xl border-gray-200 transition-all active:scale-90 ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40' : 'text-gray-400 hover:text-[#25D366]'}`}
            >
              <Heart className={`w-6 h-6 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              size="lg"
              onClick={() => handleCopy(livePreviewText)}
              className="flex-1 md:w-56 h-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              <Copy className="w-5 h-5" /> Copy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="bg-[#25D366] p-1 rounded-lg">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-black tracking-tight text-gray-900">
                STYLISH <span className="text-[#25D366]">GAME NAME</span>
              </span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider font-bold">The world's most stable gaming name forge. Trusted by millions of players.</p>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Navigation</h5>
            <ul className="text-[11px] font-bold space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Generator</a></li>
              <li><a href="#how-to-use" className="text-gray-600 hover:text-[#25D366]">Usage Guide</a></li>
              <li><a href="#about-us" className="text-gray-600 hover:text-[#25D366]">About Forge</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Legal</h5>
            <ul className="text-[11px] font-bold space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Disclaimer</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</h5>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-gray-200 text-gray-400 hover:text-[#25D366]"><MessageSquare className="w-4 h-4" /></Button>
              <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-gray-200 text-gray-400 hover:text-[#25D366]"><ExternalLink className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 mt-20 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 opacity-40">
             <Star className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
             <Star className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
             <Star className="w-3 h-3 text-[#25D366] fill-[#25D366]" />
          </div>
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
            &copy; {new Date().getFullYear()} STYLISH GAME NAME. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
