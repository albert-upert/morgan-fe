import { useNavigate } from "@tanstack/react-router";
import { BrowserQRCodeReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "uper-ui/icon";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";

function FlashlightIcon({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M9 2h6a2 2 0 0 1 2 2v4a1 1 0 0 1-.293.707L15 10.414V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V10.414L7.293 8.707A1 1 0 0 1 7 8V4a2 2 0 0 1 2-2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 6h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GalleryIcon({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 13.5l2-2 2.5 2.5L15.5 11 19 14.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5h.01"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScanQrView() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);
  const handledRef = useRef(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      setCameraError(null);
      readerRef.current = new BrowserQRCodeReader();

      try {
        const constraints: MediaStreamConstraints = {
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();

        readerRef.current.decodeFromVideoElement(
          video,
          (result, err: unknown) => {
            if (cancelled) return;
            if (result) {
              if (handledRef.current) return;
              handledRef.current = true;
              // const text = result.getText(); // keep if you want to parse QR payload later
              toast.success("QR terdeteksi");

              // stop camera ASAP to avoid repeated scans
              try {
                const currentStream = video.srcObject as MediaStream | null;
                currentStream?.getTracks().forEach((t) => t.stop());
              } catch {
                // ignore
              }

              // Demo: langsung ke halaman list detail aset
              navigate({
                to: "/lecturer/room-asset-list/$roomId",
                params: { roomId: "0001" },
              });
            } else if (err && !(err instanceof NotFoundException)) {
              // NotFoundException = frame belum ada QR, aman di-ignore
              setCameraError("Gagal membaca QR. Coba lagi.");
            }
          }
        );
      } catch (e) {
        if (cancelled) return;
        setCameraError(
          e instanceof Error
            ? e.message
            : "Tidak bisa mengakses kamera. Pastikan izin kamera diberikan."
        );
      }
    }

    void start();

    return () => {
      cancelled = true;
      handledRef.current = false;

      // Different versions of @zxing/browser expose different stop methods.
      const reader = readerRef.current as unknown as {
        stopContinuousDecode?: () => void;
        stopAsyncDecode?: () => void;
        reset?: () => void;
      } | null;

      try {
        reader?.stopContinuousDecode?.();
        reader?.stopAsyncDecode?.();
        reader?.reset?.();
      } catch {
        // ignore
      }

      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Camera preview */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-[1.05] object-cover blur-sm brightness-90 contrast-105 saturate-110"
        playsInline
        muted
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Top bar */}
      <div className="absolute top-0 right-0 left-0 z-20 mt-[72px] px-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/lecturer/home" })}
          className="inline-flex items-center gap-2 text-white"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-[20px] w-[20px]" color="white" />
          <Typography variant="body-small" className="text-white">
            Beranda
          </Typography>
        </button>

        <div className="mt-8 text-center">
          <Typography variant="body-large-semibold" className="text-white">
            Pindai QR
          </Typography>
          <Typography variant="body-small" className="mt-1 text-white/90">
            Pindai QR untuk melihat detail aset.
          </Typography>
          {cameraError && (
            <Typography
              variant="body-small"
              className="mt-2 text-[11px] text-white/80"
            >
              {cameraError}
            </Typography>
          )}
        </div>
      </div>

      {/* Scan frame */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border-4 border-white/80 bg-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xs">
          {/* Animated scan line */}
          <div className="absolute inset-3">
            <div className="animate-qr-scan-line absolute top-0 right-0 left-0 h-[3px] rounded-full bg-primary shadow-[0_0_16px_rgba(230,33,41,0.55)]" />
          </div>
        </div>
      </div>

      {/* Bottom actions (optional) */}
      <div className="absolute right-0 bottom-10 left-0 z-20 flex items-center justify-between gap-16 px-[50px]">
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg"
          aria-label="Flashlight"
        >
          <FlashlightIcon className="h-10 w-10" color="currentColor" />
        </button>
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg"
          aria-label="Galeri"
        >
          <GalleryIcon className="h-10 w-10" color="currentColor" />
        </button>
      </div>
    </div>
  );
}
