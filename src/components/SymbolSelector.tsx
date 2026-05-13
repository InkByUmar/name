"use client";

import { POPULAR_SYMBOLS } from "@/lib/fancy-text-utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash, Sparkles } from "lucide-react";

interface SymbolSelectorProps {
  onSelect: (symbol: string) => void;
}

export function SymbolSelector({ onSelect }: SymbolSelectorProps) {
  return (
    <Card className="glass-morphism border-primary/20 shadow-2xl overflow-hidden rounded-3xl transition-all hover:shadow-primary/10">
      <CardHeader className="bg-primary/10 border-b border-primary/10 py-5">
        <CardTitle className="flex items-center gap-3 text-xs font-black text-primary neon-glow-primary uppercase tracking-[0.3em]">
          <Sparkles className="w-5 h-5" /> Symbol Injector
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[250px] pr-4">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
            {POPULAR_SYMBOLS.map((symbol, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => onSelect(symbol)}
                className="h-12 text-2xl bg-white/5 border-white/5 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all p-0 rounded-xl shadow-inner"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <p className="text-[9px] text-muted-foreground mt-6 text-center font-black uppercase tracking-[0.2em] opacity-50">
          SELECT GLYPH TO AUTO-INJECT
        </p>
      </CardContent>
    </Card>
  );
}
