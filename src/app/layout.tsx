import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Assuming this is still causing issues or not installed
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans;
// const geistMono = GeistMono; // Assuming this is still causing issues or not installed

export const metadata: Metadata = {
  title: 'Sahaaya AI Assistant',
  description: 'Listen. Heal. Act. AI support for those silenced by society.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} font-sans antialiased h-full flex flex-col`}> {/* Removed geistMono.variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
