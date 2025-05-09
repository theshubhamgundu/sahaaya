
"use client";

import * as React from 'react'; // Added import
import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send, Loader2, Mic, MicOff, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { detectEmotionalDistress, type DetectEmotionalDistressOutput } from '@/ai/flows/detect-emotional-distress';
import { generatePersonalizedSupport, type GeneratePersonalizedSupportOutput } from '@/ai/flows/generate-personalized-support';
import { AIResponseDisplay } from './AIResponseDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function UserInputForm() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distressOutput, setDistressOutput] = useState<DetectEmotionalDistressOutput | null>(null);
  const [supportOutput, setSupportOutput] = useState<GeneratePersonalizedSupportOutput | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const { toast } = useToast();

  // Speech Recognition state and ref
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        const instance = new SpeechRecognitionAPI();
        instance.continuous = false; // Stop after first recognized utterance
        instance.interimResults = true;

        instance.onresult = (event: SpeechRecognitionEvent) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript;
            }
          }
          if (transcript) {
            setUserInput(prev => (prev ? prev + ' ' : '') + transcript.trim());
          }
        };

        instance.onerror = (event: SpeechRecognitionErrorEvent) => {
          let message = 'An unknown error occurred with speech recognition.';
          if (event.error === 'no-speech') {
            message = 'No speech was detected. Please try speaking louder or clearer.';
          } else if (event.error === 'audio-capture') {
            message = 'Audio capture failed. Is your microphone connected and enabled?';
          } else if (event.error === 'not-allowed') {
            message = 'Microphone access denied. Please enable microphone permissions in your browser settings.';
          } else if (event.error === 'network') {
            message = 'A network error occurred during speech recognition. Please check your connection.';
          }
          setSpeechError(message);
          setIsListening(false);
          toast({ title: "Speech Recognition Error", description: message, variant: "destructive" });
        };

        instance.onend = () => {
          setIsListening(false);
        };
        recognitionRef.current = instance;
      } else {
        setSpeechError("Speech recognition API is not available in your browser.");
      }
    } else {
      setSpeechError("Speech recognition is not supported by your browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  const handleToggleListening = () => {
    if (!recognitionRef.current) {
      toast({ title: "Feature Unavailable", description: speechError || "Speech recognition could not be initialized.", variant: "destructive" });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setSpeechError(null); // Clear previous errors
        setUserInput(''); // Clear text area when starting new recording
        recognitionRef.current.start();
        setIsListening(true);
        toast({ title: "Listening...", description: "Speak into your microphone. Speech will be transcribed into the text area." });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Could not start listening. Check microphone permissions.";
        setSpeechError(errorMessage);
        setIsListening(false);
        toast({ title: "Error Starting Speech Input", description: errorMessage, variant: "destructive" });
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop(); // Stop listening if active before submitting
        setIsListening(false);
    }
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
          setInitialMessage(null); 
        } else {
           // If no legal info needed, but distress detected, supportOutput will remain null.
           // The AIResponseDisplay will show affirmation/calmingResponse from distressOutput.
           setInitialMessage(null); 
        }
      } else {
        // No distress detected, distressOutput will reflect this.
        setInitialMessage(null);
      }
    } catch (err) {
      console.error("AI processing error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      setInitialMessage(null);
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
    <div className="w-full"> {/* Changed max-w-2xl mx-auto to w-full */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="userStory" className="block text-lg font-medium text-foreground mb-2">
            Share your experience. We are here to listen.
          </Label>
          <Textarea
            id="userStory"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Tell us what happened... or use the microphone icon."}
            rows={8}
            className="shadow-sm focus:ring-primary focus:border-primary text-base"
            aria-label="Share your story"
            disabled={isLoading}
          />
          {speechError && !isListening && (
            <Alert variant="destructive" className="mt-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Voice Input Error</AlertTitle>
              <AlertDescription>{speechError}</AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            type="submit" 
            className="flex-grow bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            disabled={isLoading || isListening}
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
          {recognitionRef.current && (
              <Button
                type="button"
                variant="outline"
                onClick={handleToggleListening}
                disabled={isLoading} // Matches submit button's disabled state logic
                title={isListening ? "Stop voice input" : "Start voice input"}
                className="p-3 rounded-lg shadow-md" // Custom padding to match submit button height
              >
                {isListening ? <MicOff className="h-5 w-5 text-destructive" /> : <Mic className="h-5 w-5 text-primary" />}
              </Button>
            )}
        </div>
      </form>

      <AIResponseDisplay
        distressOutput={distressOutput}
        supportOutput={supportOutput}
        isLoading={isLoading && !initialMessage} // Show loading skeleton only if not showing initial message
        error={error}
        initialMessage={initialMessage}
      />
    </div>
  );
}

