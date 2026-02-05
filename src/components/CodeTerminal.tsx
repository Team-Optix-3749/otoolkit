"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const codeLines = [
  { text: "$ npm install @optix/toolkit", delay: 0, color: "text-foreground" },
  { text: "✓ Installed successfully", delay: 2500, color: "text-green-500" },
  { text: "$ optix init", delay: 4000, color: "text-foreground" },
  { text: "✓ Initialized project", delay: 6000, color: "text-green-500" },
  { text: "$ optix start", delay: 7500, color: "text-foreground" },
  { text: "🚀 Server running on http://localhost:3000", delay: 9500, color: "text-primary" },
];

export function CodeTerminal() {
  const [displayedLines, setDisplayedLines] = useState<Array<{ text: string; displayedText: string; isTyping: boolean; color: string }>>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const typingSpeed = 30;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      const elapsed = Date.now() - startTime;

      if (currentLineIndex >= codeLines.length) {
        return;
      }

      const currentLine = codeLines[currentLineIndex];
      
      // Wait for the line's delay
      if (elapsed < currentLine.delay) {
        timeoutId = setTimeout(typeNextChar, 50);
        return;
      }

      // Type the current character
      if (currentCharIndex < currentLine.text.length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = {
              text: currentLine.text,
              displayedText: currentLine.text.slice(0, currentCharIndex + 1),
              isTyping: true,
              color: currentLine.color,
            };
          } else {
            newLines[currentLineIndex] = {
              ...newLines[currentLineIndex],
              displayedText: currentLine.text.slice(0, currentCharIndex + 1),
              isTyping: true,
            };
          }
          return newLines;
        });
        
        setCurrentCharIndex(currentCharIndex + 1);
        timeoutId = setTimeout(typeNextChar, typingSpeed);
      } else {
        // Line complete, move to next
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex]) {
            newLines[currentLineIndex] = {
              ...newLines[currentLineIndex],
              isTyping: false,
            };
          }
          return newLines;
        });

        if (currentLineIndex < codeLines.length - 1) {
          setCurrentLineIndex(currentLineIndex + 1);
          setCurrentCharIndex(0);
          timeoutId = setTimeout(typeNextChar, 300);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, 100);

    return () => clearTimeout(timeoutId);
  }, [currentLineIndex, currentCharIndex, startTime]);

  return (
    <div className="relative rounded-lg border border-border bg-card/50 backdrop-blur overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">terminal</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm min-h-[200px]">
        {displayedLines.map((line, index) => (
          <div key={index} className={`${line.color} mb-1`}>
            {line.displayedText}
            {line.isTyping && <span className="animate-pulse text-primary ml-1">|</span>}
          </div>
        ))}
        {currentLineIndex >= codeLines.length && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-primary">$</span>
            <div className="w-2 h-4 bg-primary animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}

