import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "uper-ui/button";
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
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<
    Partial<Record<string, AssetIssueDraft>>
  >({});

  useEffect(() => {
    setDrafts({});
    setExpandedId(assets[0]?.id ?? null);
    setUploadNotice(null);
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

  const isAllIssueTypeSelected = useMemo(() => {
    if (assets.length === 0) return false;
    return assets.every((a) => {
      const d = drafts[a.id];
      if (!d) return false;
      return !!d.issueType;
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

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/20"
        aria-label="Tutup modal"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-issue-title"
          aria-describedby="report-issue-desc"
          className="w-full max-w-[412px] overflow-hidden rounded-xl bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {uploadNotice && (
            <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-lg">
              <Typography variant="body-small" className="text-white">
                {uploadNotice}
              </Typography>
              <Button
                type="button"
                variant="secondary"
                className="text-3 shrink-0 rounded-md border-0 bg-white/10 px-3 py-1 font-semibold text-white hover:bg-white/20"
                onClick={() => setUploadNotice(null)}
              >
                Oke
              </Button>
            </div>
          )}

          <div className="border-b border-border bg-[#F5F5F5] px-4 py-3">
            <div id="report-issue-title">
              <Typography variant="body-large-semibold" className="text-center">
                Lapor Ketidaksesuaian Aset
              </Typography>
            </div>
            <p id="report-issue-desc" className="sr-only">
              Form untuk mengisi kendala pada aset yang dipilih, termasuk jenis
              masalah, detail kendala, dan opsi unggah foto.
            </p>
          </div>

          <div className="max-h-[70vh] overflow-auto px-4 pb-3">
            <div className="mt-3 space-y-2">
              {assets.map((asset) => {
                const isExpanded = expandedId === asset.id;
                const draft = getDraft(asset.id);
                const isComplete = !!draft.issueType;

                return (
                  <div
                    key={asset.id}
                    className="rounded-xl border border-border bg-white"
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      className="flex w-full items-center gap-3 border-0 bg-transparent px-4 py-3 text-left hover:bg-transparent"
                      onClick={() =>
                        setExpandedId((prev) =>
                          prev === asset.id ? null : asset.id
                        )
                      }
                    >
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-2 rounded-full border px-2 py-0.5 ${
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
                            variant="body-small-semibold"
                            className="truncate text-gray-900"
                          >
                            {asset.name}
                          </Typography>
                        </div>
                      </div>
                      <div className="shrink-0 text-gray-700">
                        <div
                          className={
                            isExpanded ? "rounded-full bg-gray-300" : ""
                          }
                        >
                          {isExpanded ? (
                            <CaretUpIcon className="h-10 w-10 p-0" />
                          ) : (
                            <CaretDownIcon className="h-10 w-10 p-0" />
                          )}
                        </div>
                      </div>
                    </Button>

                    {isExpanded && (
                      <div className="border-t border-border bg-white px-4 pt-3 pb-4">
                        <Typography
                          variant="caption-small"
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
                              <Button
                                key={t}
                                type="button"
                                variant={active ? "primary" : "secondary"}
                                className={`text-3 rounded-lg border px-3 py-1.5 font-semibold ${
                                  active
                                    ? "border-primary bg-primary text-white"
                                    : "border-primary bg-white text-primary"
                                }`}
                                onClick={() =>
                                  updateDraft(asset.id, { issueType: t })
                                }
                              >
                                {t}
                              </Button>
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
                            className="min-h-[96px]"
                          />
                        </div>

                        <div className="mt-4">
                          <Typography
                            variant="caption-small"
                            className="font-semibold text-gray-600"
                          >
                            Bukti Foto (Opsional)
                          </Typography>
                          <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3 text-gray-700">
                            <UploadIcon className="h-4 w-4" />
                            <span className="text-3 font-semibold">
                              Ambil / Pilih Foto
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                updateDraft(asset.id, { fileName: f?.name });
                                if (f) {
                                  setUploadNotice("Foto berhasil diunggah!");
                                  toast.success("Foto berhasil diunggah!");
                                }
                              }}
                            />
                          </label>

                          {draft.fileName && (
                            <Typography
                              variant="caption-small"
                              className="mt-1 text-gray-600"
                            >
                              {draft.fileName}
                            </Typography>
                          )}
                        </div>
                        {assets.length > 1 &&
                          asset.id !== assets[assets.length - 1].id && (
                            <Button
                              type="button"
                              variant="secondary"
                              className="text-3 mt-4 h-auto w-full border-0 bg-transparent p-0 text-right font-semibold text-primary hover:bg-transparent"
                              onClick={goNext}
                            >
                              Lanjut ke aset berikutnya →
                            </Button>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!isAllComplete && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2">
                <ErrorIcon className="mt-px h-5 w-5 text-yellow-700" />
                <Typography
                  variant="body-small"
                  className="text-3 text-gray-700"
                >
                  Silahkan isi detail masing-masing kendala terlebih dahulu.
                </Typography>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-border bg-white px-4 py-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="flex-1 disabled:bg-gray-200 disabled:text-gray-600 disabled:hover:bg-gray-300"
              disabled={!isAllIssueTypeSelected}
              onClick={() => {
                if (!isAllIssueTypeSelected) return;
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
          </div>
        </div>
      </div>
    </div>
  );
}
