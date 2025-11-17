"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition
} from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { FeatureFlag, FlagNames } from "@/lib/types/flags";

import {
  objectFlagFormSchema,
  type ObjectFlagFormValues,
  flagRoleOptions
} from "./flag-schemas";
import { updateFlagAction, type FlagRecord } from "./actions";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface FlagsTabProps {
  initialFlags: FlagRecord[];
}

type RoleOption = (typeof flagRoleOptions)[number];

export default function FlagsTab({ initialFlags }: FlagsTabProps) {
  const [flags, setFlags] = useState(initialFlags);

  useEffect(() => {
    setFlags(initialFlags);
  }, [initialFlags]);

  const handleFlagUpdated = useCallback((updated: FlagRecord) => {
    setFlags((prev) =>
      prev.map((flag) => (flag.id === updated.id ? updated : flag))
    );
  }, []);

  const sortedFlags = useMemo(
    () => [...flags].sort((a, b) => a.name.localeCompare(b.name)),
    [flags]
  );

  if (sortedFlags.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">
        No feature flags are configured yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedFlags.map((flag) => (
        <FlagCard
          key={flag.id}
          record={flag}
          onFlagUpdated={handleFlagUpdated}
        />
      ))}
    </div>
  );
}

interface FlagCardProps {
  record: FlagRecord;
  onFlagUpdated: (flag: FlagRecord) => void;
}

function FlagCard({ record, onFlagUpdated }: FlagCardProps) {
  const isBooleanFlag = typeof record.flag === "boolean";

  return isBooleanFlag ? (
    <BooleanFlagCard record={record} onFlagUpdated={onFlagUpdated} />
  ) : (
    <ObjectFlagCard record={record} onFlagUpdated={onFlagUpdated} />
  );
}

function BooleanFlagCard({ record, onFlagUpdated }: FlagCardProps) {
  const [checked, setChecked] = useState(record.flag as boolean);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setChecked(record.flag as boolean);
  }, [record.flag]);

  const handleToggle = useCallback(
    (nextValue: boolean) => {
      const previousValue = checked;
      setChecked(nextValue);

      startTransition(async () => {
        const result = await updateFlagAction({
          id: record.id,
          name: record.name,
          flag: nextValue
        });

        if (!result.success) {
          setChecked(previousValue);
          toast.error(result.error);
          return;
        }

        const updatedFlag = result.flag.flag as boolean;
        setChecked(updatedFlag);
        onFlagUpdated(result.flag);
        toast.success(`${formatFlagName(result.flag.name)} updated.`);
      });
    },
    [checked, onFlagUpdated, record.id, record.name]
  );

  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>{formatFlagName(record.name)}</CardTitle>
        <CardDescription>
          Toggle the flag on or off. Changes apply immediately.
        </CardDescription>
        <CardAction>
          <Badge variant="outline">Boolean</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Current state: {checked ? "Enabled" : "Disabled"}
          </p>
          <TimestampMeta created={record.created} updated={record.updated} />
        </div>
        <Switch
          checked={checked}
          onCheckedChange={handleToggle}
          disabled={isPending}
          aria-label={formatFlagName(record.name)}
        />
      </CardContent>
    </Card>
  );
}

