"use client";

import { useMemo, useState, Dispatch, SetStateAction } from "react";
import { formatMinutes, getBadgeStatusStyles } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AdjustHoursDialog from "./AdjustHoursDialog";
import ManageEventsSheet from "@/app/outreach/manage/ManageEventsSheet";
import type { ActivitySummary, UserData } from "@/lib/types/db";
import { UserInfo } from "@/components/UserInfo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchActivitySummariesPaginated,
  type ActivitySortKey,
  type ActivitySortDirection
} from "@/lib/db/activity";
import { useIsMobile } from "@/hooks/use-mobile";
import { OUTREACH } from "@/lib/types/queryKeys";

type TableHeadConfig = {
  key: string;
  name: string;
  descending: string;
  ascending: string;
  noSort: string;
  isSortable: boolean;
};

const SortedTableHeads: readonly TableHeadConfig[] = [
  {
    key: "user",
    name: "User",
    descending: "Z > A",
    ascending: "A > Z",
    noSort: "",
    isSortable: true
  },
  {
    key: "outreachMinutes",
    name: "Logged Time",
    ascending: "Low > High",
    descending: "High > Low",
    noSort: "",
    isSortable: true
  },
  {
    key: "events",
    name: "Events Participated In",
    ascending: "Low > High",
    descending: "High > Low",
    noSort: "",
    isSortable: true
  }
];

type SortKey = (typeof SortedTableHeads)[number]["key"];
type SortDirection = "ascending" | "descending";
type SortConfig = {
  key: SortKey;
  direction: SortDirection;
};

const SORT_KEY_TO_COLUMN: Record<SortKey, ActivitySortKey> = {
  user: "user_name",
  outreachMinutes: "user_credited_minutes",
  events: "session_count"
};

const PAGE_SIZE = 15;

type PaginatedResponse = NonNullable<
  Awaited<ReturnType<typeof fetchActivitySummariesPaginated>>
>;

const getUserSortValue = (user: ActivitySummary): string =>
  user.user_name?.toLowerCase() || "";

function sortUsersList(users: ActivitySummary[], config: SortConfig) {
  const multiplier = config.direction === "ascending" ? 1 : -1;

  const fallbackIdCompare = (a: ActivitySummary, b: ActivitySummary) =>
    (a.user_id || "").localeCompare(b.user_id || "");

  return [...users].sort((a, b) => {
    switch (config.key) {
      case "user": {
        const diff =
          getUserSortValue(a).localeCompare(getUserSortValue(b)) * multiplier;
        return diff !== 0 ? diff : fallbackIdCompare(a, b);
      }
      case "outreachMinutes": {
        const diff =
          ((a.user_credited_minutes ?? 0) - (b.user_credited_minutes ?? 0)) *
          multiplier;
        return diff !== 0 ? diff : fallbackIdCompare(a, b);
      }
      case "events": {
        const diff =
          ((a.session_count ?? 0) - (b.session_count ?? 0)) * multiplier;
        return diff !== 0 ? diff : fallbackIdCompare(a, b);
      }
      default:
        return fallbackIdCompare(a, b);
    }
  });
}

function LoadingState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      {message}
    </div>
  );
}

function LoadMoreButton({
  isLoadingMore,
  hasMore,
  onLoadMore
}: {
  isLoadingMore: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}) {
  if (!hasMore || !onLoadMore) return null;
  return (
    <div className="flex justify-center py-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onLoadMore}
        disabled={isLoadingMore}>
        {isLoadingMore ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
}

export function OutreachTable({
  canManage,
  outreachMinutesThreshold
}: {
  canManage: boolean;
  outreachMinutesThreshold: number;
}) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "outreachMinutes",
    direction: "descending"
  });
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery<PaginatedResponse, Error>({
    queryKey: [...OUTREACH.LEADERBOARD, sortConfig.key, sortConfig.direction],
    queryFn: async ({ pageParam = 1 }) => {
      const pageNum = typeof pageParam === "number" ? pageParam : 1;
      const sortColumn = SORT_KEY_TO_COLUMN[sortConfig.key];
      const sortDirection: ActivitySortDirection =
        sortConfig.direction === "ascending" ? "asc" : "desc";

      const result = await fetchActivitySummariesPaginated(
        pageNum,
        PAGE_SIZE,
        ["outreach"],
        sortColumn,
        sortDirection
      );

      if (!result) {
        throw new Error("Failed to load outreach data");
      }

      return result;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.items?.length) return undefined;
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false
  });
  const isMobile = useIsMobile();

  const allUsers = useMemo(() => {
    if (!data?.pages?.length) return [];

    const seen = new Set<string>();
    const merged: ActivitySummary[] = [];

    data.pages.forEach((page) => {
      page.items.forEach((item) => {
        const id = item.user_id ?? "";
        if (id && seen.has(id)) return;
        if (id) seen.add(id);
        merged.push(item);
      });
    });

    return merged;
  }, [data]);

  const sortedUsers = useMemo(
    () => sortUsersList(allUsers, sortConfig),
    [allUsers, sortConfig]
  );

  const renderLoadMore = () => (
    <LoadMoreButton
      isLoadingMore={Boolean(isFetchingNextPage)}
      hasMore={hasNextPage}
      onLoadMore={() => fetchNextPage()}
    />
  );

  if (isMobile) {
    return (
      <MobileComponent
        {...{
          sortConfig,
          setSortConfig,
          isLoading,
          allUsers,
          sortedUsers,
          isFetchingNextPage,
          outreachMinutesThreshold,
          canManage,
          renderLoadMore
        }}
      />
    );
  }

  return (
    <DesktopComponent
      {...{
        sortConfig,
        setSortConfig,
        isLoading,
        allUsers,
        sortedUsers,
        isFetchingNextPage,
        outreachMinutesThreshold,
        canManage,
        renderLoadMore
      }}
    />
  );
}

