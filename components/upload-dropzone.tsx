'use client';

import { useRef, useState } from 'react';
import { validateFile } from '@/lib/utils/validate-file';

interface UploadDropzoneProps {
  onFile: (file: File) => void;
}

export function UploadDropzone({ onFile }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleFile(file: File) {
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    onFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="w-full">
      <div
        className={`rounded-2xl border bg-white p-5 transition-all duration-200 ease-out ${
          dragActive
            ? 'border-blue-200/90 bg-white shadow-card-active ring-1 ring-blue-100/80'
            : 'border-slate-200/85 bg-white shadow-card ring-1 ring-slate-200/70'
        }`}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload PDF invoice"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-8 rounded-[1.25rem] border border-dashed px-7 py-[4.75rem] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            dragActive
              ? 'border-blue-300 bg-blue-50/70'
              : 'border-slate-200 bg-slate-50/80 hover:border-blue-200 hover:bg-blue-50/45'
          }`}
        >
          <div
            className={`flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.4rem] transition-all duration-150 ease-out ${
              dragActive
                ? 'bg-blue-100 ring-1 ring-blue-200'
                : 'bg-white/95 shadow-card-soft ring-1 ring-slate-200/80'
            }`}
          >
            <svg
              className={`h-9 w-9 transition-colors duration-200 ease-out ${
                dragActive ? 'text-blue-500' : 'text-slate-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          {/* Text hierarchy */}
          <div className="text-center">
            <p className="text-[0.98rem] font-semibold text-slate-900">
              Drag &amp; drop your invoice PDF here
            </p>
            <p className="mt-2.5 text-sm font-medium text-blue-600">or click to browse</p>
            <p className="mt-4 text-xs font-medium tracking-[0.02em] text-slate-500">PDF only &bull; Max 10MB</p>
          </div>
        </div>
      </div>

      {validationError && (
        <p className="mt-3 text-sm text-red-600">{validationError}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
