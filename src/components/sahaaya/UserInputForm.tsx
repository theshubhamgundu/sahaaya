"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { detectEmotionalDistress, type DetectEmotionalDistressOutput } from '@/ai/flows/detect-emotional-distress';
import { generatePersonalizedSupport, type GeneratePersonalizedSupportOutput } from '@/ai/flows/generate-personalized-support';
import { AIResponseDisplay } from './AIResponseDisplay';

export function UserInputForm() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distressOutput, setDistressOutput] = useState<DetectEmotionalDistressOutput | null>(null);
  const [supportOutput, setSupportOutput] = useState<GeneratePersonalizedSupportOutput | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userInput.trim()) {
      toast({
        title: "Input required",
        description: "Please share your story before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setDistressOutput(null);
    setSupportOutput(null);
    setInitialMessage(null);

    try {
      const distressData = await detectEmotionalDistress({ userInput });
      setDistressOutput(distressData);

      if (distressData.emotionalDistressDetected) {
        if (distressData.legalInformationNeeded) {
           // Show initial comfort while fetching more detailed support
           if (distressData.affirmation || distressData.calmingResponse) {
             setInitialMessage(`We've identified that you might be feeling ${distressData.distressType || 'distressed'}. Here's a quick thought: ${distressData.affirmation || distressData.calmingResponse} We are now generating more specific guidance including legal information.`);
           } else {
             setInitialMessage(`We've identified that you might be feeling ${distressData.distressType || 'distressed'}. We are now generating more specific guidance including legal information.`);
           }

          const supportData = await generatePersonalizedSupport({
            situation: userInput,
            emotionalState: distressData.distressType || 'distress',
            legalInformationNeeded: true,
          });
          setSupportOutput(supportData);
          setInitialMessage(null); // Clear initial message once full support is loaded
        } else {
           // Distress detected, but no legal info needed based on AI.
           // The AIResponseDisplay will use distressData.affirmation and distressData.calmingResponse.
           setInitialMessage(null); // ensure no conflicting message
        }
      } else {
        // No emotional distress detected by the first AI
        setInitialMessage(null); // ensure no conflicting message
      }
    } catch (err) {
      console.error("AI processing error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to get support: ${errorMessage}`,
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
          <Label htmlFor="userStory" className="block text-lg font-medium text-foreground mb-2">
            Share your experience. We are here to listen.
          </Label>
          <Textarea
            id="userStory"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell us what happened... Your privacy is protected."
            rows={8}
            className="shadow-sm focus:ring-primary focus:border-primary text-base"
            aria-label="Share your story"
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
              Get Support <Send className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <AIResponseDisplay
        distressOutput={distressOutput}
        supportOutput={supportOutput}
        isLoading={isLoading && !initialMessage} // Only show main loader if no initial message
        error={error}
        initialMessage={initialMessage}
      />
    </div>
  );
}
