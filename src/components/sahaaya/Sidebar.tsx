
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

interface SidebarProps {
  onLinkClick: () => void;
  isMobileView?: boolean;
}

export function Sidebar({ onLinkClick, isMobileView = false }: SidebarProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = React.useState('');

  React.useEffect(() => {
    setCurrentTime(new Date().getFullYear().toString());
  }, []);


  return (
    <aside className={cn(
        "bg-card flex flex-col h-full w-full", // w-full to fill its container (desktop sidebar container or sheet)
        isMobileView ? "p-0" : "p-6 border-r border-sidebar-border" // No padding if mobile, header/footer added by layout
    )}>
      {/* Desktop: Logo and Title Section */}
      {!isMobileView && (
        <Link href="/" className="mb-8 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1 -ml-1" onClick={onLinkClick}>
            <LifeBuoy className="h-12 w-12 text-primary" />
            <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Sahaaya AI
            </h1>
            <p className="text-sm text-muted-foreground">
                Listen. Heal. Act.
            </p>
            </div>
        </Link>
      )}
      
      {/* Navigation links - different padding for mobile sheet */}
      <nav className={cn("flex-grow space-y-2", isMobileView ? "p-6" : "")}>
        {navigationOptions.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <Button
              onClick={onLinkClick} // Will close sheet in mobile, do nothing on desktop
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-lg h-14 px-4 py-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md', 
                pathname === item.href
                  ? 'bg-primary/10 text-primary font-semibold border border-primary/30 shadow-lg scale-[1.01]'
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Desktop: Footer Section */}
      {!isMobileView && (
        <div className="mt-auto pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Sahaaya AI Assistant &copy; {currentTime}
          </p>
        </div>
      )}
    </aside>
  );
}
