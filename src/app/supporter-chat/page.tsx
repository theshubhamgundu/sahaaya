import Link from 'next/link';
import { AppHeader } from '@/components/sahaaya/AppHeader';
import { ChatInterface } from '@/components/sahaaya/ChatInterface';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function SupporterChatPage() {
  // In a real application, this page would have authentication
  // and logic to select or be assigned to a user's chat session.
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
            <h2 className="text-3xl font-semibold text-foreground">Supporter Chat Portal</h2>
            <p className="text-muted-foreground">Provide live support to users.</p>
        </div>

        <Alert variant="default" className="mb-6 bg-accent/10 border-accent/30">
          <Info className="h-5 w-5 text-accent" />
          <AlertTitle>Supporter Dashboard (Demo)</AlertTitle>
          <AlertDescription>
            This is a conceptual chat interface for supporters. In a real system, you would see a list of active users seeking chat,
            or be automatically connected. For now, this demonstrates the supporter's view of the chat.
          </AlertDescription>
        </Alert>
        
        {/* 
          TODO: In a real app, you'd have logic here for:
          - Supporter login
          - Viewing a list of users waiting for chat
          - Selecting a user to chat with
          - Or being automatically assigned to a chat
          - Displaying information about the current chat session
        */}
        
        <ChatInterface userRole="supporter" />
        
      </main>
      <footer className="py-6 text-center border-t border-border bg-secondary/30">
        <p className="text-sm text-muted-foreground">
          Sahaaya AI Assistant &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
