"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
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
        title: "Input Required",
        description: "Please enter some interests or keywords to help the AI."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateGamingAlias({
        interests: interests,
        personalityTraits: "pro, aggressive, tactical"
      });
      setAliases(result.aliases);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not reach the AI. Please try again later."
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
    <Card className="glass-morphism border-primary/20 neon-border-cyan overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 font-headline text-accent neon-glow">
          <Sparkles className="w-5 h-5" />
          AI Gamer Identity Forge
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Describe your gaming style (e.g., "sniper, fire, dark, stealthy")
          </label>
          <div className="flex gap-2">
            <Input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="fantasy, cyber, tactical..."
              className="bg-background/50 border-primary/20 focus:border-accent transition-colors"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="bg-accent hover:bg-accent/80 text-secondary-foreground font-bold px-6"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "GENERATE"}
            </Button>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
            {aliases.map((alias, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-md bg-background/40 border border-primary/10 hover:border-accent/30 transition-all group"
              >
                <span className="font-mono text-lg font-bold">{alias}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(alias, idx)}
                  className="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
                >
                  {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
