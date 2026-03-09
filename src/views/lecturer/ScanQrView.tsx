import { useNavigate } from "@tanstack/react-router";
import { BrowserQRCodeReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";
import { useEffect, useRef, useState } from "react";
import { Button } from "uper-ui/button";
import { ArrowLeftIcon, FlashlightIcon, GalleryIcon } from "uper-ui/icon";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";

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

        readerRef.current.decodeFromVideoElement(video, (result, err) => {
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
              to: "/room-asset-list/$id",
              params: { id: "0001" },
            });
          } else if (err && !(err instanceof NotFoundException)) {
            // NotFoundException = frame belum ada QR, aman di-ignore
            setCameraError("Gagal membaca QR. Coba lagi.");
          }
        });
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
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            navigate({ to: "/$module/home", params: { module: "lecturer" } })
          }
          className="inline-flex h-auto items-center gap-2 border-0 bg-transparent p-0 text-white hover:bg-transparent"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-5 w-5" color="white" />
          <Typography variant="body-small" className="text-white">
            Beranda
          </Typography>
        </Button>

        <div className="mt-8 text-center">
          <Typography variant="body-large-bold" className="text-white">
            Pindai QR
          </Typography>
          <Typography variant="body-small" className="mt-1 text-white/90">
            Pindai QR untuk melihat detail aset.
          </Typography>
          {cameraError && (
            <Typography variant="caption-pixie" className="mt-2 text-white/80">
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
            <div className="animate-qr-scan-line absolute top-0 right-0 left-0 h-1 rounded-full bg-primary shadow-[0_0_16px_rgba(230,33,41,0.55)]" />
          </div>
        </div>
      </div>

      {/* Bottom actions (optional) */}
      <div className="absolute right-0 bottom-10 left-0 z-20 flex items-center justify-between gap-16 px-[50px]">
        <Button
          type="button"
          variant="secondary"
          className="flex h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-black shadow-lg"
          aria-label="Flashlight"
        >
          <FlashlightIcon className="h-10 w-10" color="currentColor" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="flex h-14 w-14 items-center justify-center rounded-full border-0 bg-white p-0 text-black shadow-lg"
          aria-label="Galeri"
        >
          <GalleryIcon className="h-10 w-10" color="currentColor" />
        </Button>
      </div>
    </div>
  );
}
