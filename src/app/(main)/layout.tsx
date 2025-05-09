
"use client"; 

import * as React from 'react';
import { Sidebar } from '@/components/sahaaya/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link'; // Added for Sahaaya AI title link
import { LifeBuoy } from 'lucide-react'; // For logo

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-screen h-full"> {/* Changed min-h-0 to min-h-screen */}
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-[30%] md:min-w-[280px] md:max-w-[400px] flex-shrink-0">
        <Sidebar onLinkClick={() => {}} isMobileView={false} />
      </div>

      {/* Mobile and Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header / Toggle Button */}
        <header className="md:hidden p-3 border-b border-border flex items-center justify-between sticky top-0 bg-background z-20 h-16"> {/* Increased padding and height */}
          <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10"> {/* Consistent button size */}
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px] sm:w-[300px] bg-card text-card-foreground flex flex-col"> {/* Ensure flex-col for SheetContent */}
              {/* Sidebar Header for Mobile Sheet */}
              <div className="p-6 border-b border-sidebar-border">
                <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileSidebarOpen(false)}>
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
              </div>
              {/* Actual Sidebar Content for Mobile */}
              <div className="flex-grow overflow-y-auto">
                 <Sidebar onLinkClick={() => setIsMobileSidebarOpen(false)} isMobileView={true} />
              </div>
               {/* Footer for Mobile Sheet Sidebar */}
              <div className="p-6 border-t border-sidebar-border text-center text-xs text-muted-foreground">
                Sahaaya AI &copy; {new Date().getFullYear()}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Centered App Title for Mobile Header */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileSidebarOpen(false)}>
            <LifeBuoy className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">Sahaaya AI</span>
          </Link>
          <div className="w-10"></div> {/* Spacer to balance the hamburger icon */}
        </header>

        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
