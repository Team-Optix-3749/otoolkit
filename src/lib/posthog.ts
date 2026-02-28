import { PostHog } from "posthog-node";
import { assertEnv } from "./utils";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const featureFlagKey = process.env.POSTHOG_FEATURE_FLAG_KEY;
const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

// Require project key in production; use stub (non-op) in development
const client = posthogKey
  ? new PostHog(posthogKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      ...(featureFlagKey && { personalApiKey: featureFlagKey }),
      featureFlagsPollingInterval: 180000
    })
  : isProduction
    ? (() => {
        throw new Error("PostHog key is required in production. Set NEXT_PUBLIC_POSTHOG_KEY environment variable.");
      })()
    : ({
        getRemoteConfigPayload: async (_key: string) => undefined,
        flush: async () => {}
      } as Pick<PostHog, "getRemoteConfigPayload" | "flush">);

export default client;