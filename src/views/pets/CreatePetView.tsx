import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import { ArrowLeftIcon, CaretDownIcon } from "@/components/icon";
import { Input } from "@/components/input";
import { addPetMutation } from "@/services/api/@tanstack/react-query.gen";
import type { Pet } from "@/services/api/types.gen";

export function CreatePetView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: "",
    status: "available",
    photoUrls: [],
    category: { name: "" },
    tags: [],
  });

  const createMutation = useMutation({
    ...addPetMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ _id: "findPetsByStatus" }],
      });
      navigate({ to: "/pets" });
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      createMutation.mutate({
        body: {
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
          <h1 className="text-3xl font-bold tracking-tight">Add New Pet</h1>
          <p className="text-muted-foreground">
            Create a new pet in your store
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pet Details</CardTitle>
          <CardDescription>
            Enter the information for the new pet
          </CardDescription>
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
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create Pet"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/pets" })}
              >
                Cancel
              </Button>
            </div>

            {createMutation.isError && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                Failed to create pet. Please try again.
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
