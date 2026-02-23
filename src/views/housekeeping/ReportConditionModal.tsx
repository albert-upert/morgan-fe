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
export interface ReportMismatchDialogProps {
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

/**
 * Header Component
 */
function ReportMismatchHeader() {
  return (
    <DialogHeader className="justify-center border-b border-gray-300 bg-gray-100 px-5 py-4">
      <Typography variant="h5" className="text-gray-800">
        Isi Masalah Aset
      </Typography>
    </DialogHeader>
  );
}

/**
 * Asset Item Component
 */
interface AssetItemProps {
  asset: MismatchAsset;
  isExpanded: boolean;
  issueType: IssueType | null;
  detail: string;
  fileName?: string;
  onToggle: () => void;
  onIssueTypeChange: (type: IssueType) => void;
  onDetailChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

function AssetMismatchItem({
  asset,
  isExpanded,
  issueType,
  detail,
  fileName,
  onToggle,
  onIssueTypeChange,
  onDetailChange,
  onFileSelect,
  onFileRemove,
}: AssetItemProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection from FileUpload
  const handleFilesChange = useCallback(
    (files: Array<File>) => {
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect(file);
        // Create preview URL
        const url = URL.createObjectURL(file);
        setImagePreviewUrl(url);
      }
    },
    [onFileSelect]
  );

  // Handle file removal
  const handleRemoveFile = useCallback(() => {
    onFileRemove();
    setSelectedFile(null);
    // Clean up preview URL
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [onFileRemove, imagePreviewUrl]);

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  // Check if asset is complete (issueType and detail filled)
  const isComplete = issueType && detail.trim().length > 0;

  const accordionTitle = (
    <div className="flex flex-col items-start gap-1">
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
          className={isComplete ? "text-green-600" : "text-red-600"}
        >
          {isComplete ? "Sudah Lengkap" : "Belum Lengkap"}
        </Typography>
      </Tag>
      <div className="inline-flex items-center gap-2">
        <ErrorIcon className="h-4 w-4 text-red-500" />
        <Typography variant="body-small-semibold" className="text-gray-800">
          {asset.name}
        </Typography>
      </div>
    </div>
  );

  return (
    <Accordion
      title={accordionTitle as unknown as string}
      expanded={isExpanded}
      onExpandedChange={(expanded) => {
        if (expanded !== isExpanded) {
          onToggle();
        }
      }}
      className="rounded-xl border border-gray-400 bg-gray-100 !p-0 transition-all duration-300"
    >
      <div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-300">
        {/* Issue Type Buttons */}
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
                onClick={() => onIssueTypeChange(type)}
                className={`rounded-lg border px-2 py-1 transition-colors ${
                  issueType === type
                    ? "border-red-500 bg-red-500 hover:bg-red-500 focus:bg-red-500 active:bg-red-500"
                    : "border-red-500 bg-white hover:bg-white focus:bg-white active:bg-red-50"
                }`}
              >
                <Typography
                  variant="body-small"
                  className={
                    issueType === type ? "text-gray-50" : "text-red-500"
                  }
                >
                  {type}
                </Typography>
              </Button>
            ))}
          </div>
        </div>

        {/* Detail Textarea */}
        <div className="space-y-1.5">
          <Typography
            variant="caption-small-semibold"
            className="text-gray-600"
          >
            Detail Kendala
          </Typography>
          <Textarea
            label=""
            value={detail}
            onChange={(e) => onDetailChange(e.target.value)}
            placeholder="Contoh: Lampu proyektor mati total saat dinyalakan"
            className="border-gray-400 bg-white placeholder:text-gray-600 focus:!border-gray-500"
            maxLength={150}
            showCount
            helperText=" "
          />
        </div>

        {/* File Upload */}
        <div className="space-y-1.5">
          <FileUpload
            label="Bukti Foto (Opsional)"
            accept="image/*"
            imagePreviewModal
            maxSize={10}
            variant="button"
            buttonLabel={fileName ? "Ganti Foto" : "Ambil / Pilih Foto"}
            files={selectedFile ? [selectedFile] : []}
            onFilesChange={handleFilesChange}
            onRemoveFile={handleRemoveFile}
          />
        </div>
      </div>
    </Accordion>
  );
}

/**
 * Body Component
 */
interface BodyProps {
  assets: Array<MismatchAsset>;
  expandedId: string | null;
  drafts: Partial<Record<string, AssetMismatchDraft>>;
  onToggleAccordion: (assetId: string) => void;
  onChangeIssueType: (assetId: string, type: IssueType) => void;
  onChangeDraft: (assetId: string, value: string) => void;
  onFileSelect: (assetId: string, file: File) => void;
  onFileRemove: (assetId: string) => void;
}

