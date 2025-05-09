
import { ChatInterface } from '@/components/sahaaya/ChatInterface';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function SupporterChatPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">Supporter Chat Portal</h2>
          <p className="text-lg text-muted-foreground mt-1">Provide live support to users.</p>
      </div>

      <Alert variant="default" className="mb-6 bg-accent/10 border-accent/30 text-accent-foreground">
        <Info className="h-5 w-5 text-accent" />
        <AlertTitle className="text-accent">Supporter Dashboard (Demo)</AlertTitle>
        <AlertDescription className="text-accent/90">
          This is a conceptual chat interface for supporters. In a real system, you would see a list of active users seeking chat,
          or be automatically connected. For now, this demonstrates the supporter's view of the chat.
        </AlertDescription>
      </Alert>
      
      <ChatInterface userRole="supporter" />
    </div>
  );
}
