export function LoadingState() {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-card ring-1 ring-slate-200/70">
      <div className="flex flex-col items-center justify-center gap-5 py-14">
        <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-2xl bg-white shadow-card-soft ring-1 ring-slate-200/80">
          <div className="h-6 w-6 animate-spin rounded-full border-[2.5px] border-slate-200 border-t-blue-600" />
        </div>
        <div className="text-center">
          <p className="text-[0.95rem] font-semibold text-slate-800">Extracting invoice data…</p>
          <p className="mt-1.5 text-sm text-slate-400">This usually takes a few seconds</p>
        </div>
      </div>
    </div>
  );
}
