import { useNavigate } from "@tanstack/react-router";
import { Breadcrumb } from "uper-ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "uper-ui/tabs";
import { EventListTab } from "./event/EventListTab";
import { PeriodListTab } from "./period/PeriodListTab";

type AcademicType = "period" | "event";

interface AcademicListViewProps {
  type: AcademicType;
}

const TAB_CONFIG: Record<AcademicType, string> = {
  period: "Periode Akademik",
  event: "Event Akademik",
};

export function AcademicListView({ type }: AcademicListViewProps) {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value !== type) {
      navigate({
        to: "/configuration/academic/$type",
        params: { type: value },
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          {
            href: "/",
            label: "Beranda",
          },
          {
            href: "/configuration",
            label: "Konfigurasi",
          },
          {
            href: "/configuration/academic",
            label: "Akademik",
          },
          {
            label: TAB_CONFIG[type],
          },
        ]}
      />
      <Tabs value={type} onValueChange={handleTabChange}>
        <TabsList variant="folder">
          <TabsTrigger value="period" variant="folder">
            Periode Akademik
          </TabsTrigger>
          <TabsTrigger value="event" variant="folder">
            Event Akademik
          </TabsTrigger>
        </TabsList>
        <TabsContent value="period" variant="folder">
          <div className="rounded-b-xl border border-t-0 border-border bg-white p-5">
            <PeriodListTab />
          </div>
        </TabsContent>
        <TabsContent value="event" variant="folder">
          <div className="rounded-b-xl border border-t-0 border-border bg-white p-5">
            <EventListTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
