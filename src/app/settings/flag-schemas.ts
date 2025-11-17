import { z } from "zod";

export const flagRoleOptions = ["admin", "member", "guest"] as const;

const paramEvalMethods = ["OR", "AND"] as const;
const percentEvalMethods = ["ID", "RANDOM"] as const;

export const featureFlagObjectSchema = z.object({
  enabled: z.boolean(),
  percent: z
    .number()
    .min(0, "Percent must be at least 0.")
    .max(1, "Percent cannot be greater than 1.")
    .optional(),
  roles: z.array(z.enum(flagRoleOptions)).optional(),
  value: z.union([z.string(), z.number()]).optional(),
  paramEvalMethod: z.enum(paramEvalMethods).default("AND"),
  percentEvalMethod: z.enum(percentEvalMethods).default("RANDOM")
});

export const featureFlagSchema = z.union([
  z.boolean(),
  featureFlagObjectSchema
]);

export const updateFlagPayloadSchema = z.object({
  id: z.string().min(1, "Flag id is required."),
  name: z
    .string()
    .min(1, "Flag name is required.")
    .max(100, "Flag name must be 100 characters or less."),
  flag: featureFlagSchema
});

export type UpdateFlagPayload = z.infer<typeof updateFlagPayloadSchema>;

export const objectFlagFormSchema = z
  .object({
    enabled: z.boolean(),
    percent: z.string().optional(),
    roles: z.array(z.enum(flagRoleOptions)).optional(),
    value: z.string().optional(),
    paramEvalMethod: z.enum(paramEvalMethods),
    percentEvalMethod: z.enum(percentEvalMethods)
  })
  .superRefine((data, ctx) => {
    if (data.percent && data.percent.trim().length > 0) {
      const parsed = Number(data.percent);
      if (Number.isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percent"],
          message: "Percent must be a number between 0 and 1."
        });
      } else if (parsed < 0 || parsed > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["percent"],
          message: "Percent must be between 0 and 1."
        });
      }
    }

    if (data.value && data.value.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: "Value cannot be empty whitespace."
      });
    }
  });

export type ObjectFlagFormValues = z.infer<typeof objectFlagFormSchema>;
