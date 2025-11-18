"use client";

import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { fetchEvents, fetchSessionsForEvent } from "@/lib/db/outreach";
import type { OutreachEvent, OutreachSession } from "@/lib/types/models";

import { useIsMobile } from "@/hooks/use-mobile";

import Loader from "@/components/Loader";
import CreateEventDialog from "./CreateEventDialog";
import EventsList from "./EventsList";
import EventDetails from "./EventDetails";

import { Calendar } from "lucide-react";

type ManageEventsContentProps = {
  variant?: "page" | "sheet";
};

export default function ManageEventsContent({
  variant = "page"
}: ManageEventsContentProps) {
  const isMobile = useIsMobile();
  const isSheet = variant === "sheet";

  const [selectedEvent, setSelectedEvent] = useState<OutreachEvent | null>(
    null
  );

  const eventsFetcher = useCallback(async (): Promise<OutreachEvent[]> => {
    const [error, data] = await fetchEvents();

    if (error || !data) {
      throw new Error(error ?? "Failed to load events");
    }

    return data;
  }, []);

  const {
    data: events,
    error: eventsError,
    mutate: mutateEvents
  } = useSWR("outreach-events", eventsFetcher);

  const sessionsFetcher = useCallback(async (): Promise<OutreachSession[]> => {
    if (!selectedEvent?.name) return [];

    const [error, data] = await fetchSessionsForEvent(selectedEvent.name);

    if (error || !data) {
      throw new Error(error ?? "Failed to load sessions");
    }

    return data;
  }, [selectedEvent]);

  const { data: sessions, mutate: mutateSessions } = useSWR(
    selectedEvent ? `outreach-sessions-${selectedEvent.id}` : null,
    sessionsFetcher
  );

  const handleEventCreated = useCallback(() => mutateEvents(), [mutateEvents]);
  const handleHoursLogged = useCallback(
    () => mutateSessions(),
    [mutateSessions]
  );
  const handleSessionDeleted = useCallback(
    () => mutateSessions(),
    [mutateSessions]
  );
  const handleEventDeleted = useCallback(() => {
    mutateEvents();
    setSelectedEvent(null);
  }, [mutateEvents]);

  const handleEventSelect = useCallback((event: OutreachEvent) => {
    setSelectedEvent(event);
  }, []);

  const layoutClassName = useMemo(() => {
    if (isSheet) {
      return "flex flex-col xl:flex-row gap-4";
    }

    return `grid lg:grid-cols-2 gap-5 ${isMobile ? "grid-cols-1 mb-20" : ""}`;
  }, [isSheet, isMobile]);

  if (eventsError) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Events
          </h2>
          <p className="text-muted-foreground">
            Failed to load events. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        isSheet ? "flex flex-col gap-5 max-h-[80vh]" : "p-4 flex flex-col"
      }>
      <div className={isSheet ? "space-y-3" : "mb-6"}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className={isSheet ? "h-4 w-4" : "h-6 w-6"} />
              <h2
                className={
                  isSheet ? "text-xl font-semibold" : "text-3xl font-bold"
                }>
                Manage Events
              </h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Create events and log outreach sessions.
            </p>
          </div>
          <CreateEventDialog onEventCreated={handleEventCreated} />
        </div>
      </div>

      {!events ? (
        <div className="flex items-center justify-center py-12">
          <Loader />
        </div>
      ) : (
        <div className={layoutClassName}>
          <EventsList
            events={events}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
            onEventDeleted={handleEventDeleted}
            onHoursLogged={handleHoursLogged}
            isMobile={isMobile}
            variant={variant}
          />
          <EventDetails
            selectedEvent={selectedEvent}
            sessions={sessions || []}
            onHoursLogged={handleHoursLogged}
            onSessionDeleted={handleSessionDeleted}
            variant={variant}
          />
        </div>
      )}
    </div>
  );
}
