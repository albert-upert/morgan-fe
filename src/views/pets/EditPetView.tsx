import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "uper-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "uper-ui/card";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "uper-ui/dropdown";
import { ArrowLeftIcon, CaretDownIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import {
  getPetByIdOptions,
  updatePetMutation,
} from "@/services/api/@tanstack/react-query.gen";
import type { Pet } from "@/services/api/types.gen";

interface EditPetViewProps {
  id: string;
}

export function EditPetView({ id }: EditPetViewProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: "",
    status: "available",
    photoUrls: [],
    category: { name: "" },
    tags: [],
  });

  const { data: pet, isLoading } = useQuery(
    getPetByIdOptions({
      path: { petId: Number(id) },
    })
  );

  useEffect(() => {
    if (pet) {
      setFormData({
        id: pet.id,
        name: pet.name,
        status: pet.status,
        photoUrls: pet.photoUrls,
        category: pet.category,
        tags: pet.tags,
      });
    }
  }, [pet]);

  const updateMutation = useMutation({
    ...updatePetMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ _id: "findPetsByStatus" }],
      });
      queryClient.invalidateQueries({ queryKey: [{ _id: "getPetById" }] });
      navigate({ to: "/pets" });
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      updateMutation.mutate({
        body: {
          id: formData.id,
          name: formData.name!,
          photoUrls: formData.photoUrls || [],
          status: formData.status,
          category: formData.category?.name ? formData.category : undefined,
          tags: formData.tags,
        },
      });
    },
    [formData]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading pet details...</div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Pet not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate({ to: "/pets" })}
          className="gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Pet</h1>
          <p className="text-muted-foreground">Update pet information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pet Details</CardTitle>
          <CardDescription>Update the information for this pet</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              label="Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="Enter pet name"
            />

            <Input
              id="category"
              label="Category"
              value={formData.category?.name || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: { name: e.target.value },
                })
              }
              placeholder="Enter category (e.g., Dog, Cat)"
            />

            <div className="flex w-full flex-col gap-0.5">
              <label className="text-sm leading-[22px] text-foreground">
                Status *
              </label>
              <Dropdown>
                <DropdownTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <span className="capitalize">{formData.status}</span>
                    <CaretDownIcon className="size-4 opacity-50" />
                  </button>
                </DropdownTrigger>
                <DropdownContent>
                  <DropdownItem
                    onClick={() =>
                      setFormData({ ...formData, status: "available" })
                    }
                  >
                    Available
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setFormData({ ...formData, status: "pending" })
                    }
                  >
                    Pending
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setFormData({ ...formData, status: "sold" })}
                  >
                    Sold
                  </DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>

            <Input
              id="photoUrl"
              label="Photo URL"
              value={formData.photoUrls?.[0] || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  photoUrls: e.target.value ? [e.target.value] : [],
                })
              }
              placeholder="Enter photo URL"
            />

            <Input
              id="tags"
              label="Tags (comma-separated)"
              value={formData.tags?.map((t) => t.name).join(", ") || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(",")
                    .map((tag) => ({ name: tag.trim() }))
                    .filter((tag) => tag.name),
                })
              }
              placeholder="Enter tags separated by commas"
            />

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Updating..." : "Update Pet"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/pets" })}
              >
                Cancel
              </Button>
            </div>

            {updateMutation.isError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                Failed to update pet. Please try again.
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
