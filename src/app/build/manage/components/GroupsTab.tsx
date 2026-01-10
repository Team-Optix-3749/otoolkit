"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  UserPlus,
  UserMinus,
  ChevronsUpDown,
  ArrowRight
} from "lucide-react";
import {
  createBuildGroup,
  updateBuildGroup,
  deleteBuildGroup,
  fetchGroupUsers,
  updateUserBuildGroup,
  fetchAllUsersWithGroups
} from "@/lib/db/build";
import { BUILD, USER } from "@/lib/types/queryKeys";
import type { BuildGroup, UserWithBuildGroup } from "@/lib/types/db";
import { getAllUsers } from "@/lib/db/server";

type GroupsTabProps = {
  groups: BuildGroup[];
  isLoading: boolean;
  onRefresh: () => void;
};

type GroupFormData = {
  group_name: string;
  description: string;
};

const defaultFormData: GroupFormData = {
  group_name: "",
  description: ""
};

export function GroupsTab({ groups, isLoading, onRefresh }: GroupsTabProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMembersDialogOpen, setIsMembersDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<BuildGroup | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<BuildGroup | null>(null);
  const [formData, setFormData] = useState<GroupFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // User selection states
  const [userSelectOpen, setUserSelectOpen] = useState(false);
  const [addingUserId, setAddingUserId] = useState<string | null>(null);

  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "remove" | "move";
    user: UserWithBuildGroup | null;
    targetGroupId?: number;
  }>({ open: false, type: "remove", user: null });
  const [isConfirming, setIsConfirming] = useState(false);

  // Fetch all users with their group info
  const { data: allUsers, refetch: refetchUsers } = useQuery({
    queryKey: USER.ALL_USERS,
    queryFn: async () => {
      const [error, users] = await getAllUsers();
      if (error) throw new Error(error);
      return users;
    }
  });

  // Fetch members for selected group
  const {
    data: groupMembers,
    isLoading: isMembersLoading,
    refetch: refetchMembers
  } = useQuery({
    queryKey: BUILD.GROUP_MEMBERS(selectedGroup?.id ?? 0),
    queryFn: async () => {
      if (!selectedGroup) return [];
      const [error, members] = await fetchGroupUsers(selectedGroup.id);
      if (error) throw new Error(error);
      return members;
    },
    enabled: !!selectedGroup
  });

  const handleOpenCreate = () => {
    setEditingGroup(null);
    setFormData(defaultFormData);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (group: BuildGroup) => {
    setEditingGroup(group);
    setFormData({
      group_name: group.group_name,
      description: group.description || ""
    });
    setIsDialogOpen(true);
  };

  const handleOpenMembers = (group: BuildGroup) => {
    setSelectedGroup(group);
    setIsMembersDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.group_name) {
      toast.error("Please enter a group name");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      group_name: formData.group_name,
      description: formData.description || null
    };

    if (editingGroup) {
      const [error] = await updateBuildGroup(editingGroup.id, payload);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Group updated");
        setIsDialogOpen(false);
        onRefresh();
      }
    } else {
      const [error] = await createBuildGroup(payload);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Group created");
        setIsDialogOpen(false);
        onRefresh();
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (groupId: number) => {
    setDeletingId(groupId);

    const [error] = await deleteBuildGroup(groupId);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Group deleted");
      onRefresh();
    }

    setDeletingId(null);
  };

  const handleAddUser = async (user: UserWithBuildGroup) => {
    if (!selectedGroup) return;

    // If user is already in another group, show move confirmation
    if (user.build_group !== null) {
      setConfirmDialog({
        open: true,
        type: "move",
        user,
        targetGroupId: selectedGroup.id
      });
      setUserSelectOpen(false);
      return;
    }

    // Otherwise add directly
    setAddingUserId(user.user_id);

    const [error] = await updateUserBuildGroup(user.user_id, selectedGroup.id);

    if (error) {
      toast.error(error);
    } else {
      toast.success(`${user.user_name || "User"} added to group`);
      refetchMembers();
      refetchUsers();
    }

    setAddingUserId(null);
    setUserSelectOpen(false);
  };

  const handleRemoveUser = (user: UserWithBuildGroup) => {
    setConfirmDialog({
      open: true,
      type: "remove",
      user
    });
  };

  const handleConfirmAction = async () => {
    if (!confirmDialog.user) return;

    setIsConfirming(true);

    if (confirmDialog.type === "remove") {
      const [error] = await updateUserBuildGroup(
        confirmDialog.user.user_id,
        null
      );

      if (error) {
        toast.error(error);
      } else {
        toast.success(
          `${confirmDialog.user.user_name || "User"} removed from group`
        );
        refetchMembers();
        refetchUsers();
      }
    } else if (confirmDialog.type === "move" && confirmDialog.targetGroupId) {
      const [error] = await updateUserBuildGroup(
        confirmDialog.user.user_id,
        confirmDialog.targetGroupId
      );

      if (error) {
        toast.error(error);
      } else {
        const targetGroup = groups.find(
          (g) => g.id === confirmDialog.targetGroupId
        );
        toast.success(
          `${confirmDialog.user.user_name || "User"} moved to ${
            targetGroup?.group_name || "group"
          }`
        );
        refetchMembers();
        refetchUsers();
      }
    }

    setIsConfirming(false);
    setConfirmDialog({ open: false, type: "remove", user: null });
  };

  // Get users not in the selected group (for adding)
  const availableUsers =
    allUsers?.filter((user) => user.build_group !== selectedGroup?.id) || [];

  // Get source group name for move confirmation
  const getSourceGroupName = (groupId: number | null) => {
    if (groupId === null) return "none";
    return groups.find((g) => g.id === groupId)?.group_name || "unknown group";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Users className="h-4 w-4" />
          Build Groups
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleOpenCreate}>
              <Plus className="h-4 w-4 mr-1" />
              Add Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingGroup ? "Edit Group" : "Create Group"}
              </DialogTitle>
              <DialogDescription>
                {editingGroup
                  ? "Update the group details below."
                  : "Create a new group. Tasks can be assigned to groups."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="group_name">Group Name *</Label>
                <Input
                  id="group_name"
                  value={formData.group_name}
                  onChange={(e) =>
                    setFormData({ ...formData, group_name: e.target.value })
                  }
                  placeholder="e.g., Mechanical Team"
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
                  placeholder="Optional description..."
                  rows={3}
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
                ) : editingGroup ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No groups created yet. Create one to assign tasks.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">
                    {group.group_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {group.description || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenMembers(group)}>
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(group)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(group.id)}
                        disabled={deletingId === group.id}>
                        {deletingId === group.id ? (
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

      {/* Members Dialog */}
      <Dialog open={isMembersDialogOpen} onOpenChange={setIsMembersDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedGroup?.group_name} Members</DialogTitle>
            <DialogDescription>Manage members of this group</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Add member with searchable dropdown */}
            <div className="flex gap-2">
              <Popover open={userSelectOpen} onOpenChange={setUserSelectOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="flex-1 justify-between"
                    disabled={addingUserId !== null}>
                    <span className="truncate text-muted-foreground">
                      Select a user to add...
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-60" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search users..." autoFocus />
                    <CommandList>
                      <CommandEmpty>No users found.</CommandEmpty>
                      <CommandGroup>
                        {availableUsers.map((user) => (
                          <CommandItem
                            key={user.user_id}
                            value={user.user_name || user.user_id}
                            onSelect={() => handleAddUser(user)}
                            className="flex items-center justify-between">
                            <span>{user.user_name || "Unknown"}</span>
                            {user.build_group !== null && (
                              <span className="text-xs text-muted-foreground">
                                ({getSourceGroupName(user.build_group)})
                              </span>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Members list */}
            <ScrollArea className="h-[200px]">
              {isMembersLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : !groupMembers || groupMembers.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  No members yet
                </div>
              ) : (
                <div className="space-y-2">
                  {groupMembers.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                      <span className="text-sm">
                        {member.user_name || "Unknown"}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUser(member)}>
                        <UserMinus className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMembersDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) => {
          if (!open)
            setConfirmDialog({ open: false, type: "remove", user: null });
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.type === "remove"
                ? "Remove from Group"
                : "Move to Different Group"}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.type === "remove" ? (
                <>
                  Are you sure you want to remove{" "}
                  <strong>
                    {confirmDialog.user?.user_name || "this user"}
                  </strong>{" "}
                  from <strong>{selectedGroup?.group_name}</strong>?
                </>
              ) : (
                <>
                  <strong>
                    {confirmDialog.user?.user_name || "This user"}
                  </strong>{" "}
                  is currently in{" "}
                  <strong>
                    {getSourceGroupName(
                      confirmDialog.user?.build_group ?? null
                    )}
                  </strong>
                  .
                  <div className="flex items-center gap-2 mt-2 text-foreground">
                    <span>
                      {getSourceGroupName(
                        confirmDialog.user?.build_group ?? null
                      )}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                    <span>
                      {
                        groups.find((g) => g.id === confirmDialog.targetGroupId)
                          ?.group_name
                      }
                    </span>
                  </div>
                  <p className="mt-2">
                    Do you want to move them to the new group?
                  </p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog({ open: false, type: "remove", user: null })
              }
              disabled={isConfirming}>
              Cancel
            </Button>
            <Button
              variant={
                confirmDialog.type === "remove" ? "destructive" : "default"
              }
              onClick={handleConfirmAction}
              disabled={isConfirming}>
              {isConfirming ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  {confirmDialog.type === "remove"
                    ? "Removing..."
                    : "Moving..."}
                </>
              ) : confirmDialog.type === "remove" ? (
                "Remove"
              ) : (
                "Move"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
