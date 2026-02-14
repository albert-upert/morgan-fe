import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownIcon,
  Button,
  CloseIcon,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  ErrorIcon,
  FileIcon,
  OpenIcon,
  Textarea,
  Typography,
} from "uper-ui";
import { Accordion } from "uper-ui/accordion";

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
      return (
        draft &&
        draft.issueType &&
        draft.detail.trim().length > 0 &&
        draft.fileName
      );
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
      <Typography variant="body-medium-semibold" className="text-gray-900">
        Laporkan Ketidaksesuaian Aset
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
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const accordionTitle = (
    <div className="flex flex-col items-start gap-1">
      <div className="inline-flex items-center rounded-l border border-red-500 bg-red-50 px-2 py-0.5">
        <Typography variant="caption-pixie" className="text-red-500">
          Isi Detail
        </Typography>
      </div>
      <div className="inline-flex items-center gap-2">
        <ErrorIcon className="h-4 w-4 text-red-500" />
        <Typography variant="body-small-bold" className="text-gray-900">
          Aset: {asset.name}
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
      className="rounded-xl border border-red-500 bg-red-50 transition-all duration-300"
    >
      <div className="animate-in space-y-3 p-3 duration-300 fade-in slide-in-from-top-2">
        {/* Issue Type Dropdown */}
        <div className="space-y-1.5">
          <Typography variant="body-small-semibold" className="text-gray-800">
            Jenis Masalah
          </Typography>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 transition-colors hover:border-gray-400"
              >
                <Typography
                  variant="body-small"
                  className={issueType ? "text-gray-900" : "text-gray-500"}
                >
                  {issueType ? issueType : "Pilih Jenis Masalah"}
                </Typography>
                <ArrowDownIcon className="h-4 w-4 text-gray-600" />
              </button>
            </DropdownTrigger>
            <DropdownContent align="start" className="w-56">
              {ISSUE_TYPES.map((type) => (
                <DropdownItem
                  key={type}
                  onSelect={() => onIssueTypeChange(type)}
                  className="text-gray-800 hover:!bg-red-50 hover:!text-red-600"
                >
                  {type}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>

        {/* Detail Textarea */}
        <div className="space-y-1.5">
          <Typography variant="body-small-semibold" className="text-gray-800">
            Detail Masalah
          </Typography>
          <Textarea
            label=""
            value={detail}
            onChange={(e) => onDetailChange(e.target.value)}
            placeholder="Tuliskan detail masalah..."
            className="!placeholder:text-gray-500 border-gray-300 bg-white"
            maxLength={100}
            showCount
          />
        </div>

        {/* File Upload */}
        <div className="space-y-1.5">
          <Typography variant="body-small-semibold" className="text-gray-800">
            Lampiran Foto
          </Typography>
          <input
            type="file"
            id={`file-upload-${asset.id}`}
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          {!fileName && (
            <label htmlFor={`file-upload-${asset.id}`} className="block">
              <button
                type="button"
                onClick={() =>
                  document.getElementById(`file-upload-${asset.id}`)?.click()
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-3 text-gray-600 transition-colors hover:border-red-400 hover:bg-red-50"
              >
                <FileIcon className="h-5 w-5" />
                <Typography variant="body-small" className="text-gray-700">
                  Pilih Foto
                </Typography>
              </button>
            </label>
          )}

          {/* File Preview */}
          {fileName && (
            <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2.5">
              <FileIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
              <Typography
                variant="body-small"
                className="flex-1 truncate text-gray-900"
              >
                {fileName}
              </Typography>
              <button type="button" className="rounded p-1 hover:bg-gray-100">
                <OpenIcon className="h-5 w-5 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={onFileRemove}
                className="rounded p-1 hover:bg-gray-100"
              >
                <CloseIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          )}
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
    <DialogBody className="max-h-[60vh] items-stretch gap-4 overflow-y-auto border-0 bg-white px-5 py-4">
      <div className="animate-in space-y-3 duration-500 fade-in">
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
              className="animate-in duration-300 fade-in slide-in-from-left-2"
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

      <Typography variant="caption-pixie" className="text-gray-800">
        ** Isi detail kendala semua aset.
      </Typography>
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
        className="flex-1 border border-red-500 bg-white text-red-500 hover:bg-red-50"
      >
        <Typography variant="body-medium" className="text-red-500">
          Batal
        </Typography>
      </Button>
      <Button
        onClick={onSubmit}
        disabled={!isComplete || isSubmitting}
        className={`flex-1 ${
          isComplete
            ? "bg-red-500 text-white hover:bg-red-600"
            : "cursor-not-allowed bg-gray-300 text-gray-600"
        }`}
      >
        <Typography
          variant="body-medium"
          className={isComplete ? "text-white" : "text-gray-600"}
        >
          {isSubmitting ? "Mengirim..." : "Kirim"}
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
    }
  }, [open, resetDrafts, resetAccordion]);

  const handleSubmit = useCallback(() => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
