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
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        startTyping();
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      startTyping();
    }
  }, [text, speed, delay]);

  const startTyping = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  };

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

