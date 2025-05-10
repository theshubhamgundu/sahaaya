// @ts-nocheck
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Flame, Sparkles } from 'lucide-react'; // Using Flame for a "punch" effect

export function PunchingBagGame() {
  const [hits, setHits] = React.useState(0);
  const [isHitting, setIsHitting] = React.useState(false); // Controls the "hit" animation state
  const [showSparkles, setShowSparkles] = React.useState(false);
  const punchLockRef = React.useRef(false); // Lock to prevent rapid re-triggering

  const handlePunch = () => {
    if (punchLockRef.current) {
      return; // Already processing a punch or in cooldown
    }
    punchLockRef.current = true;

    setHits(prevHits => prevHits + 1);
    setIsHitting(true); // Trigger hit animation
    setShowSparkles(true);

    // Vibrate on mobile devices
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(50); // Vibrate for 50 milliseconds
      } catch (e) {
        // Vibration might be unsupported or blocked by user settings, fail silently
        console.warn("Vibration failed:", e);
      }
    }

    setTimeout(() => {
      setIsHitting(false); // End hit animation
      punchLockRef.current = false; // Release lock after animation + cooldown period
    }, 150); // Duration of the hit animation and lock

    setTimeout(() => setShowSparkles(false), 500); // Sparkles linger a bit longer
  };

  const resetGame = () => {
    setHits(0);
    // Ensure lock is reset if game is reset mid-punch
    punchLockRef.current = false;
    setIsHitting(false);
    setShowSparkles(false);
  }

  let encouragementMessage = "Keep going!";
  if (hits > 10 && hits <=20) encouragementMessage = "Feeling better?";
  else if (hits > 20 && hits <=30) encouragementMessage = "Great job releasing stress!";
  else if (hits > 30) encouragementMessage = "You're a stress-busting champion!";


  return (
    <div className="flex flex-col items-center space-y-6 p-4 rounded-lg bg-card">
      <div
        data-ai-hint="punching bag boxing"
        className={cn(
          "relative w-40 h-60 bg-destructive/80 rounded-b-full rounded-t-md cursor-pointer transition-all duration-100 ease-out flex items-center justify-center shadow-lg select-none",
          isHitting ? 'scale-95 -rotate-3 translate-y-1' : 'scale-100 rotate-0 translate-y-0', // Animation based on isHitting state
          "hover:scale-105 active:scale-90" // Immediate feedback on press
        )}
        onClick={handlePunch} // For mouse clicks
        onTouchStart={(e) => { // For touch events
          e.preventDefault(); // Prevent emulated click and other default touch behaviors
          handlePunch();
        }}
        role="button"
        tabIndex={0}
        aria-label="Punching Bag"
      >
        <Flame className={cn(
            "h-16 w-16 text-destructive-foreground/70 transition-opacity duration-100",
            isHitting ? "opacity-100 scale-110" : "opacity-50 scale-100"
        )} />
        {showSparkles && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <Sparkles
                        key={i}
                        className="absolute text-yellow-400 animate-ping opacity-70"
                        style={{
                            top: `${Math.random() * 80 + 10}%`,
                            left: `${Math.random() * 80 + 10}%`,
                            width: `${Math.random() * 16 + 8}px`,
                            height: `${Math.random() * 16 + 8}px`,
                            animationDuration: `${Math.random() * 0.3 + 0.2}s`
                        }}
                    />
                ))}
            </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-primary">{hits}</p>
        <p className="text-muted-foreground text-sm">Punches</p>
      </div>
      {hits > 0 && <p className="text-accent text-lg font-semibold">{encouragementMessage}</p>}
      <Button onClick={resetGame} variant="outline" className="mt-2">
        Reset Counter
      </Button>
    </div>
  );
}
