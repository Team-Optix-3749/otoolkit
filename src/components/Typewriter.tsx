"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  className = "",
  onComplete 
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    setDisplayedText("");
    let clearTyping: (() => void) | null = null;

    const startTyping = (): (() => void) => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);
      return () => clearInterval(interval);
    };

    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        clearTyping = startTyping();
      }, delay);
      return () => {
        clearTimeout(delayTimeout);
        if (clearTyping) clearTyping();
      };
    }
    clearTyping = startTyping();
    return () => {
      if (clearTyping) clearTyping();
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

