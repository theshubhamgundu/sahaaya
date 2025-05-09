
import { ChatInterface } from '@/components/sahaaya/ChatInterface';
import { PrivacyBanner } from '@/components/sahaaya/PrivacyBanner';

export default function HumanSupportPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Human Support Chat</h2>
          <p className="text-lg text-muted-foreground mt-1">Connect and chat live with a trained supporter.</p>
      </div>
      
      <ChatInterface userRole="user" />
      
      <div className="mt-12 max-w-2xl mx-auto">
       <PrivacyBanner />
      </div>
    </div>
  );
}
