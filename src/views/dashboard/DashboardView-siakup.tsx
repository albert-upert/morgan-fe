import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  PackageIcon,
  PawPrintIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
} from "@/components/icon";
import {
  findPetsByStatusOptions,
  getInventoryOptions,
} from "@/services/api/@tanstack/react-query.gen";

export function DashboardView() {
  const { data: pets } = useQuery(
    findPetsByStatusOptions({
      query: {
        status: ["available", "pending", "sold"],
      },
    })
  );

  const { data: inventory } = useQuery(getInventoryOptions());

  const availablePets =
    pets?.filter((p) => p.status === "available").length || 0;
  const pendingPets = pets?.filter((p) => p.status === "pending").length || 0;
  const soldPets = pets?.filter((p) => p.status === "sold").length || 0;
  const totalPets = pets?.length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Pet Store Manager</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
            <PawPrintIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPets}</div>
            <p className="text-xs text-muted-foreground">All pets in store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availablePets}</div>
            <p className="text-xs text-muted-foreground">Ready for adoption</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPets}</div>
            <p className="text-xs text-muted-foreground">In process</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sold</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldPets}</div>
            <p className="text-xs text-muted-foreground">
              Successfully adopted
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your pet store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/pets">
              <Button className="w-full" variant="outline">
                View All Pets
              </Button>
            </Link>
            <Link to="/pets/create">
              <Button className="w-full">Add New Pet</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Current stock levels by status</CardDescription>
          </CardHeader>
          <CardContent>
            {inventory ? (
              <div className="space-y-2">
                {Object.entries(inventory).map(([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm capitalize">{status}</span>
                    <span className="text-sm font-bold">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-sm text-muted-foreground">
                Loading inventory...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pet Store Overview</CardTitle>
          <CardDescription>
            Manage your pet inventory and track adoptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-muted-foreground">
            <p>Welcome to your Pet Store Management Dashboard</p>
            <p className="mt-2 text-sm">
              Navigate to Pets to manage your inventory
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
