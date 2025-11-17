// React
import { useMemo, useState } from "react";

import { toast } from "sonner";
import { ErrorToString } from "@/lib/types/states";
import { formatMinutes } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import type { OutreachEvent, OutreachSession } from "@/lib/types/supabase";
import { deleteSession } from "@/lib/db/outreach";
import { logger } from "@/lib/logger";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Clock, Trash2 } from "lucide-react";

interface EventSessionsTableProps {
  event: OutreachEvent;
  sessions: OutreachSession[];
  onSessionDeleted: () => void;
  compact?: boolean;
}

export default function EventSessionsTable({
  event,
  sessions,
  onSessionDeleted,
  compact = false
}: EventSessionsTableProps) {
  const isMobile = useIsMobile();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteSession = async (sessionId: string) => {
    setDeletingId(sessionId);
    try {
      const [error] = await deleteSession(sessionId);

      if (error) {
        throw new Error(error);
      }

      logger.warn(
        { sessionId, eventId: event.id },
        "Session deleted from table"
      );
      toast.success("Session deleted successfully");
      onSessionDeleted();
    } catch (error: any) {
      logger.error(
        { sessionId, eventId: event.id, err: error?.message },
        "Failed to delete session"
      );
      toast.error("Failed to delete session");
    } finally {
      setDeletingId(null);
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No hours logged for this event yet</p>
      </div>
    );
  }

  const containerClasses = compact
    ? "flex flex-col gap-3 max-h-[60vh] overflow-y-auto"
    : "flex flex-col gap-3 h-full overflow-scroll";

  const tableWrapperClasses = compact
    ? "border rounded-md overflow-x-hidden"
    : "overflow-y-auto border rounded-md overflow-x-hidden";

  return (
    <div className={containerClasses}>
      <h4 className="font-semibold">Logged Hours</h4>
      <div className={tableWrapperClasses}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Time</TableHead>
              {!isMobile && <TableHead>Date Logged</TableHead>}
              {!isMobile && (
                <TableHead className="w-[100px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.expand?.user?.avatar ?? undefined}
                      />
                      <AvatarFallback>
                        {session.expand?.user?.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {session.expand?.user?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {session.expand?.user?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {formatMinutes(session.minutes)}
                  </Badge>
                </TableCell>
                {!isMobile && (
                  <TableCell>
                    {new Date(session.created).toLocaleDateString()}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                      disabled={deletingId === session.id}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
