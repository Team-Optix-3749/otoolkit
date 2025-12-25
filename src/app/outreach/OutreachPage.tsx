"use client";

import { useEffect, useCallback, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { useNavbar } from "@/hooks/useNavbar";
import { useIsMounted } from "@/hooks/useIsHydrated";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/hooks/useUser";
import { hasPermission } from "@/lib/rbac/rbac";

import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader";
import { OutreachTable } from "./components/OutreachTable";
import { OutreachHeader } from "./components/OutreachHeader";
import { UserProgressCard } from "./components/UserProgressCard";
import { ActivityOverviewCard } from "./components/ActivityOverviewCard";

import type { FullUserData } from "@/lib/types/db";
import { fetchActivitySummariesPaginated } from "@/lib/db/activity";
import { getProfileImageUrl } from "@/lib/supabase/supabase";
import { logger } from "@/lib/logger";

const PAGE_SIZE = 15;

type PaginatedResponse = NonNullable<
  Awaited<ReturnType<typeof fetchActivitySummariesPaginated>>
>;

type Props = {
  outreachMinutesCutoff: number;
};

const fetcher = async (url: string): Promise<PaginatedResponse> => {
  const [, page] = url.split("?page=");
  const pageNum = parseInt(page) || 1;
  const data = await fetchActivitySummariesPaginated(
    pageNum,
    PAGE_SIZE,
    ["outreach"],
    "user_credited_minutes",
    "desc"
  );

  if (!data) {
    throw new Error("Failed to load outreach data");
  }

  return data;
};

const getKey = (
  pageIndex: number,
  previousPageData: PaginatedResponse | null
) => {
  if (previousPageData && !previousPageData.items.length) return null;
  return `?page=${pageIndex + 1}`;
};

export default function OutreachPage({ outreachMinutesCutoff }: Props) {
  const { setDefaultExpanded, resetNavbar } = useNavbar();
  const isHydrated = useIsMounted();
  const isMobile = useIsMobile();
  const { user: authUser } = useUser();

  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<PaginatedResponse>(getKey, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: true
    });

  const allUsers = data
    ? data.flatMap((page) =>
        page.items.map((item) => ({
          ...item,
          outreach_minutes: item.user_credited_minutes ?? 0
        }))
      )
    : [];
  const currentUserData = authUser;
  const activityUserId = authUser?.id ?? null;
  const [canManage, setCanManage] = useState(false);
  const profileName = currentUserData?.user_name || "Unknown";
  const profileEmail = currentUserData?.email || "No email";
  const profileAvatar = getProfileImageUrl(currentUserData);
  const totalItems = data?.[0]?.totalItems || 0;
  const hasMore = allUsers.length < totalItems;
  const isLoading = !data && !error;
  const isLoadingMore = isValidating && data && data.length > 0;

  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      setSize(size + 1);
    }
  }, [hasMore, isLoadingMore, setSize, size]);

  const refetchData = useCallback(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    let active = true;
    if (!activityUserId) return;

    return () => {
      active = false;
    };
  }, [activityUserId]);

  useEffect(() => {
    const role = currentUserData?.user_role ?? "guest";
    let active = true;

    (async () => {
      const allowed = await hasPermission(role, "outreach:manage:all");
      if (active) setCanManage(allowed);
    })();

    return () => {
      active = false;
    };
  }, [currentUserData?.user_role]);

  useEffect(() => {
    setDefaultExpanded(false);

    return () => {
      resetNavbar();
    };
  }, [setDefaultExpanded, resetNavbar]);
  if (!isHydrated)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (error) {
    logger.error("Error loading outreach data:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Data
          </h2>
          <p className="text-muted-foreground">
            Failed to load outreach data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col gap-3 px-3 sm:px-4 pt-3 pb-24">
      <OutreachHeader canManage={canManage} />

      <div className="grid grid-cols-1 md:grid-cols-[22rem_1fr] gap-3 md:gap-4">
        <UserProgressCard
          user={(currentUserData as FullUserData) ?? null}
          profileName={profileName}
          profileEmail={profileEmail}
          profileAvatar={profileAvatar}
          outreachMinutesCutoff={outreachMinutesCutoff}
        />
        {!isMobile && <ActivityOverviewCard userId={activityUserId} />}
      </div>

      <Separator className="w-full" />

      <div className="flex-1 min-h-0 overflow-y-auto">
        <OutreachTable
          allUsers={allUsers}
          canManage={canManage}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore || false}
          outreachMinutesCutoff={outreachMinutesCutoff}
          isMobile={isMobile}
          refetchData={refetchData}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}
