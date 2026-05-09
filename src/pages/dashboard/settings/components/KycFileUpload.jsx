import { useState, useRef, useCallback } from "react";
import { Upload, X, File as FileIcon, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/motion";

export default function KycFileUpload({ label, onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const processFile = useCallback(
    async (file) => {
      if (!["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(file.type)) {
        return;
      }
      if (file.size > 5 * 1024 * 1024) return;
      setUploading(true);
      setProgress(0);
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 80));
        setProgress(i);
      }
      setUploading(false);
      setUploaded(file);
      if (file.type !== "application/pdf") {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
      onUpload(file);
    },
    [onUpload],
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleInput = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clear = () => {
    setUploaded(null);
    setPreview(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <Label className="mb-2 block text-xs font-medium text-foreground">{label}</Label>
      {!uploaded ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200",
            dragOver
              ? "scale-[1.01] border-accent bg-accent/10"
              : "border-border hover:border-accent/50 hover:bg-muted/30",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleInput}
            className="hidden"
          />
          {uploading ? (
            <div className="space-y-3">
              <div className="gradient-accent mx-auto flex h-10 w-10 animate-pulse items-center justify-center rounded-xl">
                <Upload className="h-5 w-5 text-accent-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Uploading...</p>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <motion.div
                  className="gradient-accent h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{progress}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, or PDF · Max 5MB</p>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="relative flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/5 p-4"
        >
          {preview ? (
            <img
              src={preview}
              alt="ID preview"
              className="h-14 w-14 shrink-0 rounded-lg border border-border object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileIcon className="h-7 w-7 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{uploaded.name}</p>
            <p className="text-xs text-muted-foreground">
              {(uploaded.size / 1024).toFixed(1)} KB · Uploaded
            </p>
            <div className="mt-1 flex items-center gap-1">
              <Check className="h-3 w-3 text-accent" />
              <span className="text-xs font-medium text-accent">Ready for review</span>
            </div>
          </div>
          <button
            onClick={clear}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
