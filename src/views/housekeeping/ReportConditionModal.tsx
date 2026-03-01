import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  ErrorIcon,
  Tag,
  Textarea,
  Typography,
} from "uper-ui";
import { Accordion } from "uper-ui/accordion";
import { FileUpload } from "uper-ui/file-upload";

/**
 * Domain Types
 */
export type IssueType = "Rusak" | "Hilang" | "Kurang" | "Lainnya";

export type MismatchAsset = {
  id: string;
  name: string;
};

type AssetMismatchDraft = {
  issueType: IssueType | null;
  detail: string;
  fileName?: string;
};

export type ReportMismatchPayload = {
  issues: Array<{
    assetId: string;
    issueType: IssueType;
    detail: string;
    fileName?: string;
  }>;
};

const ISSUE_TYPES: Array<IssueType> = ["Rusak", "Hilang", "Kurang", "Lainnya"];

/**
 * Props Interface
 */
export interface IReportMismatchDialogProps {
  open: boolean;
  assets: Array<MismatchAsset>;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: ReportMismatchPayload) => void;
  isSubmitting?: boolean;
}

/**
 * Hook for Draft Management
 */
function useMismatchDrafts(_assets: Array<MismatchAsset>) {
  const [drafts, setDrafts] = useState<
    Partial<Record<string, AssetMismatchDraft>>
  >({});

  const getDraft = useCallback(
    (assetId: string): AssetMismatchDraft => {
      return (
        drafts[assetId] ?? { issueType: null, detail: "", fileName: undefined }
      );
    },
    [drafts]
  );

  const updateDraft = useCallback(
    (assetId: string, partial: Partial<AssetMismatchDraft>) => {
      setDrafts((prev) => ({
        ...prev,
        [assetId]: { ...getDraft(assetId), ...partial },
      }));
    },
    [getDraft]
  );

  const reset = useCallback(() => {
    setDrafts({});
  }, []);

  return { drafts, getDraft, updateDraft, reset };
}

/**
 * Hook untuk Validation Logic
 */
function useMismatchValidation(
  assets: Array<MismatchAsset>,
  drafts: Partial<Record<string, AssetMismatchDraft>>
) {
  const isAllComplete = useMemo(() => {
    if (assets.length === 0) return false;
    return assets.every((asset) => {
      const draft = drafts[asset.id];
      return draft && draft.issueType && draft.detail.trim().length > 0;
    });
  }, [assets, drafts]);

  return { isAllComplete };
}

/**
 * Hook untuk Accordion Navigation
 */
function useAccordionNavigation(assets: Array<MismatchAsset>) {
  const [expandedId, setExpandedId] = useState<string | null>(
    assets[0]?.id ?? null
  );

  const goNext = useCallback(() => {
    if (!expandedId) return;
    const currentIdx = assets.findIndex((a) => a.id === expandedId);
    if (currentIdx >= 0 && currentIdx < assets.length - 1) {
      setExpandedId(assets[currentIdx + 1].id);
    }
  }, [assets, expandedId]);

  const toggle = useCallback((assetId: string) => {
    setExpandedId((prev) => (prev === assetId ? null : assetId));
  }, []);

  const reset = useCallback(() => {
    setExpandedId(assets[0]?.id ?? null);
  }, [assets]);

  return { expandedId, setExpandedId, toggle, goNext, reset };
}

