import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import { Breadcrumb } from "uper-ui/breadcrumb";
import { Button } from "uper-ui/button";
import { CaretLeftIcon, PlusIcon } from "uper-ui/icon";
import { Input } from "uper-ui/input";
import { Typography } from "uper-ui/typography";
import { CreateCourseDialog } from "./CreateCourseDialog";
import type { Course } from "./CreateCourseDialog";

export function CreateEquivalenceView() {
  const navigate = useNavigate();
  const [oldCurriculumCourse, setOldCurriculumCourse] = useState("");
  const [newCurriculumCourse, setNewCurriculumCourse] = useState("");
  const [openCreateCourseDialog, setOpenCreateCourseDialog] = useState(false);
  const [dialogTarget, setDialogTarget] = useState<"old" | "new">("old");
  const [selectedOldCourses, setSelectedOldCourses] = useState<Array<Course>>(
    []
  );
  const [selectedNewCourses, setSelectedNewCourses] = useState<Array<Course>>(
    []
  );

  const handleCancel = useCallback(() => {
    navigate({ to: "/curriculum/$type", params: { type: "equivalence" } });
  }, [navigate]);

  const handleSave = useCallback(() => {
    console.warn("Save equivalence:", {
      oldCurriculumCourse,
      newCurriculumCourse,
      selectedOldCourses,
      selectedNewCourses,
    });
    navigate({ to: "/curriculum/$type", params: { type: "equivalence" } });
  }, [
    navigate,
    oldCurriculumCourse,
    newCurriculumCourse,
    selectedOldCourses,
    selectedNewCourses,
  ]);

  const handleAddOldCourse = useCallback(() => {
    setDialogTarget("old");
    setOpenCreateCourseDialog(true);
  }, []);

  const handleAddNewCourse = useCallback(() => {
    setDialogTarget("new");
    setOpenCreateCourseDialog(true);
  }, []);

  const handleAddCourses = useCallback(
    (courses: Array<Course>) => {
      if (dialogTarget === "old") {
        setSelectedOldCourses((prev) => [...prev, ...courses]);
        if (courses.length > 0) {
          setOldCurriculumCourse(courses.map((c) => c.name).join(", "));
        }
      } else {
        setSelectedNewCourses((prev) => [...prev, ...courses]);
        if (courses.length > 0) {
          setNewCurriculumCourse(courses.map((c) => c.name).join(", "));
        }
      }
    },
    [dialogTarget]
  );

  const isSaveDisabled =
    selectedOldCourses.length === 0 && selectedNewCourses.length === 0;

  return (
    <div className="flex flex-col gap-5 pt-5">
      <Breadcrumb
        items={[
          { href: "/", label: "Beranda" },
          {
            href: "/curriculum/equivalence",
            label: "Ekuivalensi Kurikulum",
          },
          { label: "Tambah Ekuivalensi" },
        ]}
      />
      <Typography variant="h6">Tambah Ekuivalensi</Typography>

      <Link
        to="/curriculum/$type"
        params={{ type: "equivalence" }}
        className="flex items-center gap-1 text-primary"
      >
        <CaretLeftIcon className="size-5" />
        <span className="text-base">Ekuivalensi Kurikulum</span>
      </Link>

      <div className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5">
        <Typography variant="h5">Tambah Ekuivalensi</Typography>

        {/* Info Table */}
        <div className="flex flex-col rounded-xl border border-border">
          <div className="flex border-b border-border">
            <div className="w-[200px] bg-muted px-4 py-3">
              <Typography variant="body-small-bold">Program Studi</Typography>
            </div>
            <div className="flex-1 px-4 py-3">
              <Typography variant="body-small">Teknik Komputer</Typography>
            </div>
          </div>
          <div className="flex">
            <div className="w-[200px] bg-muted px-4 py-3">
              <Typography variant="body-small-bold">
                Program Perkuliahan
              </Typography>
            </div>
            <div className="flex-1 px-4 py-3">
              <Typography variant="body-small">Reguler</Typography>
            </div>
          </div>
        </div>

        {/* Old Curriculum Course Input */}
        <div className="flex flex-col gap-3">
          <Typography variant="body-small-bold">
            Mata Kuliah Kurikulum Lama
          </Typography>
          <div className="flex items-center gap-3">
            <Input
              size="lg"
              placeholder="MK Kurikulum Lama"
              value={oldCurriculumCourse}
              onChange={(e) => setOldCurriculumCourse(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" size="lg" onClick={handleAddOldCourse}>
              <PlusIcon className="size-5" />
              Tambah Mata Kuliah
            </Button>
          </div>
        </div>

        {/* New Curriculum Course Input */}
        <div className="flex flex-col gap-3">
          <Typography variant="body-small-bold">
            Mata Kuliah Kurikulum Baru
          </Typography>
          <div className="flex items-center gap-3">
            <Input
              size="lg"
              placeholder="MK Kurikulum Baru"
              value={newCurriculumCourse}
              onChange={(e) => setNewCurriculumCourse(e.target.value)}
              className="flex-1"
            />
            <Button variant="secondary" size="lg" onClick={handleAddNewCourse}>
              <PlusIcon className="size-5" />
              Tambah Mata Kuliah
            </Button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-5 rounded-xl bg-white p-5">
        <Button variant="secondary" size="lg" onClick={handleCancel}>
          Batal
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          disabled={isSaveDisabled}
        >
          Simpan
        </Button>
      </div>

      <CreateCourseDialog
        open={openCreateCourseDialog}
        onOpenChange={setOpenCreateCourseDialog}
        onAddCourses={handleAddCourses}
      />
    </div>
  );
}
