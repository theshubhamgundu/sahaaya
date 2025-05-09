"use client";

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { provideRelevantLegalGuidance, type ProvideRelevantLegalGuidanceOutput } from '@/ai/flows/provide-relevant-legal-guidance';
import { LegalGuidanceDisplay } from './LegalGuidanceDisplay';

export function LegalInputForm() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [legalOutput, setLegalOutput] = useState<ProvideRelevantLegalGuidanceOutput | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!userInput.trim()) {
      toast({
        title: "Input required",
        description: "Please describe your situation before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setLegalOutput(null);

    try {
      const guidanceData = await provideRelevantLegalGuidance({ situationDescription: userInput });
      setLegalOutput(guidanceData);
    } catch (err) {
      console.error("AI processing error (Legal):", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to get legal guidance: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="userSituation" className="block text-lg font-medium text-foreground mb-2">
            Describe your legal concern or situation.
          </Label>
          <Textarea
            id="userSituation"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
            placeholder="Explain the situation you need legal information about... Your privacy is protected."
            rows={8}
            className="shadow-sm focus:ring-primary focus:border-primary text-base"
            aria-label="Describe your legal situation"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
          disabled={isLoading}
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get Legal Guidance <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <LegalGuidanceDisplay
        legalOutput={legalOutput}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
