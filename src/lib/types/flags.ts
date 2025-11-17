export const FLAG_NAME_VALUES = [
  "scouting_page_enabled",
  "outreach_page_enabled",
  "advanced_reporting",
  "outreach_minutes_cutoff",
  "pb_cookie_expiration_days",
  "pb_cookie_name",
  "flag_ttl_ms"
] as const;

export type FlagNames = string;

export type FeatureFlag =
  | boolean
  | {
      enabled: boolean;
      percent?: number;
      roles?: string[];
      value?: string | number;
      paramEvalMethod?: "OR" | "AND";
      percentEvalMethod?: "ID" | "RANDOM";
    };

export type FlagParams = Partial<{
  userRole: string;
  userId: string;
}>;

export type EvalRet = {
  enabled: boolean;
  value: Extract<FeatureFlag, object>["value"];
  exists: boolean;
};
