import * as React from 'react'; // Added import
import type { DetectEmotionalDistressOutput } from '@/ai/flows/detect-emotional-distress';
import type { GeneratePersonalizedSupportOutput } from '@/ai/flows/generate-personalized-support';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Brain, Gavel, Info, HeartHandshake, MessageCircleWarning, ThumbsUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIResponseDisplayProps {
  distressOutput?: DetectEmotionalDistressOutput | null;
  supportOutput?: GeneratePersonalizedSupportOutput | null;
  isLoading: boolean;
  error?: string | null;
  initialMessage?: string | null;
}

export function AIResponseDisplay({
  distressOutput,
  supportOutput,
  isLoading,
  error,
  initialMessage,
}: AIResponseDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 mt-8">
        <Card className="shadow-lg">
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8 shadow-md">
        <MessageCircleWarning className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (initialMessage) {
     return (
      <Alert className="mt-8 shadow-md bg-accent/20 border-accent/50">
        <ThumbsUp className="h-5 w-5 text-accent" />
        <AlertTitle>Thank you for sharing</AlertTitle>
        <AlertDescription>{initialMessage}</AlertDescription>
      </Alert>
    );
  }
  
  if (!distressOutput && !supportOutput) {
    return null; // Or some placeholder indicating to type above
  }

  const hasEmotionalSupport = distressOutput?.affirmation || distressOutput?.calmingResponse;
  const hasPersonalizedSupportMessage = supportOutput?.message;
  const hasLegalGuidanceString = supportOutput?.legalGuidance;

  return (
    <div className="space-y-6 mt-8">
      {distressOutput?.emotionalDistressDetected === false && (
        <Alert className="shadow-md bg-primary/10 border-primary/30 transition-all duration-300 hover:shadow-lg">
          <Info className="h-5 w-5 text-primary" />
          <AlertTitle>We're here for you</AlertTitle>
          <AlertDescription>
            It seems you might not be experiencing acute distress right now, but please know we're always here to listen. If something specific is on your mind, feel free to share more details.
          </AlertDescription>
        </Alert>
      )}

      {hasPersonalizedSupportMessage && (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center">
              <HeartHandshake className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Our Support For You</CardTitle>
            </div>
            {distressOutput?.distressType && (
              <CardDescription className="text-base">Detected emotional state: {distressOutput.distressType}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-foreground/90 text-base">{supportOutput?.message}</p>
          </CardContent>
        </Card>
      )}

      {!hasPersonalizedSupportMessage && hasEmotionalSupport && (
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Emotional First Aid</CardTitle>
            </div>
             {distressOutput?.distressType && (
              <CardDescription className="text-base">Detected emotional state: {distressOutput.distressType}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {distressOutput?.affirmation && (
              <div>
                <h4 className="font-semibold text-foreground/80 text-base">Affirmation:</h4>
                <p className="whitespace-pre-wrap text-foreground/90 text-base">{distressOutput.affirmation}</p>
              </div>
            )}
            {distressOutput?.calmingResponse && (
              <div>
                <h4 className="font-semibold text-foreground/80 text-base">Calming Thoughts:</h4>
                <p className="whitespace-pre-wrap text-foreground/90 text-base">{distressOutput.calmingResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {hasLegalGuidanceString && (
         <Card className="shadow-lg bg-accent/10 border-accent/30 transition-all duration-300 hover:shadow-xl hover:border-accent/70">
          <CardHeader>
            <div className="flex items-center">
              <Gavel className="h-6 w-6 mr-2 text-accent" />
              <CardTitle>Additional Legal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-foreground/90 text-base">{supportOutput?.legalGuidance}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
