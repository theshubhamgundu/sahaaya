import { ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function PrivacyBanner() {
  return (
    <Card className="mt-8 bg-secondary/50 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center">
          <ShieldCheck className="h-8 w-8 mr-3 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              No login, no data tracking. Your story is safe and confidential.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