function ObjectFlagCard({ record, onFlagUpdated }: FlagCardProps) {
  const extractedFlag = record.flag as Exclude<FeatureFlag, boolean>;
  const [isPending, startTransition] = useTransition();

  const form = useForm<ObjectFlagFormValues>({
    resolver: zodResolver(objectFlagFormSchema),
    defaultValues: buildDefaultFormValues(extractedFlag)
  });

  useEffect(() => {
    form.reset(buildDefaultFormValues(extractedFlag));
  }, [extractedFlag, form]);

  const onSubmit = form.handleSubmit((values) => {
    const normalized = formValuesToFeatureFlag(values);

    startTransition(async () => {
      const result = await updateFlagAction({
        id: record.id,
        name: record.name,
        flag: normalized
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      onFlagUpdated(result.flag);

      const updatedFlag = result.flag.flag as Exclude<FeatureFlag, boolean>;
      form.reset(buildDefaultFormValues(updatedFlag));
      toast.success(`${formatFlagName(result.flag.name)} updated.`);
    });
  });

  return (
    <Card className="gap-0">
      <CardHeader className="pb-4">
        <CardTitle>{formatFlagName(record.name)}</CardTitle>
        <CardDescription>
          Configure rollout percentage, role access, and custom values.
        </CardDescription>
        <CardAction>
          <Badge variant="outline">Configured</Badge>
        </CardAction>
      </CardHeader>
      <form onSubmit={onSubmit} className="flex flex-col gap-0">
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor={`${record.id}-enabled`}>Enabled</Label>
              <p className="text-sm text-muted-foreground">
                Only enabled flags are evaluated.
              </p>
            </div>
            <Switch
              id={`${record.id}-enabled`}
              checked={form.watch("enabled")}
              onCheckedChange={(value) =>
                form.setValue("enabled", value, { shouldDirty: true })
              }
              disabled={isPending}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${record.id}-percent`}>Rollout percent</Label>
              <Input
                id={`${record.id}-percent`}
                type="number"
                step="0.01"
                min="0"
                max="1"
                inputMode="decimal"
                placeholder="0.5"
                {...form.register("percent")}
                disabled={isPending}
              />
              {form.formState.errors.percent && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.percent.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                A value between 0 and 1. Example: 0.25 for 25% rollout.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Percent evaluation</Label>
              <Controller
                control={form.control}
                name="percentEvalMethod"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ID">ID based</SelectItem>
                      <SelectItem value="RANDOM">Random each check</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Role access</Label>
              <Controller
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {flagRoleOptions.map((role) => {
                      const active = field.value?.includes(role) ?? false;
                      return (
                        <Button
                          key={role}
                          type="button"
                          size="sm"
                          variant={active ? "default" : "outline"}
                          onClick={() => {
                            const current = field.value ?? [];
                            field.onChange(
                              active
                                ? current.filter((r) => r !== role)
                                : [...current, role]
                            );
                          }}
                          disabled={isPending}>
                          {role}
                        </Button>
                      );
                    })}
                  </div>
                )}
              />
              <p className="text-xs text-muted-foreground">
                If no roles are selected, all roles pass this condition.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${record.id}-value`}>Custom value</Label>
              <Input
                id={`${record.id}-value`}
                placeholder="Optional value"
                autoComplete="off"
                {...form.register("value")}
                disabled={isPending}
              />
              {form.formState.errors.value && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.value.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Provide a string or number to return when the flag is enabled.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Parameter evaluation</Label>
            <Controller
              control={form.control}
              name="paramEvalMethod"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">All conditions (AND)</SelectItem>
                    <SelectItem value="OR">Any condition (OR)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <TimestampMeta created={record.created} updated={record.updated} />
        </CardContent>
        <CardFooter className="justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(buildDefaultFormValues(extractedFlag))}
            disabled={isPending || !form.formState.isDirty}>
            Reset
          </Button>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function buildDefaultFormValues(
  flag: Exclude<FeatureFlag, boolean>
): ObjectFlagFormValues {
  return {
    enabled: flag.enabled ?? false,
    percent: typeof flag.percent === "number" ? String(flag.percent) : "",
    roles: filterRoles(flag.roles),
    value:
      flag.value !== undefined && flag.value !== null ? String(flag.value) : "",
    paramEvalMethod: flag.paramEvalMethod ?? "AND",
    percentEvalMethod: flag.percentEvalMethod ?? "RANDOM"
  };
}

function formValuesToFeatureFlag(
  values: ObjectFlagFormValues
): Exclude<FeatureFlag, boolean> {
  const percent = values.percent?.trim();
  let percentNumber: number | undefined;
  if (percent) {
    const parsed = Number(percent);
    percentNumber = Number.isNaN(parsed) ? undefined : parsed;
  }

  const rawValue = values.value?.trim();
  let resolvedValue: string | number | undefined = undefined;
  if (rawValue) {
    const numericValue = Number(rawValue);
    resolvedValue = Number.isNaN(numericValue) ? rawValue : numericValue;
  }

  const roles = values.roles?.filter((role, index, self) => {
    return role && self.indexOf(role) === index;
  });

  return {
    enabled: values.enabled,
    ...(percentNumber !== undefined
      ? { percent: Number(percentNumber.toFixed(6)) }
      : {}),
    ...(roles && roles.length > 0 ? { roles } : {}),
    ...(resolvedValue !== undefined ? { value: resolvedValue } : {}),
    paramEvalMethod: values.paramEvalMethod,
    percentEvalMethod: values.percentEvalMethod
  } satisfies Exclude<FeatureFlag, boolean>;
}

function filterRoles(roles?: string[]): RoleOption[] {
  if (!roles) return [];
  return roles.filter((role): role is RoleOption =>
    flagRoleOptions.includes(role as RoleOption)
  );
}

function formatFlagName(name: FlagNames) {
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function TimestampMeta({
  created,
  updated
}: {
  created: string;
  updated: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span>Created {formatTimestamp(created)}</span>
      <span className="hidden sm:inline" aria-hidden="true">
        •
      </span>
      <span>Last updated {formatTimestamp(updated)}</span>
    </div>
  );
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}