// MAIN MODAL
export function ReportConditionModal({
  open,
  assets,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: IReportMismatchDialogProps) {
  // STATE MANAGEMENT
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    drafts,
    getDraft,
    updateDraft,
    reset: resetDrafts,
  } = useMismatchDrafts(assets);
  const {
    expandedId,
    toggle,
    reset: resetAccordion,
  } = useAccordionNavigation(assets);
  const { isAllComplete } = useMismatchValidation(assets, drafts);

  // File handling states for each asset
  const [imagePreviewUrls, setImagePreviewUrls] = useState<
    Record<string, string | null>
  >({});
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});

  // INITIALIZATION & CLEANUP
  useEffect(() => {
    if (open) {
      resetDrafts();
      resetAccordion();
      setShowConfirm(false);
    }
  }, [open, resetDrafts, resetAccordion]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(imagePreviewUrls).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviewUrls]);

  // EVENT HANDLERS
  const handleFilesChange = useCallback(
    (assetId: string, files: Array<File>) => {
      if (files.length > 0) {
        const file = files[0];
        setSelectedFiles((prev) => ({ ...prev, [assetId]: file }));
        updateDraft(assetId, { fileName: file.name });

        // Create preview URL
        const url = URL.createObjectURL(file);
        setImagePreviewUrls((prev) => ({
          ...prev,
          [assetId]: url,
        }));
      }
    },
    [updateDraft]
  );

  const handleRemoveFile = useCallback(
    (assetId: string) => {
      setSelectedFiles((prev) => ({ ...prev, [assetId]: null }));
      updateDraft(assetId, { fileName: undefined });

      // Clean up preview URL
      setImagePreviewUrls((prev) => {
        const url = prev[assetId];
        if (url) {
          URL.revokeObjectURL(url);
        }
        return { ...prev, [assetId]: null };
      });
    },
    [updateDraft]
  );

  // EVENT HANDLERS - Dialog Actions
  const handleConfirmSubmit = useCallback(() => {
    const payload: ReportMismatchPayload = {
      issues: assets.map((asset) => {
        const draft = getDraft(asset.id);
        return {
          assetId: asset.id,
          issueType: draft.issueType ?? "Rusak",
          detail: draft.detail.trim(),
          fileName: draft.fileName,
        };
      }),
    };
    onSubmit(payload);
  }, [assets, getDraft, onSubmit]);

  const handleOpenConfirm = useCallback(() => {
    setShowConfirm(true);
  }, []);

  // RENDER: CONFIRMATION DIALOG
  if (showConfirm) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="w-full rounded-2xl p-0 data-[side=center]:top-1/2 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm data-[side=center]:-translate-y-1/2"
          showCloseButton={false}
        >
          {/* Header */}
          <DialogHeader className="justify-center border-b border-gray-300 bg-gray-100 px-5 py-4">
            <Typography variant="h5" className="text-gray-800">
              Tunggu Sebentar
            </Typography>
          </DialogHeader>

          {/* Body */}
          <DialogBody className="items-stretch gap-3 border-0 bg-white px-5 py-4">
            <Typography
              variant="body-medium"
              className="text-center text-gray-800"
            >
              Apakah anda yakin sudah mengisi semua kendala aset dengan benar?
            </Typography>
          </DialogBody>

          {/* Footer */}
          <DialogFooter className="flex gap-3 rounded-b-lg bg-white px-5 py-4">
            <Button
              onClick={() => setShowConfirm(false)}
              className="flex-1 border border-red-500 bg-white text-red-500 hover:bg-white focus:bg-white active:bg-red-50"
            >
              <Typography variant="body-medium" className="text-red-500">
                Cek Kembali
              </Typography>
            </Button>
            <Button
              onClick={handleConfirmSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-red-500 text-white hover:bg-red-500 active:bg-red-600"
            >
              <Typography variant="body-medium" className="text-white">
                {isSubmitting ? "Mengirim..." : "Ya, Laporkan"}
              </Typography>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // MAIN REPORT DIALOG
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full rounded-2xl border border-gray-200 p-0 data-[side=center]:top-1/2 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm data-[side=center]:-translate-y-1/2"
        showCloseButton={false}
      >
        {/* Header Section */}
        <DialogHeader className="justify-center border-b border-gray-300 bg-gray-100 px-5 py-4">
          <Typography variant="h5" className="text-gray-800">
            Isi Masalah Aset
          </Typography>
        </DialogHeader>

        {/* Body Section */}
        <DialogBody className="max-h-140 items-stretch gap-4 overflow-y-auto border-0 bg-white px-5 py-4">
          <div className="animate-in fade-in space-y-3 duration-500">
            {/* Render each asset as an accordion item */}
            {assets.map((asset, idx) => {
              const draft = drafts[asset.id] ?? {
                issueType: null,
                detail: "",
                fileName: undefined,
              };
              const isExpanded = expandedId === asset.id;
              const selectedFile = selectedFiles[asset.id] ?? null;
              const isComplete =
                draft.issueType && draft.detail.trim().length > 0;

              return (
                <div
                  key={asset.id}
                  className="animate-in fade-in slide-in-from-left-2 duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Accordion Item */}
                  <Accordion
                    title={
                      (
                        <div className="flex flex-col items-start gap-1">
                          {/* Status Tag */}
                          <Tag
                            type="with-border"
                            size="md"
                            rounded="pill"
                            className={
                              isComplete
                                ? "border border-green-400 bg-green-50"
                                : "border border-red-400 bg-red-50"
                            }
                          >
                            <Typography
                              variant="caption-pixie"
                              className={
                                isComplete ? "text-green-600" : "text-red-600"
                              }
                            >
                              {isComplete ? "Sudah Lengkap" : "Belum Lengkap"}
                            </Typography>
                          </Tag>

                          {/* Name with Icon */}
                          <div className="inline-flex items-center gap-2">
                            <ErrorIcon className="h-4 w-4 text-red-500" />
                            <Typography
                              variant="body-small-semibold"
                              className="text-gray-800"
                            >
                              {asset.name}
                            </Typography>
                          </div>
                        </div>
                      ) as unknown as string
                    }
                    expanded={isExpanded}
                    onExpandedChange={(expanded: boolean) => {
                      if (expanded !== isExpanded) {
                        toggle(asset.id);
                      }
                    }}
                    className="rounded-xl border border-gray-400 bg-gray-100 !p-0 transition-all duration-300"
                  >
                    <div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-300">
                      {/* Issue Type */}
                      <div className="space-y-1.5">
                        <Typography
                          variant="caption-small-semibold"
                          className="text-gray-600"
                        >
                          Jenis Masalah
                        </Typography>
                        <div className="flex flex-wrap gap-2">
                          {ISSUE_TYPES.map((type) => (
                            <Button
                              key={type}
                              onClick={() =>
                                updateDraft(asset.id, { issueType: type })
                              }
                              className={`rounded-lg border px-2 py-1 transition-colors ${
                                draft.issueType === type
                                  ? "border-red-500 bg-red-500 hover:bg-red-500 focus:bg-red-500 active:bg-red-500"
                                  : "border-red-500 bg-white hover:bg-white focus:bg-white active:bg-red-50"
                              }`}
                            >
                              <Typography
                                variant="body-small"
                                className={
                                  draft.issueType === type
                                    ? "text-gray-50"
                                    : "text-red-500"
                                }
                              >
                                {type}
                              </Typography>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Detail */}
                      <div className="space-y-1.5">
                        <Typography
                          variant="caption-small-semibold"
                          className="text-gray-600"
                        >
                          Detail Kendala
                        </Typography>
                        <Textarea
                          label=""
                          value={draft.detail}
                          onChange={(e) =>
                            updateDraft(asset.id, { detail: e.target.value })
                          }
                          placeholder="Contoh: Lampu proyektor mati total saat dinyalakan"
                          className="border-gray-400 bg-white placeholder:text-gray-600 focus:!border-gray-500"
                          maxLength={150}
                          showCount
                          helperText=" "
                        />
                      </div>

                      {/* Bukti Foto */}
                      <div className="space-y-1.5">
                        <FileUpload
                          label="Bukti Foto (Opsional)"
                          accept="image/*"
                          imagePreviewModal
                          maxSize={10}
                          variant="button"
                          buttonLabel={
                            draft.fileName ? "Ganti Foto" : "Ambil / Pilih Foto"
                          }
                          files={selectedFile ? [selectedFile] : []}
                          onFilesChange={(files) =>
                            handleFilesChange(asset.id, files)
                          }
                          onRemoveFile={() => handleRemoveFile(asset.id)}
                        />
                      </div>
                    </div>
                  </Accordion>
                </div>
              );
            })}
          </div>

          {/* Validation Warning */}
          <div className="flex items-start gap-2 rounded-lg border border-yellow-500 bg-yellow-50 px-3 py-2">
            <ErrorIcon className="h-4 w-4 text-yellow-600" />
            <Typography variant="caption-pixie" className="text-gray-800">
              Silahkan isi detail masing-masing kendala terlebih dahulu.
            </Typography>
          </div>
        </DialogBody>

        {/* Footer */}
        <DialogFooter className="flex gap-3 rounded-b-lg bg-white px-5 py-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 border border-red-500 bg-white text-red-500 hover:bg-white focus:bg-white active:bg-red-50"
          >
            <Typography variant="body-medium" className="text-red-500">
              Kembali
            </Typography>
          </Button>
          <Button
            onClick={handleOpenConfirm}
            disabled={!isAllComplete || isSubmitting}
            className={`flex-1 ${
              isAllComplete
                ? "bg-red-500 text-white hover:bg-red-500 focus:bg-red-600 active:bg-red-600"
                : "cursor-not-allowed bg-gray-300 text-gray-600"
            }`}
          >
            <Typography
              variant="body-medium"
              className={isAllComplete ? "text-white" : "text-gray-600"}
            >
              Kirim Laporan
            </Typography>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
