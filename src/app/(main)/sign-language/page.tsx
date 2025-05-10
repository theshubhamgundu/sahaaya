
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
        <AlertTitle className="text-accent">Experimental Feature - Important Limitations</AlertTitle>
        <AlertDescription className="text-accent/90 space-y-1">
          <p>
            Sign language interpretation is highly complex and this feature is currently conceptual, relying on general AI models.
          </p>
          <p>
            <strong>Accuracy:</strong> The AI will attempt to understand basic, clear gestures from a single user. Accuracy may vary significantly based on gesture clarity, lighting, and background. It is not a substitute for a human interpreter.
          </p>
          <p>
            <strong>Multiple People:</strong> The system is designed for a single user. It cannot reliably distinguish or interpret gestures if multiple people are in the camera view. Please ensure only the person signing is clearly visible.
          </p>
          <p>
            <strong>Real-time:</strong> While the camera feed is live, interpretation happens when you click the button. True continuous, real-time interpretation is not yet supported.
          </p>
        </AlertDescription>
      </Alert>

      <SignLanguageInterface />
      
      <div className="mt-12 w-full"> {/* Changed max-w-2xl mx-auto to w-full */}
       <PrivacyBanner />
      </div>
    </div>
  );
}

