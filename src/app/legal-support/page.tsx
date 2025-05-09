import Link from 'next/link';
import { AppHeader } from '@/components/sahaaya/AppHeader';
import { LegalInputForm } from '@/components/sahaaya/LegalInputForm';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function LegalSupportPage() {
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
            <h2 className="text-3xl font-semibold text-foreground">Legal Support & Guidance</h2>
            <p className="text-muted-foreground">Describe your situation to understand your rights and available legal options.</p>
        </div>
        <LegalInputForm />
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
