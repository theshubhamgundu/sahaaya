'use client';

import { Home, MessageCircle, BookOpen, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { 
      icon: Home, 
      label: 'Home', 
      href: '/',
      active: pathname === '/'
    },
    { 
      icon: MessageCircle, 
      label: 'Chat', 
      href: '/chat',
      active: pathname.startsWith('/chat')
    },
    { 
      icon: BookOpen, 
      label: 'Resources', 
      href: '/resources',
      active: pathname.startsWith('/resources')
    },
    { 
      icon: User, 
      label: 'Profile', 
      href: '/profile',
      active: pathname.startsWith('/profile')
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                item.active 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <div className={`p-2 rounded-full ${item.active ? 'bg-primary-50 dark:bg-primary-900/30' : ''}`}>
                <Icon className={`w-6 h-6 ${item.active ? 'scale-110' : ''} transition-transform duration-200`} />
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
