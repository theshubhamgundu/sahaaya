
import { LegalInputForm } from '@/components/sahaaya/LegalInputForm';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';

export default function LegalSupportPage() {
  return (
    <div className="w-full h-full flex flex-col"> {/* Ensure full height and flex column */}
      <div className="text-center mb-8 shrink-0"> {/* Prevent header from shrinking */}
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Legal Support & Guidance</h2>
          <p className="text-lg text-muted-foreground mt-1">Describe your situation to understand your rights and available legal options.</p>
      </div>
      <div className="flex-grow min-h-0"> {/* Allow LegalInputForm and its display to take remaining space and scroll */}
        <LegalInputForm />
      </div>
      <div className="mt-auto shrink-0 pt-4"> {/* Push privacy banner to bottom, prevent shrinking */}
       <PrivacyBanner />
      </div>
    </div>
  );
}

