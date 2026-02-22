import { useNavigate } from "@tanstack/react-router";
import { BrowserQRCodeReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowBackIcon, GalleryIcon, GladiIcon } from "uper-ui/icon";
import { toast } from "uper-ui/toast";
import { Typography } from "uper-ui/typography";

// Custom hook for QR code reader setup
function useQRCodeReader(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  onQRDetected: (qrText: string) => void,
  onError: (error: string) => void
) {
  const readerRef = useRef<BrowserQRCodeReader | null>(null);
  const handledRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function initializeCamera() {
      onError("");
      readerRef.current = new BrowserQRCodeReader();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
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
            toast.success("QR terdeteksi");
            stopCamera();
            onQRDetected(result.getText());
          } else if (err && !(err instanceof NotFoundException)) {
            onError("Gagal membaca QR. Coba lagi.");
          }
        });
      } catch (error) {
        if (cancelled) return;
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Tidak bisa mengakses kamera. Pastikan izin kamera diberikan.";
        onError(errorMessage);
      }
    }

    void initializeCamera();

    return () => {
      cancelled = true;
      handledRef.current = false;
      stopCamera();
    };

    function stopCamera() {
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
        // ignore cleanup errors
      }

      const stream = videoRef.current?.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    }
  }, [videoRef, onQRDetected, onError]);
}

export function ScanQrView() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraError, setCameraError] = useState<string>("");

  const handleQRDetected = useCallback(
    (qrText: string) => {
      navigate({
        to: "/housekeeping/room-checklist/$roomId",
        params: { roomId: qrText || "0001" },
      });
    },
    [navigate]
  );

  const handleNavigateBack = useCallback(() => {
    navigate({ to: "/housekeeping/checklist-dashboard" });
  }, [navigate]);

  const handleFlashlight = useCallback(() => {
    // TODO: Implement flashlight toggle
  }, []);

  const handleGallery = useCallback(() => {
    // TODO: Implement gallery/upload QR from image
  }, []);

  useQRCodeReader(videoRef, handleQRDetected, setCameraError);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <CameraPreview videoRef={videoRef} />
      <ScanHeader cameraError={cameraError} onBackClick={handleNavigateBack} />
      <ScanFrame />
      <BottomActions
        onFlashlightClick={handleFlashlight}
        onGalleryClick={handleGallery}
      />
    </div>
  );
}

// Subcomponent: Camera preview with video element
function CameraPreview({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover brightness-95 contrast-110"
        playsInline
        muted
      />
      <div className="absolute inset-0 bg-black/20" />
    </>
  );
}

// Subcomponent: Top header with back button and instructions
function ScanHeader({
  cameraError,
  onBackClick,
}: {
  cameraError: string;
  onBackClick: () => void;
}) {
  return (
    <div className="absolute top-0 right-0 left-0 z-20 px-6">
      <button
        type="button"
        onClick={onBackClick}
        className="inline-flex items-center gap-2 py-12 text-white"
        aria-label="Kembali ke Daftar Ruangan"
      >
        <ArrowBackIcon className="h-5 w-5" color="white" />
        <Typography variant="body-small" className="text-white">
          Daftar Ruangan
        </Typography>
      </button>

      <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
        <Typography variant="body-large-bold" className="text-white">
          Pindai QR
        </Typography>
        <Typography variant="body-medium" className="text-white">
          Pindai QR untuk melihat detail aset.
        </Typography>
        {cameraError && (
          <Typography variant="caption-pixie" className="text-red-400">
            {cameraError}
          </Typography>
        )}
      </div>
    </div>
  );
}

// Subcomponent: Scan frame with animated line
function ScanFrame() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-12">
      <div className="relative aspect-square w-full rounded-xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"></div>
    </div>
  );
}

// Subcomponent: Bottom action buttons
function BottomActions({
  onFlashlightClick,
  onGalleryClick,
}: {
  onFlashlightClick: () => void;
  onGalleryClick: () => void;
}) {
  return (
    <div className="absolute right-0 bottom-10 left-0 z-20 flex items-center justify-between gap-16 px-12">
      <ActionButton
        onClick={onFlashlightClick}
        icon={<GladiIcon className="h-10 w-10" />}
        ariaLabel="Flashlight"
      />
      <ActionButton
        onClick={onGalleryClick}
        icon={<GalleryIcon className="h-10 w-10" />}
        ariaLabel="Galeri"
      />
    </div>
  );
}

// Subcomponent: Reusable action button
function ActionButton({
  onClick,
  icon,
  ariaLabel,
}: {
  onClick: () => void;
  icon: ReactNode;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
