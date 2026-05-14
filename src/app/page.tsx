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
  ChevronRight,
  Dices,
  Sparkles,
  Download,
  Trash2,
  TrendingUp,
  Bookmark,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Share2,
  Sun,
  Moon,
  MessageCircle,
  Wand2,
  Flame,
  Info,
  Target,
  Trophy,
  Users,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  STYLE_OPTIONS, 
  StyleCategory, 
  LengthCategory,
  LEFT_SYMBOLS, 
  RIGHT_SYMBOLS
} from "@/lib/fancy-text-utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Script from "next/script";

type ActiveTab = 'left' | 'right' | 'fonts';
type SymbolPosition = 'both' | 'left' | 'right' | 'middle';

const TRENDING_NAMES = [
  { label: "Elite Ghost", text: "Ghost", left: "亗", right: "亗", styleId: "boldFraktur" },
  { label: "Toxic Ninja", text: "Toxic", left: "々", right: "々", styleId: "boldItalic" },
  { label: "Royal King", text: "King", left: "♛", right: "♛", styleId: "boldScript" },
  { label: "Shadow Killer", text: "Shadow", left: "꧁", right: "꧂", styleId: "bold" },
  { label: "Pro Sniper", text: "Sniper", left: "🎯", right: "🎯", styleId: "monospace" },
  { label: "Deadly Viper", text: "Viper", left: " Fraktur", right: " Fraktur", styleId: "fraktur" },
  { label: "Shadow Ninja", text: "Ninja", left: "🥷", right: "🥷", styleId: "italicSans" },
  { label: "Mythic Legend", text: "Legend", left: "✯", right: "✯", styleId: "double" },
  { label: "Alpha Strike", text: "Alpha", left: "Δ", right: "Δ", styleId: "boldSans" },
  { label: "Omega Void", text: "Void", left: "Ω", right: "Ω", styleId: "aesthetic" },
  { label: "Fire Dragon", text: "Dragon", left: "🐉", right: "🐉", styleId: "script" },
  { label: "Cold Killer", text: "Killer", left: "⚔️", right: "⚔️", styleId: "smallCaps" },
  { label: "Grim Reaper", text: "Reaper", left: "💀", right: "💀", styleId: "boldFraktur" },
  { label: "Sky Phoenix", text: "Phoenix", left: "🔥", right: "🔥", styleId: "italic" },
  { label: "Iron Titan", text: "Titan", left: "🛡️", right: "🛡️", styleId: "bold" },
  { label: "Dark Ace", text: "Ace", left: "♠️", right: "♠️", styleId: "monospace" },
  { label: "Wild Joker", text: "Joker", left: "🃏", right: "🃏", styleId: "script" },
  { label: "Head Hunter", text: "Hunter", left: "🏹", right: "🏹", styleId: "boldSans" },
  { label: "Night Demon", text: "Demon", left: "😈", right: "😈", styleId: "boldItalic" },
  { label: "Light Angel", text: "Angel", left: "😇", right: "😇", styleId: "boldScript" },
  { label: "Silent Rogue", text: "Rogue", left: "🎭", right: "🎭", styleId: "sans" },
  { label: "Electric Storm", text: "Storm", left: "⚡", right: "⚡", styleId: "italicSans" },
  { label: "Ice Frost", text: "Frost", left: "❄️", right: "❄️", styleId: "double" },
  { label: "Sun Blaze", text: "Blaze", left: "🔥", right: "🔥", styleId: "aesthetic" },
  { label: "Snake Venom", text: "Venom", left: "🕸️", right: "🕸️", styleId: "fraktur" },
  { label: "Dark Raven", text: "Raven", left: "🐦", right: "🐦", styleId: "boldSans" },
  { label: "Speed Nitro", text: "Nitro", left: "🚀", right: "🚀", styleId: "bold" },
  { label: "Echo Pulse", text: "Pulse", left: "📡", right: "📡", styleId: "monospace" },
  { label: "Sub Zero", text: "Zero", left: "∅", right: "∅", styleId: "smallCaps" },
  { label: "The Elite", text: "Elite", left: "💎", right: "💎", styleId: "boldScript" },
  { label: "Vortex Pro", text: "Vortex", left: "🌪️", right: "🌪️", styleId: "boldItalic" },
  { label: "Cipher X", text: "Cipher", left: "📟", right: "📟", styleId: "monospace" },
  { label: "Nova Star", text: "Nova", left: "✨", right: "✨", styleId: "boldScript" },
  { label: "Rage Mode", text: "Rage", left: "💢", right: "💢", styleId: "boldFraktur" },
];

