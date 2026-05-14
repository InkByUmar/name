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
  CheckCircle2,
  Layers,
  Search,
  ChevronRight,
  Target,
  Trophy,
  Users,
  Dices,
  Sparkles
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ActiveTab = 'left' | 'right' | 'fonts';

export default function Home() {
  const [inputText, setInputText] = useState("ProGamer");
  const [selectedLeft, setSelectedLeft] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState("none");
  const [styleCategory, setStyleCategory] = useState<StyleCategory>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveTab>('fonts');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

  const generateRandomText = () => {
    const randomWords = ["Titan", "Ghost", "Nitro", "Bane", "Viper", "Omega", "Raven", "Zod", "Pulse", "Shadow", "Neon", "Void"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomNum = Math.floor(Math.random() * 99);
    setInputText(`${randomWord}${randomNum}`);
  };

  const autoForgeIdentity = () => {
    const randomLeft = LEFT_SYMBOLS[Math.floor(Math.random() * LEFT_SYMBOLS.length)];
    const randomRight = RIGHT_SYMBOLS[Math.floor(Math.random() * RIGHT_SYMBOLS.length)];
    const randomStyle = STYLE_OPTIONS[Math.floor(Math.random() * STYLE_OPTIONS.length)];

    setSelectedLeft(randomLeft);
    setSelectedRight(randomRight);
    setSelectedStyleId(randomStyle.id);
    
    // Toast notification removed for a cleaner, silent experience
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {[
        { label: "Home", href: "#" },
        { label: "How to Use", href: "#how-to-use" },
        { label: "About Us", href: "#about-us" },
        { label: "FAQ", href: "#faq" },
        { label: "SEO Info", href: "#seo-info" }
      ].map((link) => (
        <a 
          key={link.label}
          href={link.href}
          onClick={() => mobile && setIsSheetOpen(false)}
          className={
            mobile 
              ? "flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#25D366] hover:text-white text-[11px] font-bold uppercase tracking-widest text-gray-500 transition-all"
              : "text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#25D366] transition-colors"
          }
        >
          {link.label}
          {mobile && <ChevronRight className="w-3.5 h-3.5" />}
        </a>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-40">
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
          <NavLinks />
        </div>
        
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-white border-l border-gray-100 p-0">
              <SheetHeader className="p-6 border-b border-gray-50 bg-gray-50/50">
                <SheetTitle className="flex items-center gap-2">
                  <div className="bg-[#25D366] p-1.5 rounded-lg">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-black text-gray-900 uppercase">STYLISH MENU</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                <NavLinks mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-8 pb-4 px-4 text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-widest mb-1">
          <Zap className="w-3 h-3" /> Professional Free Fire Name Maker
        </div>
        <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight uppercase">
          Ultimate <span className="text-[#25D366]">Stylish Game Name</span> Generator
        </h1>
        <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto font-medium">
          The most advanced PUBG Name Maker and BGMI Name Generator. Create a unique identity with 100% stable Fancy Gaming Names that render perfectly on all mobile devices.
        </p>
        
        <div className="relative max-w-md mx-auto mt-4 md:mt-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your nickname here..."
              className="h-10 md:h-12 text-sm md:text-base border-none focus-visible:ring-0 px-3 md:px-4 font-bold text-gray-800"
            />
            <Button onClick={generateRandomText} variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl border-gray-100 text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/30 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
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
                      : 'bg-white border-gray-100 text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-transparent'
                  }`}
                >
                  {cat === 'all' ? 'All Games' : cat.toUpperCase()}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Visibility Filter Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-6 pb-2 max-w-2xl mx-auto">
          <Button
            onClick={() => setActiveFilter('left')}
            variant={activeFilter === 'left' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'left' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent font-bold'
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
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent font-bold'
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
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent font-bold'
            }`}
          >
            <Type className="w-4 h-4 mr-2" /> Font Styles
          </Button>
        </div>

        {/* PROMINENT AUTO GENERATOR BUTTON */}
        <div className="flex flex-col items-center justify-center pt-2 pb-6 px-4">
          <Button
            onClick={autoForgeIdentity}
            className="h-12 md:h-14 px-8 md:px-12 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4 group"
          >
            <Dices className="w-5 h-5 transition-transform group-hover:rotate-12" />
            Auto Forge Identity
            <Sparkles className="w-4 h-4 text-white/60" />
          </Button>
          <div className="mt-3 text-[9px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">
            Surprise Me with Elite Combo
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="space-y-6">
          
          {/* Section 1: Left Symbol */}
          {activeFilter === 'left' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Prefixes
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase">Symbol Forge</Badge>
              </div>
              <ScrollArea className="h-[400px] md:h-[500px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLeft("")}
                    className={`h-12 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold transition-all ${selectedLeft === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-transparent'}`}
                  >
                    None
                  </Button>
                  {LEFT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedLeft(sym)}
                      className={`h-12 text-lg md:text-xl rounded-xl transition-all border ${selectedLeft === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 text-gray-600 hover:bg-[#25D366] hover:text-white hover:border-transparent'}`}
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
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Sword className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Suffixes
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase">Identity Arsenal</Badge>
              </div>
              <ScrollArea className="h-[400px] md:h-[500px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRight("")}
                    className={`h-12 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold transition-all ${selectedRight === "" ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-transparent'}`}
                  >
                    None
                  </Button>
                  {RIGHT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedRight(sym)}
                      className={`h-12 text-lg md:text-xl rounded-xl transition-all border ${selectedRight === sym ? 'border-[#25D366] bg-[#25D366]/5 text-[#25D366]' : 'border-gray-50 bg-gray-50 text-gray-600 hover:bg-[#25D366] hover:text-white hover:border-transparent'}`}
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
                  <Type className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Font Forge
                </h3>
                <Badge variant="secondary" className="bg-[#25D366]/10 text-[#25D366] font-bold text-[9px] uppercase px-3">Fancy Font Engine</Badge>
              </div>
              
              <ScrollArea className="h-[400px] md:h-[500px] pr-2 md:pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <div 
                    onClick={() => setSelectedStyleId("none")}
                    className={`group cursor-pointer p-4 md:p-5 rounded-2xl border transition-all flex flex-col gap-2 ${
                      selectedStyleId === "none" 
                        ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm' 
                        : 'border-gray-50 bg-white hover:border-[#25D366] hover:text-white hover:bg-[#25D366] hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider group-hover:text-white transition-colors">Normal Text</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(inputText || "Name");
                        }}
                        className="h-7 w-7 md:h-8 md:w-8 rounded-lg group-hover:bg-white/20 group-hover:text-white"
                      >
                        <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </Button>
                    </div>
                    <div className="text-xs md:text-sm font-bold truncate group-hover:text-white">
                      {inputText || "Name"}
                    </div>
                  </div>

                  {filteredStyles.filter(s => s.id !== 'none').map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-4 md:p-5 rounded-2xl border transition-all flex flex-col gap-2 ${
                          isActive 
                            ? 'border-[#25D366] bg-[#25D366]/5 shadow-sm' 
                            : 'border-gray-50 bg-white hover:border-[#25D366] hover:text-white hover:bg-[#25D366] hover:shadow-md'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider group-hover:text-white transition-colors">{style.name}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(transformed);
                            }}
                            className="h-7 w-7 md:h-8 md:w-8 rounded-lg group-hover:bg-white/20 group-hover:text-white"
                          >
                            <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Button>
                        </div>
                        <div className="text-xs md:text-sm font-bold truncate group-hover:text-white">
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

        {/* SEO CONTENT SECTION */}
        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24 border-t border-gray-50 pt-12 md:pt-16">
          
          {/* How to Use Section */}
          <section id="how-to-use" className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">How to Forge Your <span className="text-[#25D366]">Stylish Game Name</span></h2>
              <p className="text-gray-500 text-xs md:text-sm max-w-xl mx-auto">Master our Free Fire Name Maker and PUBG Name Maker in three tactical steps.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {[
                { title: "Input Nickname", text: "Start by typing your standard gamer handle into the central input field. Our Gaming Name Generator supports characters from all languages.", icon: <Type className="w-5 h-5" /> },
                { title: "Surgical Customization", text: "Use the filter buttons to inject Left Symbols (prefixes) and Right Symbols (suffixes). These are tested for BGMI Name Generator compatibility.", icon: <Layers className="w-5 h-5" /> },
                { title: "Deploy & Dominate", text: "Review your final Cool Gaming Name in the compact preview card. Copy and paste it directly into Free Fire, PUBG, or COD Mobile.", icon: <CheckCircle2 className="w-5 h-5" /> }
              ].map((step, i) => (
                <div key={i} className="p-6 md:p-8 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 space-y-3 md:space-y-4 hover:shadow-xl hover:shadow-gray-200/40 transition-all">
                  <div className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#25D366]">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About Us Section */}
          <section id="about-us" className="bg-[#25D366]/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-[#25D366]/10">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 md:space-y-6 text-left">
                <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase">The World's Leading <span className="text-[#25D366]">Fancy Gaming Name</span> Forge</h2>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Stylish Game Name was founded by a team of professional gamers who were tired of "question mark" names in competitive lobbies. Our mission is to provide the most reliable **Stylish Name for Free Fire** and **PUBG Stylish Name** generator on the internet.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[10px] font-bold text-gray-700">1M+ Monthly Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#25D366]" />
                    <span className="text-[10px] font-bold text-gray-700">Top Rated Forge</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video bg-white rounded-3xl shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden">
                  <div className="p-8 text-center space-y-4">
                    <Badge className="bg-[#25D366] text-white">Verified Compatible</Badge>
                    <p className="text-lg md:text-xl font-black text-gray-400 italic">꧁ 亗 PRO PLAYER 亗 ꧂</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-3xl mx-auto space-y-8 md:space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">Gamer <span className="text-[#25D366]">Intel</span> (FAQ)</h2>
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Mastering the BGMI and Free Fire Name Maker</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
              {[
                { q: "How do I use the Free Fire Name Maker?", a: "To use the Free Fire Name Maker, simply type your name at the top, select your symbols (like wings or crowns), and copy the generated stylish text. It works for both Free Fire and Free Fire MAX." },
                { q: "Does this PUBG Name Maker work for BGMI?", a: "Yes, our PUBG Name Maker is fully optimized for Battlegrounds Mobile India (BGMI). All symbols (ツ, 亗, 々) are tested for the Indian version of the game." },
                { q: "Why are my symbols not showing up in the game?", a: "If symbols don't show, it might be due to game-specific character limits. However, our generator only uses 'Safe-Zone' Unicode, ensuring 99% compatibility across all modern gaming engines." },
                { q: "Can I generate a Stylish Name for Free Fire on iOS?", a: "Absolutely. Our Fancy Gaming Name engine is compatible with all mobile browsers on both Android and iOS devices." },
                { q: "How many Cool Gaming Names can I generate?", a: "You can generate an unlimited number of nicknames for Free Fire, PUBG, BGMI, and Roblox for free." },
                { q: "Is registration required to use the BGMI Name Generator?", a: "No registration, login, or email is required. We are a 100% free tool for the gaming community." },
                { q: "What are the best symbols for a PUBG Stylish Name?", a: "Popular choices include the Japanese smiley (ツ), the crown (亗), and tactical wings (༺ ༻). These are all available in our symbol forge." },
                { q: "Does the Stylish Game Name generator affect game performance?", a: "No, these are standard Unicode characters. They are as lightweight as regular text and have zero impact on game FPS or performance." },
                { q: "Can I use these names for YouTube and Twitch?", a: "Yes, our stylish names are perfect for building your gaming brand across YouTube, Twitch, and Discord." },
                { q: "Are these fancy gaming names legal in tournaments?", a: "In most cases, yes. However, we recommend checking specific tournament rules as some pro leagues require readable English characters for casting purposes." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 rounded-xl md:rounded-2xl px-4 md:px-6 bg-white shadow-sm hover:border-[#25D366]/30 transition-all">
                  <AccordionTrigger className="text-xs md:text-sm font-bold hover:no-underline py-4 md:py-5 text-left text-gray-800">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[11px] md:text-xs text-gray-500 leading-relaxed pb-4 md:pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* SEO Detailed Section */}
          <section id="seo-info" className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <div className="p-8 md:p-12 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 text-[#25D366]">
                <Search className="w-6 h-6" />
                <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase">Search Engine <span className="text-[#25D366]">Visibility Guide</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">Digital Accessibility</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">
                    Our platform utilizes semantic HTML5 structures, allowing search engines to index our "Fancy Text" styles effectively. By focusing on "Safe-Zone" Unicode rather than images, we ensure your gamer identity is readable by search algorithms and screen readers.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">Brand Consistency</h4>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">
                    A stable **Stylish Game Name** ensures your personal brand remains consistent across all platforms. Whether you're appearing on a kill feed in PUBG or a leaderboard in Free Fire, our generator ensures you look like a pro.
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest text-gray-400">Free Fire Name Maker</Badge>
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest text-gray-400">PUBG Name Maker</Badge>
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest text-gray-400">BGMI Name Generator</Badge>
                  <Badge variant="outline" className="text-[8px] uppercase tracking-widest text-gray-400">Fancy Gaming Name</Badge>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* COMPACT LIVE PREVIEW DOCK */}
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
              className={`h-9 w-9 md:h-11 md:w-11 rounded-xl transition-all ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40' : 'text-gray-400 hover:bg-[#25D366]/10 hover:text-[#25D366]'}`}
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              onClick={() => handleCopy(livePreviewText)}
              className="h-9 md:h-11 px-4 md:px-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#25D366]/10 flex items-center gap-2"
            >
              <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Copy Result</span>
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-12 md:py-20 bg-gray-50 border-t border-gray-100 text-center space-y-4 px-4">
        <div className="flex items-center gap-2 justify-center opacity-40 grayscale mb-4">
          <Gamepad2 className="w-4 h-4" />
          <span className="text-[10px] font-black tracking-tighter uppercase">STYLISH GAME NAME</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
           <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-[#25D366] uppercase">Privacy Policy</a>
           <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-[#25D366] uppercase">Terms of Service</a>
           <a href="#about-us" className="text-[10px] font-bold text-gray-400 hover:text-[#25D366] uppercase">Contact Us</a>
        </div>
        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">&copy; {new Date().getFullYear()} MISSION CRITICAL IDENTITY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
