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
        title: "Input Required",
        description: "Please specify your persona traits."
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateGamingAlias({
        interests: interests,
        personalityTraits: "pro, tactical, elite"
      });
      setAliases(result.aliases);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not connect to AI engine. Try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({ title: "Copied to Clipboard" });
  };

  return (
    <Card className="bg-white border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-gray-50 p-8">
        <CardTitle className="flex items-center gap-3 font-extrabold text-primary uppercase tracking-widest text-base">
          <Zap className="w-5 h-5" />
          AI Name Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Define Your Persona
            </label>
            <div className="flex gap-3">
              <Input
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. SNIPER, SHADOW..."
                className="bg-gray-50 border-gray-100 focus:border-primary/50 h-12 font-semibold px-6 rounded-xl"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 shadow-lg shadow-primary/20 rounded-xl"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <span className="flex items-center gap-2 text-xs">
                    FORGE
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {aliases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-5 duration-500">
            {aliases.map((alias, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-primary/20 transition-all"
              >
                <span className="text-base font-bold text-gray-700">{alias}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => copyToClipboard(alias, idx)}
                  className="h-10 w-10 hover:bg-primary hover:text-white rounded-lg"
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
