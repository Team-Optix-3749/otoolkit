import { syncRoutePermissionsFromFeatureFlag } from "./lib/rbac/routePermissions";

export async function register() {
  // Sync route permissions from PostHog feature flag on server startup
  await syncRoutePermissionsFromFeatureFlag();
}
