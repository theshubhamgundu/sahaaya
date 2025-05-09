
'use client';

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, Gavel, Accessibility, Users, LogIn, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigationOptions = [
  {
    name: 'Emotional Support',
    href: '/emotional-support',
    icon: HeartHandshake,
  },
  {
    name: 'Legal Support',
    href: '/legal-support',
    icon: Gavel,
  },
  {
    name: 'Sign Language',
    href: '/sign-language',
    icon: Accessibility,
  },
  {
    name: 'Human Support',
    href: '/human-support',
    icon: Users,
  },
  {
    name: 'Supporter Portal',
    href: '/supporter-chat',
    icon: LogIn,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = React.useState('');

  React.useEffect(() => {
    setCurrentTime(new Date().getFullYear().toString());
  }, []);


  return (
    <aside className="w-[30%] min-w-[280px] max-w-[400px] flex-shrink-0 border-r border-border bg-card p-6 flex flex-col h-full">
      <Link href="/" className="mb-8 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1 -ml-1">
        <LifeBuoy className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sahaaya AI
          </h1>
          <p className="text-xs text-muted-foreground">
            Listen. Heal. Act.
          </p>
        </div>
      </Link>
      <nav className="flex-grow space-y-1.5">
        {navigationOptions.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-base h-12 px-3 py-2',
                pathname === item.href
                  ? 'bg-primary/10 text-primary font-semibold border border-primary/30'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Sahaaya AI Assistant &copy; {currentTime}
        </p>
      </div>
    </aside>
  );
}

