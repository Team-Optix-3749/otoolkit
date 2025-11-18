import type { OutreachEvent, OutreachSession } from "@/lib/types/models";
import { Calendar, Clock, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LogHoursDialog from "./LogHoursDialog";
import EventSessionsTable from "./EventSessionsTable";

interface EventDetailsProps {
  selectedEvent: OutreachEvent | null;
  sessions: OutreachSession[] | undefined;
  onHoursLogged: () => void;
  onSessionDeleted: () => void;
  variant?: "page" | "sheet";
}

export default function EventDetails({
  selectedEvent,
  sessions,
  onHoursLogged,
  onSessionDeleted,
  variant = "page"
}: EventDetailsProps) {
  const isSheet = variant === "sheet";

  const containerClass = isSheet
    ? "flex flex-col border rounded-xl bg-card text-card-foreground gap-4 p-5 max-h-[70vh] overflow-y-auto"
    : "flex flex-col h-[calc(100vh-130px)] bg-card rounded-xl text-card-foreground gap-6 border py-6";

  return (
    <div className={containerClass}>
      <div className="flex gap-2 px-5">
        <Users className="h-5 w-5" />
        <strong>Event Details</strong>
      </div>
      <div className={`flex-1 flex flex-col ${isSheet ? "px-5" : "p-5"}`}>
        {selectedEvent ? (
          <div className="space-y-6 pb-5 flex flex-col flex-1 h-full">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {selectedEvent.name}
              </h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedEvent.date
                    ? new Date(selectedEvent.date).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {sessions
                    ? `${sessions.reduce(
                        (sum, session) => sum + session.minutes,
                        0
                      )} minutes total`
                    : "Loading..."}
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <LogHoursDialog
                event={selectedEvent}
                onHoursLogged={onHoursLogged}
              />
            </div>

            {sessions && (
              <EventSessionsTable
                event={selectedEvent}
                sessions={sessions}
                onSessionDeleted={onSessionDeleted}
                compact={isSheet}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select an event to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
