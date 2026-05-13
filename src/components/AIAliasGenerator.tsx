"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { generateGamingAlias } from "@/ai/flows/generate-gaming-alias";
import { useToast } from "@/hooks/use-toast";

export function AIAliasGenerator() {
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!interests.trim()) {
      toast({
        variant: "destructive",
        title: "Tactical Error",
        description: "Input required for AI target acquisition."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateGamingAlias({
        interests: interests,
        personalityTraits: "pro, aggressive, tactical, lethal"
      });
      setAliases(result.aliases);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uplink Failed",
        description: "AI Neural Link interrupted. Check your signal."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="glass-morphism border-primary/20 neon-border-primary overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 font-headline font-black text-primary neon-glow-primary uppercase tracking-widest text-lg">
          <Sparkles className="w-5 h-5" />
          Neural Identity Forge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3" /> Specify Core Traits
            </label>
            <div className="flex gap-3">
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="SNIPER, SHADOW, LETHAL..."
                className="bg-background/40 border-primary/20 focus:border-primary transition-colors h-14 font-black uppercase tracking-widest text-sm"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-primary hover:bg-primary/80 text-white font-black px-8 h-14 neon-border-primary group"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    IGNITE <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 animate-in fade-in zoom-in-95 duration-500">
            {aliases.map((alias, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-background/40 border border-primary/10 hover:border-primary/40 transition-all group"
              >
                <span className="font-headline text-xl font-black text-white/90 uppercase tracking-tight">{alias}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(alias, idx)}
                  className="h-10 w-10 hover:bg-primary hover:text-white rounded-lg transition-all"
                >
                  {copiedIndex === idx ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}