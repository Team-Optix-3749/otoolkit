"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import ManageEventsContent from "./ManageEventsContent";

interface ManageEventsSheetProps {
  onClose?: () => void;
}

export default function ManageEventsSheet({
  onClose
}: ManageEventsSheetProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) {
        onClose?.();
      }
    },
    [onClose]
  );

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm">
          Manage Events
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-y-auto sm:h-[80vh] lg:max-w-5xl lg:mx-auto">
        <SheetHeader>
          <SheetTitle>Manage Outreach Events</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <ManageEventsContent variant="sheet" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
