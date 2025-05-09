
"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, UserCircle, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'supporter' | 'system';
  timestamp: Date;
  senderName?: string;
}

interface ChatInterfaceProps {
  userRole: 'user' | 'supporter';
  // In a real app, you'd pass conversationId, userId, supporterId, etc.
}

export function ChatInterface({ userRole }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentSenderName = userRole === 'user' ? 'You' : 'Supporter';
  const otherPartyName = userRole === 'user' ? 'Supporter' : 'User'; // Placeholder

  // Mock initial message
  useEffect(() => {
    setMessages([
      {
        id: 'system-1',
        text: userRole === 'user' 
          ? 'You are now connected with a supporter. Please share what\'s on your mind.' 
          : 'You are now connected with a user. Please wait for them to start the conversation or greet them.',
        sender: 'system',
        timestamp: new Date(),
      },
    ]);
  }, [userRole]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messageToSend: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      sender: userRole,
      timestamp: new Date(),
      senderName: currentSenderName,
    };

    setMessages((prevMessages) => [...prevMessages, messageToSend]);
    setNewMessage('');

    // Simulate a response if user is 'user' (for demo purposes)
    if (userRole === 'user') {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: `resp-${Date.now()}`,
            text: 'Thank you for sharing. I am listening.',
            sender: 'supporter',
            timestamp: new Date(),
            senderName: 'Supporter',
          },
        ]);
      }, 1000);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <MessageSquare className="mr-2 h-6 w-6 text-primary" />
          Live Chat with {userRole === 'user' ? 'a Supporter' : 'a User'}
        </CardTitle>
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
                    <AvatarFallback>{(msg.senderName || otherPartyName).charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-xs lg:max-w-md break-words',
                    msg.sender === userRole && 'bg-primary text-primary-foreground',
                    msg.sender !== userRole && msg.sender !== 'system' && 'bg-secondary text-secondary-foreground',
                    msg.sender === 'system' && 'bg-transparent text-muted-foreground text-sm italic w-full text-center'
                  )}
                >
                  {msg.sender !== 'system' && (
                     <p className={cn("text-xs font-semibold mb-1", msg.sender === userRole ? "text-primary-foreground/80" : "text-secondary-foreground/80")}>
                      {msg.senderName || (msg.sender === 'user' ? 'User' : 'Supporter')}
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  {msg.sender !== 'system' && (
                    <p className={cn("text-xs mt-1 opacity-70", msg.sender === userRole ? "text-right" : "text-left")}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                 {msg.sender === userRole && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback>{(msg.senderName || currentSenderName).charAt(0)}</AvatarFallback>
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
            className="flex-grow resize-none"
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
