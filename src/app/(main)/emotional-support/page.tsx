
import { UserInputForm } from '@/components/sahaaya/UserInputForm';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';

export default function EmotionalSupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Emotional Support</h2>
          <p className="text-lg text-muted-foreground mt-1">Share your experience. We are here to listen and provide comfort.</p>
      </div>
      <UserInputForm />
      <div className="mt-12 max-w-2xl mx-auto">
       <PrivacyBanner />
      </div>
    </div>
  );
}
