"use client";

import * as React from 'react';
import { Sidebar } from '@/components/sahaaya/Sidebar';
import { BottomNav } from '@/components/sahaaya/BottomNav';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LifeBuoy } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  const pathname = usePathname();
  
  // Check if we're on a feature page (not homepage)
  const isFeaturePage = pathname !== '/';

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-screen h-full">
      {/* Desktop Sidebar - Only show on feature pages */}
      {isFeaturePage && (
        <div className="hidden md:flex flex-shrink-0">
          <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out overflow-visible`}>
            <Sidebar 
              onLinkClick={() => {}} 
              isMobileView={false} 
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>
        </div>
      )}

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <Sidebar 
            onLinkClick={() => setIsMobileSidebarOpen(false)}
            isMobileView={true}
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
        </SheetContent>
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button - Only show on feature pages */}
              {isFeaturePage && (
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
              )}
              
              {/* Back Button - Only show on feature pages */}
              {isFeaturePage && (
                <Link href="/">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Back to Home</span>
                  </Button>
                </Link>
              )}
              
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <LifeBuoy className="h-8 w-8 text-primary" />
                {!isSidebarCollapsed && <span>Sahaaya</span>}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Get Help
              </Button>
            </div>
          </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden">
            <BottomNav />
          </div>
        </div>
      </Sheet>
    </div>
  );
}
