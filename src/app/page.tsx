
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
  Sparkles,
  Download,
  Trash2,
  TrendingUp,
  Bookmark
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

const TRENDING_NAMES = [
  { label: "Elite Ghost", text: "Ghost", left: "亗", right: "亗", styleId: "boldFraktur" },
  { label: "Toxic Ninja", text: "Toxic", left: "々", right: "々", styleId: "boldItalic" },
  { label: "Royal King", text: "King", left: "♛", right: "♛", styleId: "boldScript" },
  { label: "Shadow Killer", text: "Shadow", left: "꧁", right: "꧂", styleId: "bold" },
  { label: "Pro Sniper", text: "Sniper", left: "🎯", right: "🎯", styleId: "monospace" },
  { label: "Deadly Viper", text: "Viper", left: "🐍", right: "🐍", styleId: "fraktur" },
];

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
    
    if (!favorites.includes(text)) {
      toast({
        title: "Added to Favorites",
        description: "Your name is saved in the collection."
      });
    }
  };

  const removeFavorite = (text: string) => {
    const newFavs = favorites.filter(f => f !== text);
    setFavorites(newFavs);
    localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
    toast({
      title: "Removed",
      description: "Name removed from collection."
    });
  };

  const applyTrending = (trending: typeof TRENDING_NAMES[0]) => {
    setInputText(trending.text);
    setSelectedLeft(trending.left);
    setSelectedRight(trending.right);
    setSelectedStyleId(trending.styleId);
    toast({
      title: "Trending Loadout Applied",
      description: `Loaded "${trending.label}" configuration.`
    });
  };

  const downloadAsImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Premium Background Gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#25D366');
    gradient.addColorStop(1, '#128C7E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle texture/design
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    for(let i=0; i<10; i++) {
      ctx.beginPath();
      ctx.arc(Math.random()*1200, Math.random()*630, Math.random()*200, 0, Math.PI*2);
      ctx.stroke();
    }

    // Text Rendering
    ctx.fillStyle = "white";
    ctx.font = "bold 90px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillText(livePreviewText, 600, 315);

    // Branding
    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("STYLISHGAMENAME.COM", 600, 580);

    const link = document.createElement('a');
    link.download = `gaming-name-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    toast({
      title: "Image Generated",
      description: "Your stylish name card has been downloaded."
    });
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
    const validStyles = STYLE_OPTIONS.filter(s => s.id !== 'none');
    const randomStyle = validStyles[Math.floor(Math.random() * validStyles.length)];

    setSelectedLeft(randomLeft);
    setSelectedRight(randomRight);
    setSelectedStyleId(randomStyle.id);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {[
        { label: "Home", href: "#" },
        { label: "Trending", href: "#trending" },
        { label: "Collection", href: "#my-collection" },
        { label: "FAQ", href: "#faq" }
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
        
        <div className="relative max-w-md mx-auto mt-4 md:mt-6">
          <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your nickname here..."
              className="h-10 md:h-12 text-sm md:text-base border-none focus-visible:ring-0 px-3 md:px-4 font-bold text-gray-800"
            />
            <Button onClick={generateRandomText} variant="outline" size="icon" className="h-10 w-10 md:h-12 md:w-12 rounded-xl border-gray-100 text-gray-400 hover:bg-[#25D366] hover:text-white hover:border-transparent shrink-0 transition-all">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Trending Section */}
        <section id="trending" className="mt-8 pt-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[#25D366]" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Elite Trending Loadouts</h3>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-3 px-4">
              {TRENDING_NAMES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => applyTrending(item)}
                  className="flex flex-col items-center gap-1 p-3 bg-gray-50 border border-gray-100 rounded-2xl hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all group shrink-0"
                >
                  <span className="text-[9px] font-bold uppercase text-gray-400 group-hover:text-[#25D366]">{item.label}</span>
                  <span className="text-xs font-black text-gray-800">
                    {item.left} {STYLE_OPTIONS.find(s => s.id === item.styleId)?.transform(item.text)} {item.right}
                  </span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Main Filters UI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-8 pb-2 max-w-2xl mx-auto">
          <Button
            onClick={() => setActiveFilter('left')}
            variant={activeFilter === 'left' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'left' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20 hover:bg-[#25D366]/90' 
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" /> Left Symbol
          </Button>
          <Button
            onClick={() => setActiveFilter('right')}
            variant={activeFilter === 'right' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'right' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20 hover:bg-[#25D366]/90' 
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Sword className="w-4 h-4 mr-2" /> Right Symbol
          </Button>
          <Button
            onClick={() => setActiveFilter('fonts')}
            variant={activeFilter === 'fonts' ? "default" : "outline"}
            className={`h-11 px-4 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all w-full ${
              activeFilter === 'fonts' 
                ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20 hover:bg-[#25D366]/90' 
                : 'bg-white border-gray-100 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Type className="w-4 h-4 mr-2" /> Font Styles
          </Button>
        </div>

        {/* AUTO FORGE IDENTITY BUTTON */}
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <Button
            onClick={autoForgeIdentity}
            className="h-12 md:h-14 px-10 md:px-14 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-4 group"
          >
            <Dices className="w-5 h-5 transition-transform group-hover:rotate-12" />
            Auto Forge Identity
            <Sparkles className="w-4 h-4 text-white/60" />
          </Button>
        </div>
      </header>

      {/* Main Selection Area */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="space-y-6">
          
          {activeFilter === 'left' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Prefixes
                </h3>
              </div>
              <ScrollArea className="h-[400px] md:h-[500px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLeft("")}
                    className={`h-12 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold transition-all ${
                      selectedLeft === "" 
                        ? 'bg-[#25D366] border-none text-white shadow-md' 
                        : 'border-gray-50 bg-gray-50 text-gray-400 hover:bg-[#25D366] hover:text-white'
                    }`}
                  >
                    None
                  </Button>
                  {LEFT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedLeft(sym)}
                      className={`h-12 text-lg md:text-xl rounded-xl transition-all border ${
                        selectedLeft === sym 
                          ? 'bg-[#25D366] border-none text-white shadow-md' 
                          : 'border-gray-50 bg-gray-50 text-gray-600 hover:bg-[#25D366] hover:text-white'
                      }`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {activeFilter === 'right' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Sword className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Suffixes
                </h3>
              </div>
              <ScrollArea className="h-[400px] md:h-[500px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 pr-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRight("")}
                    className={`h-12 rounded-xl border text-[9px] md:text-[10px] uppercase font-bold transition-all ${
                      selectedRight === "" 
                        ? 'bg-[#25D366] border-none text-white shadow-md' 
                        : 'border-gray-50 bg-gray-50 text-gray-400 hover:bg-[#25D366] hover:text-white'
                    }`}
                  >
                    None
                  </Button>
                  {RIGHT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedRight(sym)}
                      className={`h-12 text-lg md:text-xl rounded-xl transition-all border ${
                        selectedRight === sym 
                          ? 'bg-[#25D366] border-none text-white shadow-md' 
                          : 'border-gray-50 bg-gray-50 text-gray-600 hover:bg-[#25D366] hover:text-white'
                      }`}
                    >
                      {sym}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {activeFilter === 'fonts' && (
            <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-[#25D366]" /> Tactical Font Forge
                </h3>
                <div className="flex gap-2">
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex gap-2">
                      {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'] as StyleCategory[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setStyleCategory(cat)}
                          className={`h-7 px-3 text-[8px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                            styleCategory === cat 
                              ? 'bg-[#25D366] border-transparent text-white' 
                              : 'bg-white border-gray-100 text-gray-400 hover:bg-[#25D366] hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              <ScrollArea className="h-[400px] md:h-[500px] pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  <div 
                    onClick={() => setSelectedStyleId("none")}
                    className={`group cursor-pointer p-4 md:p-5 rounded-2xl border transition-all flex flex-col gap-2 ${
                      selectedStyleId === "none" 
                        ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                        : 'border-gray-50 bg-white hover:border-[#25D366] hover:bg-[#25D366] hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] font-black uppercase tracking-wider transition-colors ${selectedStyleId === "none" ? 'text-white/80' : 'text-gray-400 group-hover:text-white/80'}`}>Normal Text</span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(inputText || "Name");
                          }}
                          className={`h-7 w-7 rounded-lg transition-all ${selectedStyleId === "none" ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className={`text-sm font-bold truncate transition-colors ${selectedStyleId === "none" ? 'text-white' : 'group-hover:text-white'}`}>
                      {inputText || "Name"}
                    </div>
                  </div>

                  {filteredStyles.filter(s => s.id !== 'none').map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    const fullStyledName = `${selectedLeft} ${transformed} ${selectedRight}`.trim();
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-4 md:p-5 rounded-2xl border transition-all flex flex-col gap-2 ${
                          isActive 
                            ? 'bg-[#25D366] border-none text-white shadow-lg shadow-[#25D366]/20' 
                            : 'border-gray-50 bg-white hover:border-[#25D366] hover:bg-[#25D366] hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[8px] font-black uppercase tracking-wider transition-colors ${isActive ? 'text-white/80' : 'text-gray-400 group-hover:text-white/80'}`}>{style.name}</span>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(fullStyledName);
                              }}
                              className={`h-7 w-7 rounded-lg transition-all ${isActive ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${favorites.includes(fullStyledName) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(transformed);
                              }}
                              className={`h-7 w-7 rounded-lg transition-all ${isActive ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                        <div className={`text-sm font-bold truncate transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                          {transformed}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* MY COLLECTION SECTION */}
          <section id="my-collection" className="mt-16 md:mt-24 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#25D366] p-2 rounded-xl">
                <Bookmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 uppercase">My Tactical Collection</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saved Identity Loadouts</p>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2rem] p-12 text-center space-y-4">
                <Heart className="w-10 h-10 text-gray-200 mx-auto" />
                <p className="text-gray-400 text-xs font-medium">Your collection is empty. Forge and save names to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((fav, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col gap-3 group hover:border-[#25D366] transition-all">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-[#25D366]/10 text-[#25D366] text-[8px] uppercase tracking-widest">SAVED LOADOUT</Badge>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopy(fav)}
                          className="h-8 w-8 text-gray-400 hover:text-[#25D366] hover:bg-[#25D366]/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFavorite(fav)}
                          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <span className="text-sm font-black text-gray-800 break-all">{fav}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
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
                { title: "Input Nickname", text: "Start by typing your handle. Our Gaming Name Generator supports characters from all languages.", icon: <Type className="w-5 h-5" /> },
                { title: "Customization", text: "Inject Left and Right Symbols. These are tested for BGMI Name Generator compatibility.", icon: <Layers className="w-5 h-5" /> },
                { title: "Deploy & Dominate", text: "Review in the Live Preview dock. Copy and paste or download as PNG directly.", icon: <CheckCircle2 className="w-5 h-5" /> }
              ].map((step, i) => (
                <div key={i} className="p-6 md:p-8 bg-gray-50 rounded-[1.5rem] border border-gray-100 space-y-3 hover:shadow-xl hover:shadow-gray-200/40 transition-all">
                  <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#25D366]">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{step.title}</h3>
                  <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed">{step.text}</p>
                </div>
              ))}
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
                { q: "How do I use the Free Fire Name Maker?", a: "To use the Free Fire Name Maker, simply type your name at the top, select your symbols (like wings or crowns), and copy the generated stylish text." },
                { q: "Does this PUBG Name Maker work for BGMI?", a: "Yes, our PUBG Name Maker is fully optimized for Battlegrounds Mobile India (BGMI). All symbols (ツ, 亗, 々) are tested for the Indian version." },
                { q: "Can I download my stylish name as an image?", a: "Yes, use the 'Download PNG' button in the live preview dock to save a high-quality card of your gaming handle." },
                { q: "How do I save my favorite names?", a: "Click the heart icon on any font style or in the preview dock to save the loadout to your local tactical collection." },
                { q: "Is registration required?", a: "No, this is a 100% free tool for the gaming community. No registration needed." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-gray-100 rounded-xl px-4 md:px-6 bg-white shadow-sm hover:border-[#25D366]/30 transition-all">
                  <AccordionTrigger className="text-xs md:text-sm font-bold hover:no-underline py-4 text-left text-gray-800">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[11px] md:text-xs text-gray-500 leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      {/* COMPACT LIVE PREVIEW DOCK */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 md:p-4 z-50 shadow-2xl">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-3">
          <div className="w-full flex-1 min-w-0">
            <div className="bg-gray-50 border border-gray-100 px-3 py-2 md:py-2.5 rounded-xl flex items-center justify-center min-h-[42px] shadow-inner overflow-hidden">
              <span className="text-xs md:text-sm font-black text-gray-900 tracking-normal text-center break-all">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-center">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`h-10 w-10 rounded-xl transition-all ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40' : 'text-gray-400 hover:bg-[#25D366] hover:text-white'}`}
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={downloadAsImage}
              className="h-10 w-10 rounded-xl text-gray-400 hover:bg-[#25D366] hover:text-white"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button 
              onClick={() => handleCopy(livePreviewText)}
              className="h-10 px-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#25D366]/10 flex items-center gap-2 transition-all active:scale-[0.98] flex-1 md:flex-none"
            >
              <Copy className="w-3.5 h-3.5" /> <span>Copy Result</span>
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-12 md:py-20 bg-gray-50 border-t border-gray-100 text-center space-y-4 px-4">
        <div className="flex items-center gap-2 justify-center opacity-40 grayscale mb-4">
          <Gamepad2 className="w-4 h-4" />
          <span className="text-[10px] font-black tracking-tighter uppercase">STYLISH GAME NAME</span>
        </div>
        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} MISSION CRITICAL IDENTITY. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

