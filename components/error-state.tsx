interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-card ring-1 ring-slate-200/70">
      <div className="flex flex-col items-center justify-center gap-5 py-12">
        <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-2xl bg-red-50 ring-1 ring-red-100">
          <svg
            className="h-7 w-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-[0.95rem] font-semibold text-slate-800">Extraction failed</p>
          <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-slate-500">{message}</p>
          <button
            onClick={onRetry}
            className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
