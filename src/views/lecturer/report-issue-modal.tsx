import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "uper-ui/button";
import { Callout } from "uper-ui/callout";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "uper-ui/dialog";
import {
  CaretDownIcon,
  CaretUpIcon,
  ErrorIcon,
  UploadIcon,
} from "uper-ui/icon";
import { Textarea } from "uper-ui/textarea";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";

export type ReportIssueAsset = {
  id: string;
  name: string;
};

export type IssueType = "Rusak" | "Hilang" | "Kurang" | "Lainnya";

type AssetIssueDraft = {
  issueType: IssueType | null;
  detail: string;
  fileName?: string;
};

export type ReportIssuePayload = {
  issues: Array<{
    assetId: string;
    issueType: IssueType;
    detail: string;
    fileName?: string;
  }>;
};

export function ReportIssueModal({
  open,
  onOpenChange,
  assets,
  resetToken = 0,
  onRequestSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assets: Array<ReportIssueAsset>;
  resetToken?: number;
  onRequestSubmit?: (payload: ReportIssuePayload) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(
    assets[0]?.id ?? null
  );
  const [drafts, setDrafts] = useState<
    Partial<Record<string, AssetIssueDraft>>
  >({});

  useEffect(() => {
    setDrafts({});
    setExpandedId(assets[0]?.id ?? null);
  }, [resetToken, assets]);

  const getDraft = useCallback(
    (assetId: string): AssetIssueDraft => {
      return (
        drafts[assetId] ?? {
          issueType: null,
          detail: "",
          fileName: undefined,
        }
      );
    },
    [drafts]
  );

  const updateDraft = useCallback(
    (assetId: string, partial: Partial<AssetIssueDraft>) => {
      setDrafts((prev) => ({
        ...prev,
        [assetId]: { ...getDraft(assetId), ...partial },
      }));
    },
    [getDraft]
  );

  const isAllComplete = useMemo(() => {
    if (assets.length === 0) return false;
    return assets.every((a) => {
      const d = drafts[a.id];
      if (!d) return false;
      return !!d.issueType && !!d.detail.trim();
    });
  }, [assets, drafts]);

  const goNext = useCallback(() => {
    if (!expandedId) return;
    const idx = assets.findIndex((a) => a.id === expandedId);
    if (idx < 0) return;
    if (idx < assets.length - 1) {
      setExpandedId(assets[idx + 1].id);
    }
  }, [assets, expandedId]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) {
          // keep drafts for now; layout-only behavior
        }
      }}
    >
      <DialogContent
        side="center"
        showCloseButton={false}
        className="w-full p-0 data-[side=center]:w-[calc(100%-48px)] data-[side=center]:max-w-[412px]"
      >
        <DialogHeader className="border-b border-border bg-muted px-5 py-4">
          <DialogTitle textVariant="caption-bold" className="text-center">
            <Typography
              variant="body-medium"
              className="text-center font-semibold"
            >
              Lapor Ketidaksesuaian Aset
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-auto px-5 pb-4">
          <div className="mt-3 space-y-3">
            {assets.map((asset) => {
              const isExpanded = expandedId === asset.id;
              const draft = getDraft(asset.id);
              const isComplete = !!draft.issueType && !!draft.detail.trim();

              return (
                <div
                  key={asset.id}
                  className="rounded-xl border border-border bg-gray-100"
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    onClick={() =>
                      setExpandedId((prev) =>
                        prev === asset.id ? null : asset.id
                      )
                    }
                  >
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] ${
                            isComplete
                              ? "border-green-600 bg-green-50 text-green-700"
                              : "border-red-400 bg-red-50 text-red-600"
                          }`}
                        >
                          {isComplete ? "Sudah Lengkap" : "Belum Lengkap"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ErrorIcon className="h-4 w-4 text-red-600" />
                        <Typography
                          variant="body-small"
                          className="truncate font-semibold text-gray-900"
                        >
                          {asset.name}
                        </Typography>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full bg-gray-100 p-2">
                      {isExpanded ? (
                        <CaretUpIcon className="h-4 w-4" />
                      ) : (
                        <CaretDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <Typography
                        variant="caption"
                        className="font-semibold text-gray-600"
                      >
                        Jenis Masalah
                      </Typography>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(
                          ["Rusak", "Hilang", "Kurang", "Lainnya"] as const
                        ).map((t) => {
                          const active = draft.issueType === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold ${
                                active
                                  ? "border-primary bg-primary text-white"
                                  : "border-primary bg-white text-primary"
                              }`}
                              onClick={() =>
                                updateDraft(asset.id, { issueType: t })
                              }
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-4">
                        <Textarea
                          label="Detail Kendala"
                          value={draft.detail}
                          onChange={(e) =>
                            updateDraft(asset.id, { detail: e.target.value })
                          }
                          maxLength={150}
                          showCount
                          placeholder="Contoh: Lampu proyektor mati total saat dinyalakan"
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="mt-4">
                        <Typography
                          variant="caption"
                          className="font-semibold text-gray-600"
                        >
                          Bukti Foto (Opsional)
                        </Typography>
                        <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-gray-700">
                          <UploadIcon className="h-4 w-4" />
                          <span className="text-[12px] font-semibold">
                            Ambil / Pilih Foto
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              updateDraft(asset.id, { fileName: f?.name });
                              if (f) toast.success("Foto berhasil diunggah!");
                            }}
                          />
                        </label>

                        {draft.fileName && (
                          <Typography
                            variant="caption"
                            className="mt-1 text-gray-600"
                          >
                            {draft.fileName}
                          </Typography>
                        )}
                      </div>
                      {assets.length > 1 && (
                        <button
                          type="button"
                          className="mt-4 w-full text-right text-[12px] font-semibold text-primary"
                          onClick={goNext}
                        >
                          Lanjut ke aset berikutnya →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!isAllComplete && (
            <div className="mt-4">
              <Callout
                variant="yellow"
                showClose={false}
                message="Silahkan isi detail masing-masing kendala terlebih dahulu."
                className="px-4 py-3"
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center gap-3 rounded-b-xl bg-white px-5 py-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            disabled={!isAllComplete}
            onClick={() => {
              if (!isAllComplete) return;
              const payload: ReportIssuePayload = {
                issues: assets.map((a) => {
                  const d = getDraft(a.id);
                  return {
                    assetId: a.id,
                    issueType: d.issueType as IssueType,
                    detail: d.detail.trim(),
                    fileName: d.fileName,
                  };
                }),
              };
              onRequestSubmit?.(payload);
            }}
          >
            Laporkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
