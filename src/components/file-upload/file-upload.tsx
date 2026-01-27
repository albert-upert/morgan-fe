import { useCallback, useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { Button } from "@/components/button";
import {
  CloseIcon,
  ExternalLinkIcon,
  FileIcon,
  UploadIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  accept?: string;
  maxSize?: number; // in MB
  error?: boolean;
  disabled?: boolean;
  files?: Array<File>;
  onFilesChange?: (files: Array<File>) => void;
  onRemoveFile?: (index: number) => void;
  className?: string;
  variant?: "dropzone" | "button";
  buttonLabel?: string;
}

export function FileUpload({
  label,
  helperText,
  accept = ".xls,.xlsx,.csv",
  maxSize = 5,
  error = false,
  disabled = false,
  files = [],
  onFilesChange,
  onRemoveFile,
  className,
  variant = "dropzone",
  buttonLabel = "Unggah File",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (newFiles: Array<File>) => {
      if (onFilesChange) {
        onFilesChange([...files, ...newFiles]);
      }
    },
    [files, onFilesChange]
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const droppedFiles = Array.from(event.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [disabled, handleFiles]
  );

  const handleFileSelect = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        handleFiles(selectedFiles);
      }
    },
    [handleFiles]
  );

  const handleButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }, []);

  const formattedAccept = useMemo(
    () =>
      accept
        .split(",")
        .map((ext) => ext.trim())
        .join(" & "),
    [accept]
  );

  return (
    <div className={cn("flex w-full flex-col gap-0.5", className)}>
      {label && (
        <label className="text-sm leading-[22px] text-foreground">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        disabled={disabled}
        multiple
        className="hidden"
      />

      {files.length === 0 ? (
        variant === "button" ? (
          <Button
            variant="secondary"
            size="lg"
            onClick={handleButtonClick}
            disabled={disabled}
            type="button"
            className="w-full"
          >
            <UploadIcon className="size-5" />
            {buttonLabel}
          </Button>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed bg-white px-0 py-6 transition-colors",
              isDragging && "border-primary bg-red-50",
              error && !isDragging && "border-destructive",
              !isDragging && !error && "border-border",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <UploadIcon className="h-5 w-5 shrink-0 text-muted-foreground" />

            <p className="text-center text-base font-bold text-foreground">
              Tarik & letakkan file di sini
            </p>

            <p className="text-center text-sm text-foreground">Atau</p>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleButtonClick}
              disabled={disabled}
              type="button"
            >
              Pilih File
            </Button>

            <p className="flex items-center gap-1 text-center text-sm text-foreground">
              <span>{formattedAccept}</span>
              <span>|</span>
              <span>{maxSize}MB</span>
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 py-2"
            >
              <FileIcon className="h-5 w-5 shrink-0 text-muted-foreground" />

              <span className="flex-1 truncate text-sm text-foreground">
                {file.name}
              </span>

              <span className="text-xs whitespace-nowrap text-muted-foreground">
                {formatFileSize(file.size)}
              </span>

              <button
                type="button"
                onClick={() => window.open(URL.createObjectURL(file), "_blank")}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ExternalLinkIcon className="size-5" />
              </button>

              {onRemoveFile && (
                <button
                  type="button"
                  onClick={() => onRemoveFile(index)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  disabled={disabled}
                >
                  <CloseIcon className="size-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <span
          className={cn(
            "text-xs leading-5",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
