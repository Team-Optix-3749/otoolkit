"use client";

// Lib & React
import React, { useState, useEffect } from "react";
// Data
import { fetchUserSessionEventDates } from "@/lib/db/outreach";
// Types
import { type ActivityDataPoint } from "./types"; // new local type barrel (to be created if needed)

const MONTHS: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
};

interface OutreachActivityGraphProps {
  id: string;
}

export default function ActivityGraph({ id }: OutreachActivityGraphProps) {
  const [timestamps, setTimestamps] = useState<string[]>([]);
  const [activityData, setActivityData] = useState<ActivityDataPoint[]>([]);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const dates = await fetchUserSessionEventDates(id);
        if (!cancelled) setTimestamps(dates);
      } catch (err) {
        console.error("Failed to fetch outreach sessions for user", err);
        if (!cancelled) setTimestamps([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!timestamps.length) return;
    const counts: Record<string, number> = {};
    for (const ts of timestamps) {
      const date = new Date(ts);
      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", { month: "short" });
      const key = `${year} ${month}`;
      counts[key] = (counts[key] || 0) + 1;
    }
    const formatted = Object.entries(counts)
      .map(([key, events]) => {
        const [year, month] = key.split(" ");
        return { month, year: parseInt(year), events } as ActivityDataPoint;
      })
      .sort((a, b) =>
        a.year === b.year ? MONTHS[a.month] - MONTHS[b.month] : a.year - b.year
      );
    setActivityData(formatted);
  }, [timestamps]);

  const totalSessions = timestamps.length;
  const avgSessionsPerMonth = activityData.length
    ? (
        activityData.reduce((acc, curr) => acc + curr.events, 0) /
        activityData.length
      ).toFixed(1)
    : 0;
  const peakMonth = activityData.length
    ? activityData.toSorted((a, b) => b.events - a.events)[0].month
    : "?";

  return (
    <div className="size-full flex flex-col bg-transparent">
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1">Activity Timeline</h3>
      </div>
      {/* Chart lazily imported only when data exists to avoid layout shift */}
      {/* Using dynamic import could be added later if bundle splitting desired */}
      <div className="flex-1 min-h-[160px]">
        {/* Simple svg fallback if no data */}
        {!activityData.length ? (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
            No activity yet
          </div>
        ) : (
          /* Keeping recharts inline to avoid additional refactor scope */
          <svg className="w-full h-full">
            {activityData.map((d, i) => {
              const max = Math.max(...activityData.map((x) => x.events));
              const barWidth = 100 / activityData.length;
              const heightPct = (d.events / max) * 90;
              return (
                <g
                  key={`${d.year}-${d.month}`}
                  transform={`translate(${i * barWidth}%,0)`}>
                  <rect
                    x="8%"
                    y={`${100 - heightPct}%`}
                    width="60%"
                    height={`${heightPct}%`}
                    rx={2}
                    className="fill-primary/60"
                  />
                  <text
                    x="38%"
                    y="98%"
                    textAnchor="middle"
                    className="fill-current text-[8px] font-medium">
                    {d.month}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4 text-center border-t pt-4 mt-4">
        <div>
          <div className="text-lg font-bold">{totalSessions}</div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </div>
        <div>
          <div className="text-lg font-bold">{avgSessionsPerMonth}</div>
          <div className="text-xs text-muted-foreground">Avg/Month</div>
        </div>
        <div>
          <div className="text-lg font-bold">{peakMonth}</div>
          <div className="text-xs text-muted-foreground">Peak Month</div>
        </div>
      </div>
    </div>
  );
}
