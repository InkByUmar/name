"use client";

import { APPROVED_SYMBOLS } from "@/lib/fancy-text-utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

interface SymbolSelectorProps {
  onSelect: (symbol: string) => void;
}

export function SymbolSelector({ onSelect }: SymbolSelectorProps) {
  return (
    <Card className="bg-white border-gray-100 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="bg-[#25D366]/5 border-b border-gray-50 py-4">
        <CardTitle className="flex items-center gap-3 text-[10px] font-black text-[#25D366] uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Glyph Arsenal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <ScrollArea className="h-[200px] pr-3">
          <div className="grid grid-cols-5 gap-2">
            {APPROVED_SYMBOLS.map((symbol, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => onSelect(symbol)}
                className="h-10 text-xl bg-gray-50 hover:bg-[#25D366]/5 hover:text-[#25D366] transition-all p-0 rounded-xl font-medium"
              >
                {symbol}
              </Button>
            ))}
          </div>
        </ScrollArea>
        <p className="text-[8px] text-gray-300 mt-4 text-center font-black uppercase tracking-widest opacity-60">
          Neural-Safe Unicode Verified
        </p>
      </CardContent>
    </Card>
  );
}
