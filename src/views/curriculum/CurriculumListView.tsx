import { useNavigate } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Typography } from "@/components/typography";
import { CurriculumEquivalenceTab } from "./CurriculumEquivalenceTab";
import { CurriculumListTab } from "./CurriculumListTab";
import { CurriculumStructureTab } from "./CurriculumStructureTab";

type CurriculumType = "list" | "structure" | "equivalence";

interface CurriculumListViewProps {
  type: CurriculumType;
}

const TAB_CONFIG: Record<CurriculumType, string> = {
  list: "Daftar Kurikulum",
  structure: "Struktur Kurikulum",
  equivalence: "Ekuivalensi Kurikulum",
};

export function CurriculumListView({ type }: CurriculumListViewProps) {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value !== type) {
      navigate({ to: "/curriculum/$type", params: { type: value } });
    }
  };

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[{ href: "/", label: "Beranda" }, { label: TAB_CONFIG[type] }]}
      />
      <Typography variant="h6">Kurikulum</Typography>

      <Tabs value={type} onValueChange={handleTabChange}>
        <TabsList variant="folder">
          <TabsTrigger value="list" variant="folder">
            Daftar Kurikulum
          </TabsTrigger>
          <TabsTrigger value="structure" variant="folder">
            Struktur Kurikulum
          </TabsTrigger>
          <TabsTrigger value="equivalence" variant="folder">
            Ekuivalensi Kurikulum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" variant="folder">
          <div className="rounded-b-xl border border-t-0 border-border bg-white p-5">
            <CurriculumListTab />
          </div>
        </TabsContent>

        <TabsContent value="structure" variant="folder">
          <div className="rounded-b-xl border border-t-0 border-border bg-white p-5">
            <CurriculumStructureTab />
          </div>
        </TabsContent>

        <TabsContent value="equivalence" variant="folder">
          <div className="rounded-b-xl border border-t-0 border-border bg-white p-5">
            <CurriculumEquivalenceTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
