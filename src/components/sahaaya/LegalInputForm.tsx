
"use client";

import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Send, Loader2, Mic, MicOff, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { provideRelevantLegalGuidance, type ProvideRelevantLegalGuidanceOutput } from '@/ai/flows/provide-relevant-legal-guidance';
import { LegalGuidanceDisplay } from './LegalGuidanceDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function LegalInputForm() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [legalOutput, setLegalOutput] = useState<ProvideRelevantLegalGuidanceOutput | null>(null);

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
            placeholder={isListening ? "Listening..." : "Explain the situation you need legal information about... or use the microphone icon."}
            rows={8}
            className="shadow-sm focus:ring-primary focus:border-primary text-base"
            aria-label="Describe your legal situation"
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
                Get Legal Guidance <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
           {recognitionRef.current && (
              <Button
                type="button"
                variant="outline"
                onClick={handleToggleListening}
                disabled={isLoading}
                title={isListening ? "Stop voice input" : "Start voice input"}
                className="p-3 rounded-lg shadow-md"
              >
                {isListening ? <MicOff className="h-5 w-5 text-destructive" /> : <Mic className="h-5 w-5 text-primary" />}
              </Button>
            )}
        </div>
      </form>

      <LegalGuidanceDisplay
        legalOutput={legalOutput}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
