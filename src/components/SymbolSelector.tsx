"use client";

import { POPULAR_SYMBOLS } from "@/lib/fancy-text-utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

interface SymbolSelectorProps {
  onSelect: (symbol: string) => void;
}

export function SymbolSelector({ onSelect }: SymbolSelectorProps) {
  return (
    <Card className="bg-white border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden transition-all">
      <CardHeader className="bg-primary/5 border-b border-gray-50 py-5">
        <CardTitle className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Symbol Injector
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[250px] pr-4">
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {POPULAR_SYMBOLS.map((symbol, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => onSelect(symbol)}
                className="h-10 text-xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-all p-0 rounded-xl"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <p className="text-[10px] text-gray-400 mt-6 text-center font-bold uppercase tracking-wider opacity-60">
          Tap to add to your current name
        </p>
      </CardContent>
    </Card>
  );
}
