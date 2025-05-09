
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-0"> {/* Added padding for mobile */}
      <Card className="w-full max-w-3xl shadow-xl border-border transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        <CardHeader className="items-center text-center pt-6 md:pt-8"> {/* Adjusted padding */}
          <Info data-ai-hint="information symbol" className="h-12 w-12 md:h-16 md:w-16 mb-3 md:mb-4 text-primary" /> {/* Adjusted size/margin */}
          <CardTitle className="text-2xl md:text-3xl font-semibold">Welcome to Sahaaya AI</CardTitle> {/* Adjusted font size */}
        </CardHeader>
        <CardContent className="text-center pb-6 md:pb-8"> {/* Adjusted padding */}
          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6"> {/* Adjusted font size/margin */}
            Please select an option from the navigation menu to get started.
          </p>
          <p className="text-base md:text-lg text-foreground"> {/* Adjusted font size */}
            We are here to listen, help you heal, and guide you to act. Your privacy and well-being are our utmost priorities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
