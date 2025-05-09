import { AppHeader } from '@/components/sahaaya/AppHeader';
import { UserInputForm } from '@/components/sahaaya/UserInputForm';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <UserInputForm />
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
