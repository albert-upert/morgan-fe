import type { CSSProperties } from "react";
import { Toaster as ToasterPrimitive, toast as sonnerToast } from "sonner";
import type { ExternalToast, ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

function Toaster({ ...props }: ToasterProps) {
  return (
    <ToasterPrimitive
      className="toaster group"
      style={
        {
          "--normal-bg": "#262626",
          "--normal-text": "#ffffff",
          "--normal-border": "transparent",
          "--error-bg": "#ca161c",
          "--error-text": "#ffffff",
          "--error-border": "transparent",
          "--border-radius": "8px",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: cn(
            "flex w-[690px] items-start gap-2 rounded-lg px-4 py-3 font-['Poppins'] text-base leading-6 text-white shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]"
          ),
          title: "flex-1 whitespace-pre-wrap",
          description: "flex-1 whitespace-pre-wrap",
          actionButton: "shrink-0",
          cancelButton: "shrink-0",
          error: "bg-[#ca161c]",
          success: "bg-[#262626]",
          warning: "bg-[#262626]",
          info: "bg-[#262626]",
        },
      }}
      {...props}
    />
  );
}

// Custom toast helpers matching the Figma design
const toast = {
  default: (message: string, options?: ExternalToast) => {
    return sonnerToast(message, {
      ...options,
      className: "bg-[#262626]",
      action: options?.action || {
        label: "Oke",
        onClick: () => {},
      },
    });
  },
  error: (message: string, options?: ExternalToast) => {
    return sonnerToast.error(message, {
      ...options,
      className: "bg-[#ca161c]",
      action: options?.action || {
        label: "Oke",
        onClick: () => {},
      },
    });
  },
  success: (message: string, options?: ExternalToast) => {
    return sonnerToast.success(message, {
      ...options,
      className: "bg-[#262626]",
      action: options?.action || {
        label: "Oke",
        onClick: () => {},
      },
    });
  },
  info: (message: string, options?: ExternalToast) => {
    return sonnerToast.info(message, {
      ...options,
      className: "bg-[#262626]",
      action: options?.action || {
        label: "Oke",
        onClick: () => {},
      },
    });
  },
  warning: (message: string, options?: ExternalToast) => {
    return sonnerToast.warning(message, {
      ...options,
      className: "bg-[#262626]",
      action: options?.action || {
        label: "Oke",
        onClick: () => {},
      },
    });
  },
  custom: (message: string, options?: ExternalToast) => {
    return sonnerToast.custom(message, options);
  },
  promise: sonnerToast.promise,
  loading: sonnerToast.loading,
  dismiss: sonnerToast.dismiss,
};

export { Toaster, toast };
