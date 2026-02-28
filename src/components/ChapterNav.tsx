"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  title: string;
  number: string;
}

interface ChapterNavProps {
  chapters: Chapter[];
  currentChapter: string;
  onChapterChange: (id: string) => void;
}

export function ChapterNav({ chapters, currentChapter, onChapterChange }: ChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center hover:bg-card transition-colors"
        aria-label="Chapter navigation"
      >
        <span className="text-xs font-bold">{Math.max(1, chapters.findIndex(c => c.id === currentChapter) + 1)}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-14 top-0 bg-card/95 backdrop-blur border border-border rounded-lg p-4 min-w-[200px]">
          <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Chapters</div>
          <nav className="space-y-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => {
                  onChapterChange(chapter.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  currentChapter === chapter.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-50">{chapter.number}</span>
                  <span>{chapter.title}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

