import type { ProvideRelevantLegalGuidanceOutput } from '@/ai/flows/provide-relevant-legal-guidance';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Gavel, MessageCircleWarning, Info, ShieldCheck, FileText, Phone, Users, Building } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface LegalGuidanceDisplayProps {
  legalOutput?: ProvideRelevantLegalGuidanceOutput | null;
  isLoading: boolean;
  error?: string | null;
}

export function LegalGuidanceDisplay({
  legalOutput,
  isLoading,
  error,
}: LegalGuidanceDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 mt-8">
        {[1, 2, 3].map(i => (
          <Card key={i} className="shadow-lg">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-8 shadow-md">
        <MessageCircleWarning className="h-5 w-5" />
        <AlertTitle>Error Processing Legal Request</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!legalOutput || !legalOutput.legalGuidance) {
    return (
        <Alert className="mt-8 shadow-md bg-secondary/20 border-secondary/50">
            <Info className="h-5 w-5 text-secondary-foreground" />
            <AlertTitle>Awaiting Input</AlertTitle>
            <AlertDescription>Please describe your situation above to receive legal guidance.</AlertDescription>
        </Alert>
    );
  }

  const { legalGuidance } = legalOutput;

  const sections = [
    { title: 'Your Legal Rights', content: legalGuidance.legalRights, icon: <ShieldCheck className="h-5 w-5 mr-2 text-primary" />, key: 'rights' },
    { title: 'Applicable Laws', content: legalGuidance.applicableLaws, icon: <FileText className="h-5 w-5 mr-2 text-primary" />, key: 'laws' },
    { title: 'Complaint Filing Procedures', content: legalGuidance.complaintFilingProcedures, icon: <Gavel className="h-5 w-5 mr-2 text-primary" />, key: 'procedures' },
  ];

  const resourceSections = [
    { title: 'Verified Helplines', content: legalGuidance.verifiedHelplines, icon: <Phone className="h-5 w-5 mr-2 text-accent" />, key: 'helplines' },
    { title: 'Relevant NGOs', content: legalGuidance.ngos, icon: <Users className="h-5 w-5 mr-2 text-accent" />, key: 'ngos' },
    { title: 'Support Centers', content: legalGuidance.supportCenters, icon: <Building className="h-5 w-5 mr-2 text-accent" />, key: 'centers' },
  ];

  return (
    <div className="space-y-6 mt-8">
      <Card className="shadow-lg border-primary/50">
        <CardHeader>
          <div className="flex items-center">
            <Gavel className="h-8 w-8 mr-3 text-primary" />
            <CardTitle className="text-2xl">Legal Information Overview</CardTitle>
          </div>
          <CardDescription>
            Based on the situation you described, here's some relevant legal information. This is not a substitute for professional legal advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="rights">
            {sections.map((section) => (
              section.content && (
                <AccordionItem value={section.key} key={section.key}>
                  <AccordionTrigger className="text-lg hover:no-underline">
                    <div className="flex items-center">
                      {section.icon} {section.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-wrap text-foreground/90 text-base p-2">
                    {section.content}
                  </AccordionContent>
                </AccordionItem>
              )
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {legalOutput.includeResources && (resourceSections.some(sec => sec.content && sec.content.trim() !== 'List of relevant NGOs will be here' && sec.content.trim() !== 'List of support centers will be here' && sec.content.trim() !== '')) && (
        <Card className="shadow-lg bg-accent/10 border-accent/40">
          <CardHeader>
             <div className="flex items-center">
                <Info className="h-8 w-8 mr-3 text-accent" />
                <CardTitle className="text-2xl">Support Resources</CardTitle>
            </div>
            <CardDescription>
              Here are some resources that might be helpful for your situation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {resourceSections.map((section) => (
                section.content && section.content.trim() !== 'List of relevant NGOs will be here' && section.content.trim() !== 'List of support centers will be here' && section.content.trim() !== '' && (
                    <AccordionItem value={section.key} key={section.key}>
                    <AccordionTrigger className="text-lg hover:no-underline">
                        <div className="flex items-center">
                        {section.icon} {section.title}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="whitespace-pre-wrap text-foreground/90 text-base p-2">
                        {section.content}
                    </AccordionContent>
                    </AccordionItem>
                )
                ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
       <Alert variant="default" className="mt-8 shadow-md bg-muted/50">
         <Info className="h-5 w-5" />
        <AlertTitle>Important Disclaimer</AlertTitle>
        <AlertDescription>
            The information provided here is for general guidance only and does not constitute legal advice.
            Laws and procedures can vary. It is highly recommended to consult with a qualified legal professional
            for advice tailored to your specific circumstances.
        </AlertDescription>
      </Alert>
    </div>
  );
}
