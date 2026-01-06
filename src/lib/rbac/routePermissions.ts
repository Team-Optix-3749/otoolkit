"use server";

import { logger } from "../logger";
import {
  RoutePermissionsMap,
  RoutePermissionsSchema,
  UserRole
} from "../types/rbac";
import { isValidPathname } from "../utils";
import { hasPermission } from "./rbac";

const DEFAULT_ROUTE_PERMISSIONS = {
  "/outreach": {
    permissions: ["activity_sessions:manage", "activity_sessions:view:all"],
    type: "or"
  },
  "/outreach/manage": "activity_sessions:manage",
  "/settings": "settings:view:own"
} satisfies RoutePermissionsMap;

let routePermissions = RoutePermissionsSchema.parse(DEFAULT_ROUTE_PERMISSIONS);

export async function setRoutePermissions(newPermissions: Record<string, any>) {
  const parsed = RoutePermissionsSchema.safeParse(newPermissions);

  if (parsed.success) {
    routePermissions = parsed.data;
  } else {
    logger.error(
      parsed,
      "[RBAC - Route Permissions] Invalid route permissions object provided. Schema left unchanged."
    );
  }
}

export async function checkPermissionsForRoute(
  route: string,
  role: UserRole
): Promise<boolean> {
  if (!route || !isValidPathname(route)) {
    logger.error(
      { route },
      "[RBAC - Route Permissions] Invalid route provided to checkPermissionsForRoute"
    );
    return false;
  }

  if (route in routePermissions === false) {
    return true;
  }

  const permissionRule = routePermissions[route];

  if (typeof permissionRule === "string") {
    const hasPerm = await hasPermission(role, permissionRule);
    return hasPerm;
  }

  const { permissions, type } = permissionRule;

  const permissionsMap = await Promise.all(
    permissions.map((permission) => hasPermission(role, permission))
  );

  let ret = false;

  if (type === "and") {
    ret = permissionsMap.every(Boolean);
  } else if (type === "or") {
    ret = permissionsMap.some(Boolean);
  } else {
    logger.error(
      { permissionRule },
      "[RBAC - Route Permissions] Invalid permission rule type. Expected 'and' or 'or'."
    );
  }

  console.log(permissionsMap);

  return ret;
}