const CATEGORY_NAMES: Record<StyleCategory, string[]> = {
  all: ["Elite", "ProGamer", "Ghost", "Nitro", "Bane", "Viper", "Omega", "Raven", "Zod", "Pulse", "Shadow", "Neon", "Void"],
  pubg: ["Sniper", "Eagle", "Squad", "Victor", "Chicken", "Winner", "Alpha", "Delta", "Echo"],
  freefire: ["Toxic", "Ninja", "King", "Legend", "Fire", "Vortex", "Cobra", "Venom", "Wraith"],
  cod: ["Captain", "Bravo", "Alpha", "Major", "Soldier", "Price", "Ghost", "Soap", "Ravage"],
  roblox: ["Blox", "Build", "Adopt", "Pet", "Noob", "Tycoon", "Craft", "Pixel", "Brick"],
  minecraft: ["Steve", "Creeper", "Block", "Mine", "Craft", "Enderman", "Wither", "Nether", "Diamond"],
};

const SMART_LINK = "https://archaicmsflip.com/gvgrre55?key=8acd26bbd2508317c2c6bd0d3ddb001c";

export default function Home() {
  const [inputText, setInputText] = useState("ProGamer");
  const [selectedLeft, setSelectedLeft] = useState("");
  const [selectedRight, setSelectedRight] = useState("");
  const [selectedStyleId, setSelectedStyleId] = useState("none");
  const [styleCategory, setStyleCategory] = useState<StyleCategory>("all");
  const [lengthFilter, setLengthFilter] = useState<LengthCategory>("all");
  const [symbolPosition, setSymbolPosition] = useState<SymbolPosition>("both");
  const [activeFilter, setActiveFilter] = useState<ActiveTab>('fonts');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavs = localStorage.getItem("stylish-glyph-favorites");
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const dailyTrendingNames = useMemo(() => {
    const seed = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const shuffled = [...TRENDING_NAMES];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.abs((hash + i) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  };

  const currentStyle = useMemo(() => 
    STYLE_OPTIONS.find(s => s.id === selectedStyleId) || STYLE_OPTIONS[0]
  , [selectedStyleId]);

  const livePreviewText = useMemo(() => {
    const transformed = currentStyle.transform(inputText || "Name");
    
    if (symbolPosition === 'middle') {
      const sep = selectedLeft || "·";
      const middled = Array.from(transformed).join(sep);
      return middled;
    }

    const left = (symbolPosition === 'both' || symbolPosition === 'left') ? selectedLeft : "";
    const right = (symbolPosition === 'both' || symbolPosition === 'right') ? selectedRight : "";
    
    return `${left} ${transformed} ${right}`.trim();
  }, [inputText, selectedLeft, selectedRight, currentStyle, symbolPosition]);

  const filteredStyles = useMemo(() => {
    return STYLE_OPTIONS.filter(style => {
      const catMatch = styleCategory === 'all' || style.category.includes(styleCategory);
      const lenMatch = lengthFilter === 'all' || style.lengthCategory === lengthFilter;
      return catMatch && lenMatch;
    });
  }, [styleCategory, lengthFilter]);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: `"${text}" is ready for deployment.`
    });
  };

  const handleCopyAll = () => {
    const allNames = filteredStyles.map(s => {
      const transformed = s.transform(inputText || "Name");
      if (symbolPosition === 'middle') return Array.from(transformed).join(selectedLeft || "·");
      const left = (symbolPosition === 'both' || symbolPosition === 'left') ? selectedLeft : "";
      const right = (symbolPosition === 'both' || symbolPosition === 'right') ? selectedRight : "";
      return `${left} ${transformed} ${right}`.trim();
    }).join('\n');

    navigator.clipboard.writeText(allNames);
    toast({
      title: "Batch Copy Success",
      description: `Copied ${filteredStyles.length} styles to clipboard.`
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
        title: "Added to Collection",
        description: "Your custom identity has been saved."
      });
    }
  };

  const removeFavorite = (text: string) => {
    const newFavs = favorites.filter(f => f !== text);
    setFavorites(newFavs);
    localStorage.setItem("stylish-glyph-favorites", JSON.stringify(newFavs));
    toast({
      title: "Removed",
      description: "Identity removed from tactical collection."
    });
  };

  const applyTrending = (trending: typeof TRENDING_NAMES[0]) => {
    setInputText(trending.text);
    setSelectedLeft(trending.left);
    setSelectedRight(trending.right);
    setSelectedStyleId(trending.styleId);
    setSymbolPosition('both');
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`Check out my cool new gaming name generated on StylishGameName.site: ${livePreviewText}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const downloadAsImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630);
    if (isDarkMode) {
      bgGradient.addColorStop(0, '#0a0d14');
      bgGradient.addColorStop(1, '#1e293b');
    } else {
      bgGradient.addColorStop(0, '#25D366');
      bgGradient.addColorStop(1, '#128C7E');
    }
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1200, 630);

    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 2;
    for(let i=0; i<10; i++) {
      ctx.beginPath();
      ctx.arc(Math.random()*1200, Math.random()*630, Math.random()*200, 0, Math.PI*2);
      ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "bold 90px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillText(livePreviewText, 600, 315);

    ctx.font = "bold 20px 'Inter', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText("STYLISHGAMENAME.SITE", 600, 580);

    const link = document.createElement('a');
    link.download = `gaming-name-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    toast({
      title: "Image Generated",
      description: "Your stylish identity card has been downloaded."
    });
  };

  const generateRandomText = () => {
    const words = CATEGORY_NAMES.all;
    const word = words[Math.floor(Math.random() * words.length)];
    const num = Math.floor(Math.random() * 99);
    setInputText(`${word}${num}`);
  };

  const generateRandomFromCategory = (cat: StyleCategory) => {
    const names = CATEGORY_NAMES[cat] || CATEGORY_NAMES.all;
    const randomName = names[Math.floor(Math.random() * names.length)];
    setInputText(randomName);
    setStyleCategory(cat);
  };

  const autoForgeIdentity = () => {
    const randomLeft = LEFT_SYMBOLS[Math.floor(Math.random() * LEFT_SYMBOLS.length)];
    const randomRight = RIGHT_SYMBOLS[Math.floor(Math.random() * RIGHT_SYMBOLS.length)];
    const validStyles = STYLE_OPTIONS.filter(s => s.id !== 'none');
    const randomStyle = validStyles[Math.floor(Math.random() * validStyles.length)];
    const pos: SymbolPosition[] = ['both', 'left', 'right', 'middle'];
    
    setSelectedLeft(randomLeft);
    setSelectedRight(randomRight);
    setSelectedStyleId(randomStyle.id);
    setSymbolPosition(pos[Math.floor(Math.random() * pos.length)]);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {[
        { label: "Home", href: "#" },
        { label: "Trending", href: "#trending" },
        { label: "Collection", href: "#my-collection" },
        { label: "About", href: "#about" },
        { label: "FAQ", href: "#faq" }
      ].map((link) => (
        <a 
          key={link.label}
          href={link.href}
          onClick={() => mobile && setIsSheetOpen(false)}
          className={
            mobile 
              ? "flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#25D366] hover:text-white text-[11px] font-bold uppercase tracking-widest text-muted-foreground transition-all"
              : "text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-[#25D366] transition-colors"
          }
        >
          {link.label}
          {mobile && <ChevronRight className="w-3.5 h-3.5" />}
        </a>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-background pb-40 md:pb-48 transition-colors duration-300">
      <nav className="sticky top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-lg border-b border-border h-16 px-4 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-[#25D366] p-1.5 rounded-lg shrink-0 shadow-md">
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm md:text-base font-black tracking-tight text-foreground uppercase truncate">
            STYLISH <span className="text-[#25D366]">GAME NAME</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => window.open(SMART_LINK, '_blank')}
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-[#25D366] hover:text-white transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Premium Loot
          </Button>
          <Button 
            onClick={toggleTheme} 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl text-muted-foreground hover:text-primary transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-muted-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background border-l border-border p-0">
                <SheetHeader className="p-6 border-b border-border bg-muted/30">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="bg-[#25D366] p-1.5 rounded-lg">
                      <Gamepad2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-black text-foreground uppercase">STYLISH MENU</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-4">
                  <NavLinks mobile />
                  <a 
                    href={SMART_LINK}
                    target="_blank"
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] text-[11px] font-black uppercase tracking-widest mt-4"
                  >
                    Premium Loot <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <header className="pt-12 pb-6 px-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-[10px] font-black uppercase tracking-widest mb-1 shadow-sm border border-[#25D366]/20">
          <Zap className="w-3 h-3 fill-current" /> Ultimate Name Maker
        </div>
        <h1 className="text-2xl md:text-5xl font-black text-foreground tracking-tighter leading-none uppercase">
          Ultimate <span className="text-[#25D366]">Stylish Game Name</span> Generator
        </h1>
        <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto font-medium">
          Create premium identity loadouts for Free Fire, PUBG, BGMI, and more. 100% stable Unicode symbols for competitive gaming domination.
        </p>
        
        <div className="relative max-w-lg mx-auto mt-6 md:mt-10 group px-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative flex gap-2 p-2 bg-card rounded-2xl shadow-2xl border border-border">
            <Input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your handle here..."
              className="h-12 md:h-14 text-base md:text-lg border-none focus-visible:ring-0 px-4 md:px-6 font-bold text-foreground bg-transparent"
            />
            <Button onClick={generateRandomText} variant="outline" size="icon" className="h-12 w-12 md:h-14 md:w-14 rounded-xl border-border text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-transparent shrink-0 transition-all active:scale-95">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <section id="trending" className="mt-12 pt-4 overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-8 px-4">
            <Flame className="w-5 h-5 text-[#25D366] fill-[#25D366]/20" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Hot Trending Loadouts</h2>
          </div>
          
          <Carousel opts={{ align: "start", loop: true }} className="w-full relative group">
            <CarouselContent className="-ml-2 md:-ml-4">
              {dailyTrendingNames.map((item, idx) => (
                <CarouselItem key={idx} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <button
                    onClick={() => applyTrending(item)}
                    className="flex flex-col items-center justify-center w-full gap-2 p-5 bg-card border border-border rounded-2xl hover:border-[#25D366] hover:shadow-xl hover:shadow-[#25D366]/10 transition-all group/item shrink-0 h-28 active:scale-95"
                  >
                    <span className="text-[9px] font-black uppercase text-muted-foreground group-hover/item:text-[#25D366] transition-colors line-clamp-1">{item.label}</span>
                    <span className="text-xs md:text-sm font-black text-foreground line-clamp-1 tracking-tight">
                      {item.left}{STYLE_OPTIONS.find(s => s.id === item.styleId)?.transform(item.text)}{item.right}
                    </span>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden group-hover:flex">
              <CarouselPrevious className="absolute -left-4 bg-background/80 border-border shadow-md" />
              <CarouselNext className="absolute -right-4 bg-background/80 border-border shadow-md" />
            </div>
          </Carousel>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-12 pb-2 max-w-2xl mx-auto px-4">
          <Button
            onClick={() => setActiveFilter('left')}
            variant={activeFilter === 'left' ? "default" : "outline"}
            className={`h-12 px-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all w-full hover:scale-[1.02] ${
              activeFilter === 'left' 
                ? 'bg-[#25D366] border-none text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#25D366]/90' 
                : 'bg-card border-border text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 mr-2" /> Left Prefixes
          </Button>
          <Button
            onClick={() => setActiveFilter('right')}
            variant={activeFilter === 'right' ? "default" : "outline"}
            className={`h-12 px-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all w-full hover:scale-[1.02] ${
              activeFilter === 'right' 
                ? 'bg-[#25D366] border-none text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#25D366]/90' 
                : 'bg-card border-border text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Sword className="w-4 h-4 mr-2" /> Right Suffixes
          </Button>
          <Button
            onClick={() => setActiveFilter('fonts')}
            variant={activeFilter === 'fonts' ? "default" : "outline"}
            className={`h-12 px-6 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all w-full hover:scale-[1.02] ${
              activeFilter === 'fonts' 
                ? 'bg-[#25D366] border-none text-white shadow-xl shadow-[#25D366]/30 hover:bg-[#25D366]/90' 
                : 'bg-card border-border text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-transparent'
            }`}
          >
            <Type className="w-4 h-4 mr-2" /> Tactical Fonts
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center py-4 px-4 space-y-8">
          <Button
            onClick={autoForgeIdentity}
            className="h-12 md:h-14 px-8 md:px-12 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#25D366]/90 hover:to-[#128C7E]/90 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-[1.05] active:scale-[0.98] flex items-center gap-2 md:gap-4 group border-none"
          >
            <Dices className="w-5 h-5 transition-transform group-hover:rotate-45" />
            🎲 Auto Forge Identity
            <Sparkles className="w-4 h-4 text-white/70 animate-pulse hidden sm:inline" />
          </Button>

          <div className="flex flex-col items-center gap-4 w-full">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Strategic Positioning</span>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                { id: 'both', label: 'Dual Sided', icon: <Layers className="w-4 h-4" /> },
                { id: 'left', label: 'Prefix Only', icon: <AlignLeft className="w-4 h-4" /> },
                { id: 'right', label: 'Suffix Only', icon: <AlignRight className="w-4 h-4" /> },
                { id: 'middle', label: 'Spacing (Elite)', icon: <AlignCenter className="w-4 h-4" /> }
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setSymbolPosition(pos.id as SymbolPosition)}
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] ${
                    symbolPosition === pos.id 
                      ? 'bg-foreground border-foreground text-background shadow-lg' 
                      : 'bg-card border-border text-muted-foreground hover:border-[#25D366] hover:text-[#25D366]'
                  }`}
                >
                  {pos.icon} {pos.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <div className="space-y-10">
          
          {activeFilter === 'left' && (
            <div className="bg-card border border-border p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#25D366]" /> Tactical Prefixes
                </h3>
              </div>
              <ScrollArea className="h-[400px] md:h-[550px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3 pr-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLeft("")}
                    className={`h-12 md:h-14 rounded-2xl border text-[10px] uppercase font-black transition-all ${
                      selectedLeft === "" 
                        ? 'bg-[#25D366] border-none text-white shadow-lg' 
                        : 'border-border bg-muted/20 text-muted-foreground hover:bg-[#25D366] hover:text-white hover:scale-105'
                    }`}
                  >
                    None
                  </Button>
                  {LEFT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedLeft(sym)}
                      className={`h-12 md:h-14 text-lg md:text-2xl rounded-2xl transition-all border hover:scale-110 ${
                        selectedLeft === sym 
                          ? 'bg-[#25D366] border-none text-white shadow-lg' 
                          : 'border-border bg-muted/20 text-foreground hover:bg-[#25D366] hover:text-white'
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
            <div className="bg-card border border-border p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                  <Sword className="w-5 h-5 text-[#25D366]" /> Tactical Suffixes
                </h3>
              </div>
              <ScrollArea className="h-[400px] md:h-[550px]">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3 pr-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedRight("")}
                    className={`h-12 md:h-14 rounded-2xl border text-[10px] uppercase font-black transition-all ${
                      selectedRight === "" 
                        ? 'bg-[#25D366] border-none text-white shadow-lg' 
                        : 'border-border bg-muted/20 text-muted-foreground hover:bg-[#25D366] hover:text-white hover:scale-105'
                    }`}
                  >
                    None
                  </Button>
                  {RIGHT_SYMBOLS.map((sym, i) => (
                    <Button 
                      key={i} 
                      variant="ghost" 
                      onClick={() => setSelectedRight(sym)}
                      className={`h-12 md:h-14 text-lg md:text-2xl rounded-2xl transition-all border hover:scale-110 ${
                        selectedRight === sym 
                          ? 'bg-[#25D366] border-none text-white shadow-lg' 
                          : 'border-border bg-muted/20 text-foreground hover:bg-[#25D366] hover:text-white'
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
            <div className="bg-card border border-border p-4 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 border-b border-border pb-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-3">
                    <Type className="w-5 h-5 text-[#25D366]" /> Tactical Font Forge
                  </h3>
                  <div className="flex gap-2 w-full md:w-auto justify-center">
                    <Button
                      onClick={handleCopyAll}
                      variant="outline"
                      className="h-8 px-4 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full border-border hover:bg-foreground hover:text-background transition-all flex items-center gap-2 flex-1 md:flex-none"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy All
                    </Button>
                    <Button
                      onClick={() => generateRandomFromCategory(styleCategory)}
                      variant="outline"
                      className="h-8 px-4 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center gap-2 flex-1 md:flex-none"
                    >
                      <Wand2 className="w-3.5 h-3.5" /> Surprise Me
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {/* Length Filters - Scrollable on mobile */}
                  <div className="flex items-center overflow-x-auto pb-1 no-scrollbar md:pb-0">
                    <div className="flex items-center bg-muted/30 rounded-full p-1 border border-border shrink-0 min-w-full md:min-w-0">
                      {(['all', 'short', 'medium', 'long'] as LengthCategory[]).map((len) => (
                        <button
                          key={len}
                          onClick={() => setLengthFilter(len)}
                          className={`h-7 px-4 text-[8px] font-black uppercase tracking-widest rounded-full transition-all flex-1 whitespace-nowrap ${
                            lengthFilter === len 
                              ? 'bg-foreground text-background shadow-md' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {len}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Category Filters - Scrollable on mobile */}
                  <div className="flex items-center overflow-x-auto pb-1 no-scrollbar md:pb-0">
                    <div className="flex items-center bg-muted/30 rounded-full p-1 border border-border shrink-0 min-w-full md:min-w-0">
                      {(['all', 'pubg', 'freefire', 'cod', 'roblox', 'minecraft'] as StyleCategory[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setStyleCategory(cat)}
                          className={`h-7 px-4 text-[8px] font-black uppercase tracking-widest rounded-full transition-all flex-1 whitespace-nowrap ${
                            styleCategory === cat 
                              ? 'bg-[#25D366] text-white shadow-md shadow-[#25D366]/20' 
                              : 'text-muted-foreground hover:text-[#25D366]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="h-[400px] md:h-[600px] pr-2 md:pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                  <div 
                    onClick={() => setSelectedStyleId("none")}
                    className={`group cursor-pointer p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all flex flex-col gap-2 md:gap-3 hover:scale-[1.02] ${
                      selectedStyleId === "none" 
                        ? 'bg-[#25D366] border-transparent text-white shadow-2xl shadow-[#25D366]/30' 
                        : 'border-border bg-card hover:border-[#25D366] hover:bg-[#25D366] hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-colors ${selectedStyleId === "none" ? 'text-white/70' : 'text-muted-foreground group-hover:text-white/70'}`}>Raw Nickname</span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(inputText || "Name");
                          }}
                          className={`h-7 w-7 md:h-8 md:w-8 rounded-xl transition-all ${selectedStyleId === "none" ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className={`text-sm md:text-base font-black truncate transition-colors tracking-tight ${selectedStyleId === "none" ? 'text-white' : 'group-hover:text-white'}`}>
                      {inputText || "Name"}
                    </div>
                  </div>

                  {filteredStyles.filter(s => s.id !== 'none').map((style) => {
                    const transformed = style.transform(inputText || "Name");
                    const isActive = selectedStyleId === style.id;
                    
                    let fullStyledName = "";
                    if (symbolPosition === 'middle') {
                      fullStyledName = Array.from(transformed).join(selectedLeft || "·");
                    } else {
                      const left = (symbolPosition === 'both' || symbolPosition === 'left') ? selectedLeft : "";
                      const right = (symbolPosition === 'both' || symbolPosition === 'right') ? selectedRight : "";
                      fullStyledName = `${left} ${transformed} ${right}`.trim();
                    }
                    
                    return (
                      <div 
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`group cursor-pointer p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all flex flex-col gap-2 md:gap-3 hover:scale-[1.02] ${
                          isActive 
                            ? 'bg-[#25D366] border-transparent text-white shadow-2xl shadow-[#25D366]/30' 
                            : 'border-border bg-card hover:border-[#25D366] hover:bg-[#25D366] hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white/70' : 'text-muted-foreground group-hover:text-white/70'}`}>{style.name}</span>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(fullStyledName);
                              }}
                              className={`h-7 w-7 md:h-8 md:w-8 rounded-xl transition-all ${isActive ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                            >
                              <Heart className={`w-4 h-4 ${favorites.includes(fullStyledName) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(fullStyledName);
                              }}
                              className={`h-7 w-7 md:h-8 md:w-8 rounded-xl transition-all ${isActive ? 'bg-white/20 text-white' : 'hover:bg-white hover:text-[#25D366]'}`}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className={`text-sm md:text-base font-black truncate transition-colors tracking-tight ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                          {transformed}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Adsterra Native Banner Container */}
          <div className="flex justify-center py-8">
            <div id="container-351fb15fdfc3f6ded0d59260b84edef1"></div>
            <Script 
              async 
              src="https://archaicmsflip.com/351fb15fdfc3f6ded0d59260b84edef1/invoke.js" 
              strategy="afterInteractive"
            />
          </div>

          <section id="my-collection" className="mt-16 md:mt-32 space-y-8">
            <div className="flex items-center gap-4 px-2">
              <div className="bg-[#25D366] p-2.5 rounded-2xl shadow-lg">
                <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">Tactical Collection</h2>
                <p className="text-[9px] md:text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">Saved Identity Loadouts</p>
              </div>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-muted/10 border-4 border-dashed border-border rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center space-y-4 md:space-y-6 mx-2">
                <div className="h-12 w-12 md:h-16 md:w-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-muted/30" />
                </div>
                <p className="text-muted-foreground text-[10px] md:text-sm font-bold uppercase tracking-widest px-4">No Identities Stored. Forge and save names to build your loadout.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 px-2">
                {favorites.map((fav, idx) => (
                  <div key={idx} className="bg-card border-2 border-border p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm flex flex-col gap-3 md:gap-4 group hover:border-[#25D366] hover:shadow-xl transition-all">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-[#25D366]/10 text-[#25D366] text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-[#25D366]/20">SAVED LOADOUT</Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleCopy(fav)}
                          className="h-9 w-9 md:h-10 md:w-10 rounded-xl text-muted-foreground hover:text-[#25D366] hover:bg-[#25D366]/10"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFavorite(fav)}
                          className="h-9 w-9 md:h-10 md:w-10 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <span className="text-base md:text-lg font-black text-foreground break-all tracking-tight">{fav}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="about" className="mt-20 md:mt-40 space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center px-2">
              <div className="space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4" /> About the Forge
                  </span>
                </div>
                <h2 className="text-2xl md:text-5xl font-black text-foreground leading-tight uppercase tracking-tighter">
                  Crafting <span className="text-[#25D366]">Elite Digital Identities</span> for Global Gamers
                </h2>
                <p className="text-muted-foreground text-xs md:text-base leading-relaxed font-medium">
                  In the competitive landscape, your username isn't just a label—it's your brand. <span className="font-bold text-foreground">Stylish Game Name</span> is the world's most stable utility for generating high-performance fancy text and symbols specifically optimized for PUBG, Free Fire, BGMI, and CODM.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-black text-foreground uppercase tracking-widest text-[10px] md:text-[11px]">
                      <Target className="w-4 h-4 text-[#25D366]" /> 100% Stability
                    </div>
                    <p className="text-[11px] md:text-xs text-muted-foreground">Manual character mapping ensures zero question marks on modern mobile OS versions.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-black text-foreground uppercase tracking-widest text-[10px] md:text-[11px]">
                      <Trophy className="w-4 h-4 text-[#25D366]" /> Pro Optimized
                    </div>
                    <p className="text-[11px] md:text-xs text-muted-foreground">Symbols tested against global battle royale filter systems for maximum visibility.</p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 border border-border shadow-inner space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shrink-0">
                    <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black text-foreground uppercase tracking-tight">Clan Support</h3>
                    <p className="text-[9px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">Forging Teams Together</p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
                  "The only generator we trust for our pro squad. The spacing (middle) mode is a game changer for clan tag visibility."
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white text-black font-black uppercase tracking-widest border border-border text-[8px] md:text-[10px]">BGMI Ready</Badge>
                  <Badge className="bg-white text-black font-black uppercase tracking-widest border border-border text-[8px] md:text-[10px]">FF MAX Ready</Badge>
                </div>
                <Button 
                  onClick={() => window.open(SMART_LINK, '_blank')}
                  className="w-full h-12 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg border-none hover:scale-[1.02] transition-all"
                >
                  Access Premium Vault
                </Button>
              </div>
            </div>
          </section>

          <section id="faq" className="mt-20 md:mt-40 max-w-4xl mx-auto space-y-10 md:space-y-20 px-2">
            <div className="text-center space-y-3">
              <h2 className="text-xl md:text-4xl font-black text-foreground uppercase tracking-tighter">Gamer <span className="text-[#25D366]">Intel</span> Arsenal (FAQ)</h2>
              <p className="text-[9px] md:text-xs font-black text-muted-foreground uppercase tracking-[0.4em]">Mastering the BGMI and Free Fire Name Maker</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4 md:space-y-6">
              {[
                { q: "How do I use the Free Fire Name Maker?", a: "To use the Free Fire Name Maker, simply type your name at the top, select your symbols (like wings or crowns), and copy the generated stylish text. All symbols are updated for the latest character filters." },
                { q: "Does this PUBG Name Maker work for BGMI?", a: "Yes, our PUBG Name Maker is fully optimized for BGMI. All symbols (ツ, 亗, 々) are manually mapped to ensure they appear correctly on all mobile devices without question marks." },
                { q: "What is the 'Spacing (Elite)' position?", a: "Middle position injects your selected symbol between every letter of your name, creating a premium 'spaced' effect popular in high-tier esports and competitive gaming clans." },
                { q: "Can I download my stylish name as an image for social media?", a: "Yes, use the 'Download PNG' button in the live preview dock to save a high-quality 1200x630 tactical card of your gaming handle, ready for Instagram or WhatsApp status." },
                { q: "How to fix question marks in Free Fire names?", a: "Most question marks occur due to unsupported Unicode gaps. Our generator uses an 'Elite Safe' mapping system that automatically bridges these gaps so your name always renders correctly." },
                { q: "Is registration required?", a: "No, this is a 100% free utility for the global gaming community. No registration or tactical data login is required." },
                { q: "Which symbols are best for BGMI names?", a: "Popular symbols include the 'V' badge (亗), Japanese Katakana (々), and Tactical Wings (꧁꧂). Use our 'Hot Trending' section to see what pro players are currently using." },
                { q: "How do I share my identity on WhatsApp groups?", a: "Simply click the WhatsApp icon in the Live Preview dock at the bottom of the screen to share your name and link directly with your squad." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-2 border-border rounded-[1.5rem] md:rounded-[2rem] px-5 md:px-10 bg-card shadow-sm hover:border-[#25D366]/30 transition-all group overflow-hidden">
                  <AccordionTrigger className="text-[11px] md:text-base font-black hover:no-underline py-5 md:py-6 text-left text-foreground uppercase tracking-tight group-data-[state=open]:text-[#25D366] transition-colors">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[11px] md:text-sm text-muted-foreground leading-relaxed pb-6 md:pb-8 font-medium">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-border px-3 py-3 md:p-6 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-4">
          <div className="w-full flex-1 min-w-0">
            <div className="bg-muted/40 border-2 border-border px-3 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center min-h-[48px] md:min-h-[56px] shadow-inner overflow-hidden group">
              <span className="text-xs md:text-lg font-black text-foreground tracking-tight text-center break-all transition-transform group-hover:scale-105">
                {livePreviewText}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto justify-center flex-wrap">
            <Button 
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(livePreviewText)}
              className={`h-10 w-10 md:h-12 md:w-12 rounded-xl transition-all hover:scale-110 active:scale-90 ${favorites.includes(livePreviewText) ? 'text-[#25D366] fill-[#25D366]/10 border-[#25D366]/40 shadow-lg shadow-[#25D366]/10' : 'text-muted-foreground hover:bg-[#25D366] hover:text-white hover:border-transparent'}`}
            >
              <Heart className={`w-5 h-5 ${favorites.includes(livePreviewText) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={shareToWhatsApp}
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl text-muted-foreground hover:bg-[#25D366] hover:text-white border-border hover:border-transparent transition-all hover:scale-110 active:scale-90"
              title="Share to WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={downloadAsImage}
              className="h-10 w-10 md:h-12 md:w-12 rounded-xl text-muted-foreground hover:bg-[#25D366] hover:text-white border-border hover:border-transparent transition-all hover:scale-110 active:scale-90"
              title="Download PNG"
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button 
              onClick={() => handleCopy(livePreviewText)}
              className="h-10 md:h-12 px-4 md:px-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-black text-[9px] md:text-[11px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] border-none hover:scale-[1.05] flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> <span>COPY</span>
            </Button>
          </div>
        </div>
      </div>

      <footer className="py-16 md:py-32 bg-muted/20 border-t border-border text-center space-y-6 px-4">
        <div className="flex items-center gap-2 justify-center opacity-50 grayscale hover:grayscale-0 transition-all mb-4">
          <Gamepad2 className="w-5 h-5" />
          <span className="text-sm font-black tracking-tighter uppercase text-foreground">STYLISH GAME NAME</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8">
          <a href="#" className="hover:text-[#25D366] transition-colors">Privacy Protocol</a>
          <a href="#" className="hover:text-[#25D366] transition-colors">Service Terms</a>
          <a href="#about" className="hover:text-[#25D366] transition-colors">Tactical Intel</a>
          <a href={SMART_LINK} target="_blank" className="text-[#25D366] hover:underline font-black">Elite Vault</a>
        </div>
        <p className="text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] opacity-60">
          &copy; MISSION CRITICAL IDENTITY FORGE. GLOBAL GAMING COMPLIANT.
        </p>
      </footer>
    </div>
  );
}
