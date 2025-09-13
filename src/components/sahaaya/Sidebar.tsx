'use client';

import * as React from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartHandshake, Gavel, Accessibility, Users, LogIn, LifeBuoy, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
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
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ onLinkClick, isMobileView = false, isCollapsed = false, onToggleCollapse }: SidebarProps) {
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
      {!isMobileView && !isCollapsed && (
        <Link href="/" className="mb-6 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-md p-1 -ml-1" onClick={onLinkClick}>
          <LifeBuoy className="h-10 w-10 text-sidebar-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-sidebar-foreground">
              Sahaaya AI
            </h1>
            <p className="text-xs text-muted-foreground">
              Listen. Heal. Act.
            </p>
          </div>
        </Link>
      )}
      {!isMobileView && isCollapsed && (
        <div className="py-6 flex justify-center">
          <Link href="/" onClick={onLinkClick} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-md p-1">
            <LifeBuoy className="h-8 w-8 text-sidebar-primary" />
          </Link>
        </div>
      )}

      {/* Navigation links - different padding for mobile sheet */}
      <nav className={cn("flex-grow space-y-1", isMobileView ? "p-6" : isCollapsed ? "px-2 py-4" : "px-4 py-2")}>
        {navigationOptions.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <Button
              onClick={onLinkClick}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-sm h-12 transition-all duration-200 ease-in-out transform',
                isCollapsed ? 'px-2' : 'px-3 py-2 hover:scale-[1.02] hover:shadow-md',
                pathname === item.href
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold border border-sidebar-border shadow-lg scale-[1.01]'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground',
                'focus-visible:ring-sidebar-ring',
                isCollapsed ? 'justify-center' : ''
              )}
              aria-label={isCollapsed ? item.name : undefined}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", !isCollapsed ? 'mr-2' : '')} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Desktop: Footer Section */}
      {!isMobileView && (
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground text-center mb-3">
              Sahaaya AI Assistant &copy; {currentTime}
            </p>
          )}
          
          {/* Toggle Button */}
          {onToggleCollapse && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className="text-muted-foreground hover:text-foreground"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                </span>
              </Button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}