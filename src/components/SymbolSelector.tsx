"use client";

import { POPULAR_SYMBOLS } from "@/lib/fancy-text-utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hash } from "lucide-react";

interface SymbolSelectorProps {
  onSelect: (symbol: string) => void;
}

export function SymbolSelector({ onSelect }: SymbolSelectorProps) {
  return (
    <Card className="glass-morphism border-primary/20 neon-border-primary overflow-hidden">
      <CardHeader className="bg-primary/10 border-b border-primary/10 py-3">
        <CardTitle className="flex items-center gap-2 text-sm font-headline font-bold text-primary neon-glow-primary uppercase tracking-widest">
          <Hash className="w-4 h-4" /> Custom Symbol Injector
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[200px]">
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
            {POPULAR_SYMBOLS.map((symbol, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => onSelect(symbol)}
                className="h-10 text-xl bg-background/30 border-white/5 hover:border-accent hover:text-accent transition-all p-0"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <p className="text-[10px] text-muted-foreground mt-4 text-center font-bold uppercase tracking-tighter">
          Click any symbol to add it to your name
        </p>
      </CardContent>
    </Card>
  );
}