function ReportMismatchBody({
  assets,
  expandedId,
  drafts,
  onToggleAccordion,
  onChangeIssueType,
  onChangeDraft,
  onFileSelect,
  onFileRemove,
}: BodyProps) {
  return (
    <DialogBody className="max-h-140 items-stretch gap-4 overflow-y-auto border-0 bg-white px-5 py-4">
      <div className="animate-in fade-in space-y-3 duration-500">
        {assets.map((asset, idx) => {
          const draft = drafts[asset.id] ?? {
            issueType: null,
            detail: "",
            fileName: undefined,
          };
          const isExpanded = expandedId === asset.id;

          return (
            <div
              key={asset.id}
              className="animate-in fade-in slide-in-from-left-2 duration-300"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <AssetMismatchItem
                asset={asset}
                isExpanded={isExpanded}
                issueType={draft.issueType}
                detail={draft.detail}
                fileName={draft.fileName}
                onToggle={() => onToggleAccordion(asset.id)}
                onIssueTypeChange={(type) => onChangeIssueType(asset.id, type)}
                onDetailChange={(value) => onChangeDraft(asset.id, value)}
                onFileSelect={(file) => onFileSelect(asset.id, file)}
                onFileRemove={() => onFileRemove(asset.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-yellow-500 bg-yellow-50 px-3 py-2">
        <ErrorIcon className="h-4 w-4 text-yellow-600" />
        <Typography variant="caption-pixie" className="text-gray-800">
          Silahkan isi detail masing-masing kendala terlebih dahulu.
        </Typography>
      </div>
    </DialogBody>
  );
}

/**
 * Footer Component
 */
interface FooterProps {
  isComplete: boolean;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

function ReportMismatchFooter({
  isComplete,
  isSubmitting = false,
  onCancel,
  onSubmit,
}: FooterProps) {
  return (
    <DialogFooter className="flex gap-3 rounded-b-lg bg-white px-5 py-4">
      <Button
        onClick={onCancel}
        className="flex-1 border border-red-500 bg-white text-red-500 hover:bg-white focus:bg-white active:bg-red-50"
      >
        <Typography variant="body-medium" className="text-red-500">
          Kembali
        </Typography>
      </Button>
      <Button
        onClick={onSubmit}
        disabled={!isComplete || isSubmitting}
        className={`flex-1 ${
          isComplete
            ? "bg-red-500 text-white hover:bg-red-500 focus:bg-red-600 active:bg-red-600"
            : "cursor-not-allowed bg-gray-300 text-gray-600"
        }`}
      >
        <Typography
          variant="body-medium"
          className={isComplete ? "text-white" : "text-gray-600"}
        >
          Kirim Laporan
        </Typography>
      </Button>
    </DialogFooter>
  );
}

/**
 * Main Dialog Component
 */
export function ReportMismatchDialog({
  open,
  assets,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: ReportMismatchDialogProps) {
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

  useEffect(() => {
    if (open) {
      resetDrafts();
      resetAccordion();
      setShowConfirm(false);
    }
  }, [open, resetDrafts, resetAccordion]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showConfirm ? (
        <DialogContent
          className="w-full rounded-2xl p-0 data-[side=center]:top-1/2 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm data-[side=center]:-translate-y-1/2"
          showCloseButton={false}
        >
          <DialogHeader className="justify-center border-b border-gray-300 bg-gray-100 px-5 py-4">
            <Typography variant="h5" className="text-gray-800">
              Tunggu Sebentar
            </Typography>
          </DialogHeader>
          <DialogBody className="items-stretch gap-3 border-0 bg-white px-5 py-4">
            <Typography
              variant="body-medium"
              className="text-center text-gray-800"
            >
              Apakah anda yakin sudah mengisi semua kendala aset dengan benar?
            </Typography>
          </DialogBody>
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
      ) : (
        <DialogContent
          className="w-full rounded-2xl border border-gray-200 p-0 data-[side=center]:top-1/2 data-[side=center]:w-[calc(100%-2rem)] data-[side=center]:max-w-sm data-[side=center]:-translate-y-1/2"
          showCloseButton={false}
        >
          <ReportMismatchHeader />
          <ReportMismatchBody
            assets={assets}
            expandedId={expandedId}
            drafts={drafts}
            onToggleAccordion={toggle}
            onChangeIssueType={(assetId, type) =>
              updateDraft(assetId, { issueType: type })
            }
            onChangeDraft={(assetId, value) =>
              updateDraft(assetId, { detail: value })
            }
            onFileSelect={(assetId, file) =>
              updateDraft(assetId, { fileName: file.name })
            }
            onFileRemove={(assetId) =>
              updateDraft(assetId, { fileName: undefined })
            }
          />
          <ReportMismatchFooter
            isComplete={isAllComplete}
            isSubmitting={isSubmitting}
            onCancel={() => onOpenChange(false)}
            onSubmit={handleOpenConfirm}
          />
        </DialogContent>
      )}
    </Dialog>
  );
}
