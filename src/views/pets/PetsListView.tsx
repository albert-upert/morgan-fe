import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "uper-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "uper-ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import { PencilIcon, PlusIcon, TrashIcon } from "uper-ui/icon";
import { Table } from "uper-ui/table";
import { Tag } from "uper-ui/tags";
import {
  deletePetMutation,
  findPetsByStatusOptions,
} from "@/services/api/@tanstack/react-query.gen";

export function PetsListView() {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState<number | null>(null);

  const { data: pets, isLoading } = useQuery(
    findPetsByStatusOptions({
      query: {
        status: ["available", "pending", "sold"],
      },
    })
  );

  const deleteMutation = useMutation({
    ...deletePetMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ _id: "findPetsByStatus" }],
      });
      setDeleteDialogOpen(false);
      setPetToDelete(null);
    },
  });

  const handleDeleteClick = (petId: number) => {
    setPetToDelete(petId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (petToDelete) {
      deleteMutation.mutate({
        path: { petId: petToDelete },
      });
    }
  };

  const getStatusColor = (
    status?: string
  ): "green" | "green-light" | "yellow" | "red" | "blue" => {
    switch (status) {
      case "available":
        return "green";
      case "pending":
        return "yellow";
      case "sold":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pets</h1>
          <p className="text-muted-foreground">
            Manage your pet store inventory
          </p>
        </div>
        <Link to="/pets/create">
          <Button className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Pet
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pets</CardTitle>
          <CardDescription>A list of all pets in your store</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading pets...
            </div>
          ) : !pets || pets.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No pets found. Add your first pet to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Tags</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet.id} className="border-t">
                      <td className="px-4 py-3">{pet.id}</td>
                      <td className="px-4 py-3 font-medium">{pet.name}</td>
                      <td className="px-4 py-3">{pet.category?.name || "-"}</td>
                      <td className="px-4 py-3">
                        <Tag color={getStatusColor(pet.status)} type="filled">
                          {pet.status || "unknown"}
                        </Tag>
                      </td>
                      <td className="px-4 py-3">
                        {pet.tags && pet.tags.length > 0
                          ? pet.tags.map((tag) => tag.name).join(", ")
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to="/pets/$id/edit"
                            params={{ id: String(pet.id) }}
                          >
                            <Button
                              variant="outline"
                              size="md"
                              className="gap-1"
                            >
                              <PencilIcon className="h-3 w-3" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="md"
                            className="gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDeleteClick(pet.id!)}
                          >
                            <TrashIcon className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Pet</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pet? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
