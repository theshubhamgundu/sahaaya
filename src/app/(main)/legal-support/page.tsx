
import { LegalInputForm } from '@/components/sahaaya/LegalInputForm';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';

export default function LegalSupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Legal Support & Guidance</h2>
          <p className="text-muted-foreground mt-1">Describe your situation to understand your rights and available legal options.</p>
      </div>
      <LegalInputForm />
      <div className="mt-12 max-w-2xl mx-auto">
       <PrivacyBanner />
      </div>
    </div>
  );
}
