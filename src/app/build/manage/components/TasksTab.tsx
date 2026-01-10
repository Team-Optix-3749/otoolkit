"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ListTodo,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import {
  createBuildTask,
  updateBuildTask,
  deleteBuildTask,
  reviewTask
} from "@/lib/db/build";
import type { BuildTask, BuildGroup } from "@/lib/types/db";
import { cn } from "@/lib/utils";

type TasksTabProps = {
  tasks: BuildTask[];
  groups: BuildGroup[];
  isLoading: boolean;
  userId: string;
  onRefresh: () => void;
};

type TaskFormData = {
  task_name: string;
  description: string;
  group_id: string;
  due_date: string;
  estimated_minutes: string;
};

const defaultFormData: TaskFormData = {
  task_name: "",
  description: "",
  group_id: "",
  due_date: "",
  estimated_minutes: ""
};

const STATUS_CONFIG: Record<
  BuildTask["status"],
  { label: string; className: string }
> = {
  to_do: { label: "To Do", className: "bg-blue-500/20 text-blue-500" },
  in_review: {
    label: "In Review",
    className: "bg-amber-500/20 text-amber-500"
  },
  rejected: { label: "Rejected", className: "bg-red-500/20 text-red-500" },
  complete: { label: "Complete", className: "bg-green-500/20 text-green-500" }
};

export function TasksTab({
  tasks,
  groups,
  isLoading,
  userId,
  onRefresh
}: TasksTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<BuildTask | null>(null);
  const [formData, setFormData] = useState<TaskFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<BuildTask["status"] | "all">(
    "all"
  );

  const handleOpenCreate = () => {
    setEditingTask(null);
    setFormData(defaultFormData);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (task: BuildTask) => {
    setEditingTask(task);
    setFormData({
      task_name: task.task_name,
      description: task.description || "",
      group_id: task.assigned_group_id?.toString() || "",
      due_date: task.due_date?.slice(0, 16) || "",
      estimated_minutes: task.estimated_minutes?.toString() || ""
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.task_name || !formData.group_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      task_name: formData.task_name,
      description: formData.description || null,
      assigned_group_id: parseInt(formData.group_id),
      due_date: formData.due_date
        ? new Date(formData.due_date).toISOString()
        : null,
      estimated_minutes: formData.estimated_minutes
        ? parseInt(formData.estimated_minutes)
        : null,
      created_by: userId,
      status: "to_do" as const
    };

    if (editingTask) {
      const [error] = await updateBuildTask(editingTask.id, payload);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Task updated");
        setIsDialogOpen(false);
        onRefresh();
      }
    } else {
      const [error] = await createBuildTask(payload);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Task created");
        setIsDialogOpen(false);
        onRefresh();
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (taskId: number) => {
    setDeletingId(taskId);

    const [error] = await deleteBuildTask(taskId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Task deleted");
      onRefresh();
    }

    setDeletingId(null);
  };

  const handleReview = async (
    taskId: number,
    decision: "complete" | "rejected"
  ) => {
    setReviewingId(taskId);

    const [error] = await reviewTask(taskId, userId, decision);

    if (error) {
      toast.error(error);
    } else {
      toast.success(
        decision === "complete" ? "Task approved" : "Task rejected"
      );
      onRefresh();
    }

    setReviewingId(null);
  };

  const getGroupName = (groupId: number | null) => {
    if (!groupId) return "Unassigned";
    return groups.find((g) => g.id === groupId)?.group_name || "Unknown";
  };

  const filteredTasks =
    statusFilter === "all"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  // Count tasks in review
  const inReviewCount = tasks.filter((t) => t.status === "in_review").length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            Build Tasks
          </CardTitle>
          {inReviewCount > 0 && (
            <Badge className="bg-amber-500/20 text-amber-500">
              {inReviewCount} pending review
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as BuildTask["status"] || "all")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="to_do">To Do</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={handleOpenCreate}>
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTask ? "Edit Task" : "Create Task"}
                </DialogTitle>
                <DialogDescription>
                  {editingTask
                    ? "Update the task details below."
                    : "Create a new task and assign it to a group."}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="task_name">Task Name *</Label>
                  <Input
                    id="task_name"
                    value={formData.task_name}
                    onChange={(e) =>
                      setFormData({ ...formData, task_name: e.target.value })
                    }
                    placeholder="e.g., Build drivetrain prototype"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Detailed description..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group_id">Assign to Group *</Label>
                  <Select
                    value={formData.group_id}
                    onValueChange={(v) =>
                      setFormData({ ...formData, group_id: v })
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group..." />
                    </SelectTrigger>
                    <SelectContent>
                      {groups.map((group) => (
                        <SelectItem key={group.id} value={group.id.toString()}>
                          {group.group_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date (optional)</Label>
                  <Input
                    id="due_date"
                    type="datetime-local"
                    value={formData.due_date}
                    onChange={(e) =>
                      setFormData({ ...formData, due_date: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated_minutes">
                    Estimated Minutes (optional)
                  </Label>
                  <Input
                    id="estimated_minutes"
                    type="number"
                    min="0"
                    value={formData.estimated_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimated_minutes: e.target.value
                      })
                    }
                    placeholder="e.g., 60"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : editingTask ? (
                    "Update"
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {statusFilter === "all"
              ? "No tasks created yet."
              : `No tasks with status "${STATUS_CONFIG[statusFilter].label}".`}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <span className="font-medium">{task.task_name}</span>
                      {task.description && (
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getGroupName(task.assigned_group_id)}</TableCell>
                  <TableCell>
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(STATUS_CONFIG[task.status].className)}>
                      {STATUS_CONFIG[task.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {task.status === "in_review" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReview(task.id, "complete")}
                            disabled={reviewingId === task.id}>
                            {reviewingId === task.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleReview(task.id, "rejected")}
                            disabled={reviewingId === task.id}>
                            {reviewingId === task.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(task)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(task.id)}
                        disabled={deletingId === task.id}>
                        {deletingId === task.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
