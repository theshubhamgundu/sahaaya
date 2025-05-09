
"use client";

import * as React from 'react'; // Added import
import { useState, useRef, useEffect, FormEvent, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'supporter' | 'system';
  timestamp: number; // Store as number for easier sorting/comparison
  senderName?: string;
}

interface ChatInterfaceProps {
  userRole: 'user' | 'supporter';
}

const CHAT_STORAGE_KEY = 'sahaaya-live-chat-messages';

export function ChatInterface({ userRole }: ChatInterfaceProps) {
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // Stores only user/supporter messages
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentSenderName = userRole === 'user' ? 'You' : 'Supporter';
  const otherPartyName = userRole === 'user' ? 'Supporter' : 'User';

  const loadChatMessages = useCallback((): Message[] => {
    if (typeof window === 'undefined') return [];
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages: Message[] = JSON.parse(storedMessages);
        // Filter out any old system messages if they were accidentally stored, and ensure correct types
        return parsedMessages
          .filter(m => (m.sender === 'user' || m.sender === 'supporter') && typeof m.timestamp === 'number')
          .sort((a, b) => a.timestamp - b.timestamp);
      }
    } catch (error) {
      console.error("Failed to load messages from localStorage", error);
      toast({
        variant: 'destructive',
        title: 'Error Loading Chat',
        description: 'Could not load previous messages.',
      });
    }
    return [];
  }, [toast]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setChatMessages(loadChatMessages()); 

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY) {
        setChatMessages(loadChatMessages()); 
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadChatMessages]);

  const messages: Message[] = useMemo(() => {
    const systemMessage: Message = {
      id: `system-${userRole}`, 
      text: userRole === 'user'
        ? 'You are now connected with a supporter. Please share what\'s on your mind.'
        : 'You are now connected with a user. Please wait for them to start the conversation or greet them.',
      sender: 'system',
      timestamp: 0, // Ensures it's always at the beginning when sorted by timestamp
    };
    return [systemMessage, ...chatMessages];
  }, [userRole, chatMessages]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      } else {
         scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend: Message = {
      id: `msg-${userRole}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      text: newMessage,
      sender: userRole,
      timestamp: Date.now(),
      senderName: currentSenderName,
    };

    try {
      if (typeof window !== 'undefined') {
        const currentMessagesInStorage = loadChatMessages(); 
        const updatedMessagesForStorage = [...currentMessagesInStorage, messageToSend];
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessagesForStorage));
        
        setChatMessages(prev => [...prev, messageToSend].sort((a,b) => a.timestamp - b.timestamp));
      }
    } catch (error) {
      console.error("Failed to save message to localStorage", error);
      toast({
        variant: 'destructive',
        title: 'Message Not Sent',
        description: 'Could not save your message. Please try again.',
      });
    }
    setNewMessage('');
  };
  
  const clearChatHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      setChatMessages(loadChatMessages()); // This will re-load an empty array
      toast({ title: "Chat History Cleared", description: "The chat log has been cleared." });
    }
  };


  return (
    <Card className="w-full shadow-xl"> {/* Changed max-w-2xl mx-auto to w-full */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-xl">
          <MessageSquare className="mr-2 h-6 w-6 text-primary" />
          Live Chat with {userRole === 'user' ? 'a Supporter' : 'a User'}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={clearChatHistory}>Clear History</Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4 mb-4 border rounded-md p-4 bg-muted/20" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-end space-x-2',
                  msg.sender === userRole ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.sender !== userRole && msg.sender !== 'system' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{(msg.senderName || (msg.sender === 'user' ? 'U' : 'S')).charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-xs lg:max-w-md break-words shadow-sm',
                    msg.sender === userRole && 'bg-primary text-primary-foreground',
                    msg.sender !== userRole && msg.sender !== 'system' && 'bg-secondary text-secondary-foreground',
                    msg.sender === 'system' && 'bg-transparent text-muted-foreground text-base italic w-full text-left py-2 px-0 shadow-none'
                  )}
                >
                  {msg.sender !== 'system' && msg.senderName && (
                     <p className={cn("text-xs font-semibold mb-1", msg.sender === userRole ? "text-primary-foreground/80" : "text-secondary-foreground/80")}>
                      {msg.senderName}
                    </p>
                  )}
                  <p className="text-base">{msg.text}</p>
                  {msg.sender !== 'system' && (
                    <p className={cn("text-xs mt-1 opacity-70", msg.sender === userRole ? "text-right text-primary-foreground/70" : "text-left text-secondary-foreground/70")}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                 {msg.sender === userRole && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback>{(currentSenderName).charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Type your message as ${userRole}...`}
            className="flex-grow resize-none text-base"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button type="submit" size="icon" className="h-full aspect-square p-2">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

