
import { SignLanguageInterface } from '@/components/sahaaya/SignLanguageInterface';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function SignLanguagePage() {
  return (
    <div className="w-full"> {/* Changed max-w-4xl mx-auto to w-full */}
      <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Sign Language Communication</h2>
          <p className="text-lg text-muted-foreground mt-1">Use your camera to communicate with hand gestures.</p>
      </div>
      
      <Alert variant="default" className="mb-6 bg-accent/10 border-accent/30 text-accent-foreground">
        <AlertTriangle className="h-5 w-5 text-accent" />
        <AlertTitle className="text-accent">Experimental Feature</AlertTitle>
        <AlertDescription className="text-accent/90">
          Sign language interpretation is complex and this feature is currently conceptual. 
          The AI will attempt to understand basic gestures. Accuracy may vary.
        </AlertDescription>
      </Alert>

      <SignLanguageInterface />
      
      <div className="mt-12 w-full"> {/* Changed max-w-2xl mx-auto to w-full */}
       <PrivacyBanner />
      </div>
    </div>
  );
}

