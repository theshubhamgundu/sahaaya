// @ts-nocheck
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Flame, Sparkles } from 'lucide-react'; // Using Flame for a "punch" effect

export function PunchingBagGame() {
  const [hits, setHits] = React.useState(0);
  const [isHitting, setIsHitting] = React.useState(false);
  const [showSparkles, setShowSparkles] = React.useState(false);
  const [dynamicStyle, setDynamicStyle] = React.useState<React.CSSProperties>({});
  const punchLockRef = React.useRef(false);

  const handlePunch = () => {
    if (punchLockRef.current) {
      return;
    }
    punchLockRef.current = true;

    setHits(prevHits => prevHits + 1);
    setIsHitting(true);
    setShowSparkles(true);

    // Generate random transform values for varied animation
    const randomRotation = Math.floor(Math.random() * 11) - 5; // -5 to 5 degrees
    const randomTranslateX = Math.floor(Math.random() * 7) - 3; // -3 to 3 px
    const randomTranslateY = Math.floor(Math.random() * 4) + 1; // 1 to 4 px (more emphasis on downward)
    const randomScale = 0.94 + (Math.random() * 0.06 - 0.03); // 0.91 to 0.97

    setDynamicStyle({
      transform: `rotate(${randomRotation}deg) translateX(${randomTranslateX}px) translateY(${randomTranslateY}px) scale(${randomScale})`,
    });

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(50);
      } catch (e) {
        console.warn("Vibration failed:", e);
      }
    }

    setTimeout(() => {
      setIsHitting(false);
      setDynamicStyle({}); // Reset dynamic styles to allow CSS to return to base
      punchLockRef.current = false;
    }, 150); // Animation duration

    setTimeout(() => setShowSparkles(false), 500);
  };

  const resetGame = () => {
    setHits(0);
    punchLockRef.current = false;
    setIsHitting(false);
    setShowSparkles(false);
    setDynamicStyle({});
  }

  let encouragementMessage = "Keep going!";
  if (hits > 10 && hits <= 20) encouragementMessage = "Feeling better?";
  else if (hits > 20 && hits <= 30) encouragementMessage = "Great job releasing stress!";
  else if (hits > 30) encouragementMessage = "You're a stress-busting champion!";


  return (
    <div className="flex flex-col items-center space-y-6 p-4 rounded-lg bg-card">
      <div
        data-ai-hint="punching bag boxing"
        className={cn(
          "relative w-40 h-60 bg-destructive/80 rounded-b-full rounded-t-md cursor-pointer transition-all duration-150 ease-out flex items-center justify-center shadow-lg select-none",
          // Base hover/active effects, not tied to the punch animation state
          "hover:scale-105 active:scale-90"
        )}
        style={isHitting ? dynamicStyle : {}} // Apply dynamic style when hitting, otherwise default (empty object means CSS classes rule)
        onClick={handlePunch}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePunch();
        }}
        role="button"
        tabIndex={0}
        aria-label="Punching Bag"
      >
        <Flame className={cn(
            "h-16 w-16 text-destructive-foreground/70 transition-opacity duration-150", // Matched duration with JS
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
