
"use client";

import * as React from 'react'; // Added import
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Camera, Send, MessageSquare, Hand } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { interpretHandGesture, type InterpretHandGestureOutput } from '@/ai/flows/interpret-hand-gesture';
import { generateSignLanguageResponse, type GenerateSignLanguageResponseOutput } from '@/ai/flows/generate-sign-language-response';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

export function SignLanguageInterface() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [interpretedText, setInterpretedText] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [suggestedSign, setSuggestedSign] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [conversationLog, setConversationLog] = useState<Array<{ sender: 'user' | 'ai'; text: string; sign?: string }>>([]);

  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (typeof navigator !== "undefined" && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          setHasCameraPermission(false);
          setError('Camera access denied. Please enable camera permissions in your browser settings.');
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions to use this feature.',
          });
        }
      } else {
         setHasCameraPermission(false);
         setError('Camera access is not supported by your browser or device.');
         toast({
            variant: 'destructive',
            title: 'Camera Not Supported',
            description: 'Your browser or device does not support camera access.',
          });
      }
    };
    getCameraPermission();

    return () => { // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const captureAndInterpret = useCallback(async () => {
    if (!videoRef.current || !hasCameraPermission) {
      toast({ title: 'Camera not ready', description: 'Please ensure camera access is enabled.', variant: 'destructive' });
      return;
    }

    setIsInterpreting(true);
    setError(null);
    setInterpretedText(null);
    setAiResponse(null);
    setSuggestedSign(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setError('Failed to create canvas context for image capture.');
      setIsInterpreting(false);
      return;
    }
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const gestureImageUri = canvas.toDataURL('image/jpeg'); // Using JPEG for smaller size

    try {
      const interpretationResult: InterpretHandGestureOutput = await interpretHandGesture({ gestureImageUri });
      
      if (interpretationResult.error || !interpretationResult.interpretedText || interpretationResult.interpretedText === "Interpretation failed" || interpretationResult.interpretedText === "Interpretation error") {
        setError(interpretationResult.error || 'Failed to interpret gesture.');
        setInterpretedText('Could not understand gesture.');
        toast({ title: 'Interpretation Failed', description: interpretationResult.error || 'The AI could not understand the gesture.', variant: 'destructive' });
        setIsInterpreting(false);
        return;
      }

      setInterpretedText(interpretationResult.interpretedText);
      setConversationLog(prev => [...prev, { sender: 'user', text: interpretationResult.interpretedText }]);
      
      // Now generate AI response based on interpretation
      setIsGeneratingResponse(true);
      const conversationContext = conversationLog.slice(-5).map(entry => `${entry.sender}: ${entry.text}`).join('\n');
      const responseResult: GenerateSignLanguageResponseOutput = await generateSignLanguageResponse({ 
        interpretedGestureText: interpretationResult.interpretedText,
        conversationContext
      });

      if (!responseResult.responseText) {
        setError( 'Failed to generate AI response.');
        setAiResponse('Sorry, I could not generate a response.');
        toast({ title: 'Response Generation Failed', description: 'The AI could not generate a response.', variant: 'destructive' });
      } else {
        setAiResponse(responseResult.responseText);
        setSuggestedSign(responseResult.suggestedSignVisual || null);
        setConversationLog(prev => [...prev, { sender: 'ai', text: responseResult.responseText, sign: responseResult.suggestedSignVisual }]);
      }

    } catch (err) {
      console.error('Error in sign language interaction:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({ title: 'Interaction Error', description: errorMessage, variant: 'destructive' });
    } finally {
      setIsInterpreting(false);
      setIsGeneratingResponse(false);
    }
  }, [hasCameraPermission, toast, conversationLog]);

  const isLoading = isInterpreting || isGeneratingResponse;

  return (
    <div className="w-full space-y-6"> {/* Changed max-w-3xl mx-auto to w-full */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Hand className="mr-2 h-6 w-6 text-primary" />
            Sign Language Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasCameraPermission === null && <Skeleton className="w-full aspect-video rounded-md" />}
          {hasCameraPermission === false && error && (
            <Alert variant="destructive">
              <Camera className="h-5 w-5" />
              <AlertTitle>Camera Issue</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {/* Always render video tag to avoid race conditions, hide if no permission */}
          <div className={hasCameraPermission ? 'block' : 'hidden'}>
             <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline data-ai-hint="webcam person" />
          </div>

          <Button 
            onClick={captureAndInterpret} 
            disabled={isLoading || !hasCameraPermission}
            className="w-full mt-4 text-lg py-3"
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Camera className="mr-2 h-5 w-5" />}
            {isInterpreting ? 'Interpreting Gesture...' : isGeneratingResponse ? 'Getting Response...' : 'Capture & Interpret Gesture'}
          </Button>
        </CardContent>
      </Card>

      {(interpretedText || aiResponse || isLoading || error) && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MessageSquare className="mr-2 h-6 w-6 text-primary" />
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && !isLoading && ( // Show error only if not loading something else
              <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {interpretedText && (
              <div>
                <Label htmlFor="interpretedText" className="font-semibold">You (Interpreted Gesture):</Label>
                <Textarea id="interpretedText" value={interpretedText} readOnly className="mt-1 bg-secondary/30" />
              </div>
            )}
            {aiResponse && (
              <div>
                <Label htmlFor="aiResponse" className="font-semibold">Sahaaya AI:</Label>
                <Textarea id="aiResponse" value={aiResponse} readOnly className="mt-1 bg-secondary/30" />
                {suggestedSign && (
                    <p className="text-sm text-muted-foreground mt-1 italic">AI might show: {suggestedSign}</p>
                )}
              </div>
            )}
             {conversationLog.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Conversation History:</h3>
                <div className="max-h-60 overflow-y-auto space-y-3 p-3 border rounded-md bg-muted/20">
                  {conversationLog.map((entry, index) => (
                    <div key={index} className={`p-2 rounded-md ${entry.sender === 'user' ? 'bg-primary/10 text-right' : 'bg-accent/10'}`}>
                      <p className={`font-semibold ${entry.sender === 'user' ? 'text-primary' : 'text-accent'}`}>{entry.sender === 'user' ? 'You (Gesture)' : 'Sahaaya AI'}:</p>
                      <p className="whitespace-pre-wrap">{entry.text}</p>
                      {entry.sign && <p className="text-xs italic text-muted-foreground mt-0.5">(Visual: {entry.sign})</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

