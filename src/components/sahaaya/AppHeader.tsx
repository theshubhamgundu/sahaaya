import { LifeBuoy } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-8 text-center border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-2">
          <LifeBuoy className="h-10 w-10 mr-3 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Sahaaya AI Assistant
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Listen. Heal. Act. AI support for those silenced by society.
        </p>
      </div>
    </header>
  );
}
