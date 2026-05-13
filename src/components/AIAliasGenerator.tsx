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
        description: "Core traits required for neural link."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateGamingAlias({
        interests: interests,
        personalityTraits: "pro, aggressive, tactical, elite"
      });
      setAliases(result.aliases);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uplink Failed",
        description: "Neural core timeout. Retry deployment."
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
    <Card className="glass-morphism border-primary/30 shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden relative rounded-[2.5rem]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <CardHeader className="bg-primary/10 border-b border-primary/10 p-10">
        <CardTitle className="flex items-center gap-3 font-black text-primary neon-glow-primary uppercase tracking-[0.4em] text-xl">
          <Zap className="w-6 h-6 animate-pulse" />
          Neural Forge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-10 space-y-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3">
              <Sparkles className="w-4 h-4" /> Specify Core Persona
            </label>
            <div className="flex gap-4">
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="SNIPER, SHADOW, ELITE..."
                className="bg-background/60 border-white/5 focus:border-primary/50 transition-all h-16 font-black uppercase tracking-[0.2em] text-sm px-8 rounded-2xl"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-primary hover:bg-primary/80 text-white font-black px-12 h-16 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95 group rounded-2xl"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <span className="flex items-center gap-3 tracking-[0.2em] text-[12px]">
                    FORGE <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 animate-in slide-in-from-bottom-10 duration-700">
            {aliases.map((alias, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-primary/10 hover:border-primary/40 transition-all group shadow-inner"
              >
                <span className="text-2xl font-black text-white/90 uppercase tracking-tight">{alias}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(alias, idx)}
                  className="h-12 w-12 hover:bg-primary hover:text-white rounded-xl transition-all"
                >
                  {copiedIndex === idx ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
