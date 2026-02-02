import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, FlashlightIcon, GalleryIcon } from "@/components/icon";
import Typography from "@/components/typography/typography";

export function ScanQrView() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background (camera preview placeholder) */}
      <div className="absolute inset-0 bg-linear-to-b from-[#3a2f26] via-[#1f1f1f] to-[#0b0b0b]" />
      <div className="absolute inset-0 bg-black/35" />

      {/* Top bar */}
      <div className="absolute top-0 right-0 left-0 z-20 px-6 pt-[72px]">
        <Link
          to="/dosen/home"
          className="inline-flex items-center gap-2 text-white"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeftIcon className="h-[20px] w-[20px]" color="white" />
          <Typography variant="body-small" className="text-white">
            Beranda
          </Typography>
        </Link>

        <div className="mt-10 text-center">
          <Typography variant="body-large-bold" className="text-white">
            Pindai QR
          </Typography>
          <Typography variant="body-small" className="mt-1 text-white/90">
            Pindai QR untuk melihat detail aset.
          </Typography>
        </div>
      </div>

      {/* Scan frame */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/70 bg-white/5">
          {/* Corner accents */}
          <span className="absolute top-3 left-3 h-8 w-8 rounded-[10px] border-t-4 border-l-4 border-white" />
          <span className="absolute top-3 right-3 h-8 w-8 rounded-[10px] border-t-4 border-r-4 border-white" />
          <span className="absolute bottom-3 left-3 h-8 w-8 rounded-[10px] border-b-4 border-l-4 border-white" />
          <span className="absolute right-3 bottom-3 h-8 w-8 rounded-[10px] border-r-4 border-b-4 border-white" />

          {/* Animated scan line */}
          <div className="absolute inset-x-3 top-3 bottom-3">
            <div className="animate-qr-scan-line absolute top-0 right-0 left-0 h-[3px] rounded-full bg-emerald-300/90 shadow-[0_0_16px_rgba(52,211,153,0.65)]" />
          </div>

          {/* Helper text on frame */}
          <div className="absolute top-[-52px] right-0 left-0 text-center">
            <Typography variant="pixie" className="text-white/80">
              Arahkan kamera ke QR code
            </Typography>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
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