type DesktopProps = {
  sortConfig: SortConfig;
  setSortConfig: Dispatch<SetStateAction<SortConfig>>;
  isLoading: boolean;
  allUsers: ActivitySummary[];
  sortedUsers: ActivitySummary[];
  isFetchingNextPage: boolean;
  outreachMinutesThreshold: number;
  canManage: boolean;
  renderLoadMore: () => React.ReactNode;
};

function DesktopComponent({
  sortConfig,
  setSortConfig,
  isLoading,
  allUsers,
  sortedUsers,
  isFetchingNextPage,
  outreachMinutesThreshold,
  canManage,
  renderLoadMore
}: DesktopProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[780px]">
          <TableHeader>
            <TableRow>
              {SortedTableHeads.map((head) => (
                <TableHead
                  key={head.key}
                  className={`cursor-pointer relative ${
                    head.key === "user"
                      ? "min-w-[18rem]"
                      : head.key === "outreachMinutes"
                      ? "min-w-[10rem]"
                      : "min-w-[12rem]"
                  }`}
                  onClick={() => {
                    setSortConfig((prev) => {
                      const newDirection =
                        prev.key === head.key && prev.direction === "ascending"
                          ? "descending"
                          : "ascending";
                      return { key: head.key, direction: newDirection };
                    });
                  }}>
                  <div className="flex items-center justify-baseline gap-5">
                    <span>
                      {head.name}
                      {head.key === "user" && (
                        <span className="text-muted-foreground">
                          {" "}
                          ({allUsers.length})
                        </span>
                      )}
                    </span>
                    <div className="w-20">
                      {sortConfig.key === head.key && (
                        <Badge className="text-xs">
                          {sortConfig.direction === "ascending"
                            ? head.ascending
                            : head.descending}
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableHead>
              ))}
              {canManage && (
                <TableHead className="min-w-[8rem] text-right">
                  Manage
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={canManage ? 5 : 4}
                  className="text-center py-8">
                  <LoadingState message="Loading members..." />
                </TableCell>
              </TableRow>
            ) : allUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={canManage ? 5 : 4}
                  className="text-center py-8">
                  No user data found
                </TableCell>
              </TableRow>
            ) : (
              sortedUsers.map((userData) => (
                <TableRow key={userData.user_id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 min-w-0">
                      <UserInfo
                        userId={userData.user_id || ""}
                        withoutEmail={true}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getBadgeStatusStyles(
                        userData.user_credited_minutes ?? 0,
                        outreachMinutesThreshold,
                        outreachMinutesThreshold - 60 * 3
                      )} text-sm md:text-base`}>
                      {formatMinutes(userData.user_credited_minutes ?? 0)}
                    </Badge>
                  </TableCell>
                  <TableCell>{userData.session_count ?? 0}</TableCell>
                  {canManage && (
                    <TableCell className="text-right">
                      <AdjustHoursDialog userData={userData} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <LoadingState message="Loading more..." />
        </div>
      )}
      {renderLoadMore()}
    </div>
  );
}

type MobileProps = {
  sortConfig: SortConfig;
  setSortConfig: Dispatch<SetStateAction<SortConfig>>;
  isLoading: boolean;
  allUsers: ActivitySummary[];
  sortedUsers: ActivitySummary[];
  isFetchingNextPage: boolean;
  outreachMinutesThreshold: number;
  canManage: boolean;
  renderLoadMore: () => React.ReactNode;
};

function MobileComponent({
  sortConfig,
  setSortConfig,
  isLoading,
  allUsers,
  sortedUsers,
  isFetchingNextPage,
  outreachMinutesThreshold,
  canManage,
  renderLoadMore
}: MobileProps) {
  return (
    <div className="w-full">
      <div className="space-y-3">
        <div className="flex gap-2 p-2 bg-muted/50 rounded-lg">
          <Button
            variant={sortConfig.key === "user" ? "default" : "outline"}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              setSortConfig((prev) => ({
                key: "user",
                direction:
                  prev.key === "user" && prev.direction === "ascending"
                    ? "descending"
                    : "ascending"
              }));
            }}>
            Name{" "}
            {sortConfig.key === "user" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </Button>
          <Button
            variant={
              sortConfig.key === "outreachMinutes" ? "default" : "outline"
            }
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              setSortConfig((prev) => ({
                key: "outreachMinutes",
                direction:
                  prev.key === "outreachMinutes" &&
                  prev.direction === "ascending"
                    ? "descending"
                    : "ascending"
              }));
            }}>
            Hours{" "}
            {sortConfig.key === "outreachMinutes" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <LoadingState message="Loading members..." />
          </div>
        ) : allUsers.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No user data found
          </div>
        ) : (
          sortedUsers.map((userData) => (
            <Card key={userData.user_id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <UserInfo
                      user={userData as unknown as UserData}
                      userId={userData.user_id!}
                      withoutEmail={true}
                    />
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <Badge
                      className={`${getBadgeStatusStyles(
                        userData.user_credited_minutes ?? 0,
                        outreachMinutesThreshold,
                        outreachMinutesThreshold - 60 * 3
                      )} text-sm`}>
                      {formatMinutes(userData.user_credited_minutes ?? 0)}
                    </Badge>
                    {canManage && <AdjustHoursDialog userData={userData} />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {isFetchingNextPage && (
          <div className="text-center py-4">
            <LoadingState message="Loading more..." />
          </div>
        )}
        {renderLoadMore()}
      </div>
    </div>
  );
}
