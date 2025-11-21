import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { formatMinutes } from "@/lib/utils";
import { manualModifyOutreachHours } from "@/lib/db/hours";

import { BaseStates } from "@/lib/types/states";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { Edit2, Minus, Plus } from "lucide-react";
import type { UserData } from "@/lib/types/db";

export default function EditUserDialog({
  userData,
  refreshFunc
}: {
  userData: UserData;
  refreshFunc?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"add" | "subtract">("add");
  const [adjustment, setAdjustment] = useState(0);
  const [displayName, setDisplayName] = useState(
    userData.name ?? "Unknown User"
  );

  useEffect(() => {
    if (open) {
      setMode("add");
      setAdjustment(0);
    }
  }, [open]);

  useEffect(() => {
    setDisplayName(userData.name ?? "Unknown User");
  }, [userData.name]);

  const signedAdjustment = useMemo(() => {
    const magnitude = Math.abs(adjustment);
    return mode === "add" ? magnitude : -magnitude;
  }, [adjustment, mode]);

  const projectedTotal = Math.max(
    0,
    (userData.outreach_minutes || 0) + signedAdjustment
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (signedAdjustment === 0) {
      toast.error("Enter a number of minutes to adjust by.");
      setLoading(false);
      return;
    }

    if (projectedTotal < 0) {
      toast.error("Resulting total cannot be negative.");
      setLoading(false);
      return;
    }

    const state = await manualModifyOutreachHours(
      userData.user,
      signedAdjustment
    );

    switch (state) {
      case BaseStates.SUCCESS:
        toast.success(
          `${displayName} now has ${formatMinutes(projectedTotal)}`
        );
        setOpen(false);
        refreshFunc?.();
        break;

      case BaseStates.ERROR:
      default:
        toast.error(`Failed to update ${displayName}'s hours`);
        break;
    }

    setLoading(false);
  };

  const quickAdjustments = [15, 30, 60, 90];

  const handleQuickAdd = (minutes: number) => {
    setMode("add");
    setAdjustment(minutes);
  };

  const handleQuickSubtract = (minutes: number) => {
    setMode("subtract");
    setAdjustment(minutes);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/** display current user formatted hours */}
            <p className="text-xl">Current Logged Time:</p>
            <p className="g text-xl text-muted-foreground">
              {formatMinutes(userData.outreach_minutes || 0)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant={mode === "add" ? "default" : "outline"}
                onClick={() => setMode("add")}
                aria-label="Add minutes">
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant={mode === "subtract" ? "default" : "outline"}
                onClick={() => setMode("subtract")}
                aria-label="Subtract minutes">
                <Minus className="h-4 w-4" />
              </Button>
              <Label className="text-sm text-muted-foreground">
                {mode === "add" ? "Adding minutes" : "Removing minutes"}
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minutes-delta">Minutes</Label>
              <Input
                id="minutes-delta"
                type="number"
                value={adjustment}
                min={0}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (Number.isFinite(value) && value >= 0) {
                    setAdjustment(value);
                  }
                }}
              />
              <p className="text-sm text-muted-foreground">
                Resulting total: {formatMinutes(projectedTotal)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickAdjustments.map((minutes) => (
                <Button
                  key={`add-${minutes}`}
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickAdd(minutes)}>
                  +{formatMinutes(minutes)}
                </Button>
              ))}
              {quickAdjustments.map((minutes) => (
                <Button
                  key={`subtract-${minutes}`}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickSubtract(minutes)}>
                  -{formatMinutes(minutes)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
