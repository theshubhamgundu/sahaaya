import Link from 'next/link';
import { AppHeader } from '@/components/sahaaya/AppHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Gavel, Accessibility, ArrowRight, Users, LogIn } from 'lucide-react';

export default function HomePage() {
  const options = [
    {
      title: 'Emotional Support',
      description: 'Share your experiences and receive empathetic affirmations and calming responses.',
      href: '/emotional-support',
      icon: <HeartHandshake className="h-12 w-12 mb-4 text-primary" />,
      cta: 'Get Emotional Support',
    },
    {
      title: 'Legal Support',
      description: 'Understand your rights and get guidance on legal procedures and resources.',
      href: '/legal-support',
      icon: <Gavel className="h-12 w-12 mb-4 text-primary" />,
      cta: 'Get Legal Support',
    },
    {
      title: 'Sign Language Communication',
      description: 'Communicate using hand gestures. Designed for deaf and mute individuals.',
      href: '/sign-language',
      icon: <Accessibility className="h-12 w-12 mb-4 text-primary" />,
      cta: 'Use Sign Language',
    },
    {
      title: 'Human Support Chat',
      description: 'Connect with a trained professional for live chat support.',
      href: '/human-support',
      icon: <Users className="h-12 w-12 mb-4 text-primary" />,
      cta: 'Chat with a Supporter',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        
        <section className="mb-16 p-8 rounded-lg shadow-xl bg-card border border-border text-center">
          <LogIn className="h-12 w-12 mb-4 text-accent mx-auto" />
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Are you a Supporter?
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Access the chat portal to provide live support to individuals in need.
          </p>
          <Link href="/supporter-chat" passHref legacyBehavior>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-8 rounded-lg shadow-md transition-transform hover:scale-105">
              Supporter Chat Portal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </section>

        <h2 className="text-3xl font-semibold text-center mb-2 text-foreground">
          How can we help you today?
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-10">
          Choose an option below to get started. Your privacy is our priority.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {options.map((option) => (
            <Card key={option.title} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                {option.icon}
                <CardTitle className="text-2xl">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col text-center">
                <CardDescription className="mb-6 text-base flex-grow">
                  {option.description}
                </CardDescription>
                <Link href={option.href} passHref legacyBehavior>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105">
                    {option.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="py-6 text-center border-t border-border bg-secondary/30">
        <p className="text-sm text-muted-foreground">
          Sahaaya AI Assistant &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
