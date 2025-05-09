
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-2xl shadow-xl border-border">
        <CardHeader className="items-center text-center pt-8">
          <Info data-ai-hint="information symbol" className="h-16 w-16 mb-4 text-primary" />
          <CardTitle className="text-3xl font-semibold">Welcome to Sahaaya AI</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-8">
          <p className="text-lg text-muted-foreground mb-6">
            Please select an option from the sidebar to get started.
          </p>
          <p className="text-md text-foreground">
            We are here to listen, help you heal, and guide you to act. Your privacy and well-being are our utmost priorities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
