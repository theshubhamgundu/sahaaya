import Link from 'next/link';
import { AppHeader } from '@/components/sahaaya/AppHeader';
import { SignLanguageInterface } from '@/components/sahaaya/SignLanguageInterface';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


export default function SignLanguagePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href="/" passHref legacyBehavior>
          <Button variant="outline" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground">Sign Language Communication</h2>
            <p className="text-muted-foreground">Use your camera to communicate with hand gestures.</p>
        </div>
        
        <Alert variant="default" className="mb-6 bg-accent/10 border-accent/30">
          <AlertTriangle className="h-5 w-5 text-accent" />
          <AlertTitle>Experimental Feature</AlertTitle>
          <AlertDescription>
            Sign language interpretation is complex and this feature is currently conceptual. 
            The AI will attempt to understand basic gestures. Accuracy may vary.
          </AlertDescription>
        </Alert>

        <SignLanguageInterface />
        
        <div className="mt-12 max-w-2xl mx-auto">
         <PrivacyBanner />
        </div>
      </main>
      <footer className="py-6 text-center border-t border-border bg-secondary/30">
        <p className="text-sm text-muted-foreground">
          Sahaaya AI Assistant &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
