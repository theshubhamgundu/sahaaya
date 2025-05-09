
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
    <aside className="w-[30%] min-w-[280px] max-w-[400px] flex-shrink-0 border-r border-sidebar-border bg-card p-6 flex flex-col h-full">
      <Link href="/" className="mb-8 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1 -ml-1">
        <LifeBuoy className="h-12 w-12 text-primary" /> {/* Increased icon size */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground"> {/* Increased font size */}
            Sahaaya AI
          </h1>
          <p className="text-sm text-muted-foreground"> {/* Increased font size */}
            Listen. Heal. Act.
          </p>
        </div>
      </Link>
      <nav className="flex-grow space-y-2"> {/* Adjusted space-y for larger buttons */}
        {navigationOptions.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <Button
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-lg h-14 px-4 py-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md', // Increased font size, height, padding
                pathname === item.href
                  ? 'bg-primary/10 text-primary font-semibold border border-primary/30 shadow-lg scale-[1.01]'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" /> {/* Increased icon size */}
              <span className="truncate">{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground text-center"> {/* Increased font size */}
          Sahaaya AI Assistant &copy; {currentTime}
        </p>
      </div>
    </aside>
  );
}

