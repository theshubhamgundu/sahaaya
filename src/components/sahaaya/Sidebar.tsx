'use client';

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, Gavel, Accessibility, Users, LogIn, LifeBuoy, Gamepad2 } from 'lucide-react';
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
  {
    name: 'Stress Relief Games',
    href: '/stress-relief-games',
    icon: Gamepad2,
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
        "bg-sidebar flex flex-col h-full w-full text-sidebar-foreground", 
        isMobileView ? "p-0" : "p-6 border-r border-sidebar-border" 
    )}>
      {/* Desktop: Logo and Title Section */}
      {!isMobileView && (
        <Link href="/" className="mb-8 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-md p-1 -ml-1" onClick={onLinkClick}>
            <LifeBuoy className="h-12 w-12 text-sidebar-primary" />
            <div>
            <h1 className="text-3xl font-bold tracking-tight text-sidebar-foreground">
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
              onClick={onLinkClick} 
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-lg h-14 px-4 py-3 transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-md', 
                pathname === item.href
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold border border-sidebar-border shadow-lg scale-[1.01]'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground',
                // Specific styling for sidebar buttons to use sidebar theme colors
                'focus-visible:ring-sidebar-ring'
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
        <div className="mt-auto pt-6 border-t border-sidebar-border">
          <p className="text-sm text-muted-foreground text-center">
            Sahaaya AI Assistant &copy; {currentTime}
          </p>
        </div>
      )}
    </aside>
  );
}