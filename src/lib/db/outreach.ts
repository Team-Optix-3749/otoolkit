import { pb } from "../pbaseClient";
import type { t_pb_OutreachEvent, t_pb_OutreachSession } from "../types";

export async function fetchEvents() {
  return await pb.collection("OutreachEvents").getFullList<t_pb_OutreachEvent>({
    sort: "-created"
  });
}

export async function createEvent(data: { name: string; date: string }) {
  return await pb.collection("OutreachEvents").create(data);
}

export async function updateEvent(
  id: string,
  data: Partial<Pick<t_pb_OutreachEvent, "name" | "date">>
) {
  return await pb.collection("OutreachEvents").update(id, data);
}

export async function deleteEvent(id: string) {
  return await pb.collection("OutreachEvents").delete(id);
}

export async function fetchSessionsForEvent(eventId: string) {
  return await pb
    .collection("OutreachSessions")
    .getFullList<t_pb_OutreachSession>({
      filter: `event = "${eventId}"`,
      expand: "user",
      sort: "-created"
    });
}

export async function deleteSession(id: string) {
  return await pb.collection("OutreachSessions").delete(id);
}

export async function createSessionsBulk(
  sessions: { userId: string; eventId: string; minutes: number }[]
) {
  return await Promise.all(
    sessions.map((s) =>
      pb.collection("OutreachSessions").create(
        {
          user: s.userId,
          event: s.eventId,
          minutes: s.minutes
        },
        { requestKey: null }
      )
    )
  );
}

export async function fetchUserSessionEventDates(userId: string) {
  const results = await pb
    .collection("OutreachSessions")
    .getFullList<t_pb_OutreachSession>({
      filter: `user="${userId}"`,
      expand: "event"
    });
  return results.map((r) => r.expand?.event?.date).filter(Boolean) as string[];
}
