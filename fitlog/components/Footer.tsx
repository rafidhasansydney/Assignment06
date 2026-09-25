import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line-3 bg-footer">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 sm:py-10">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={20} height={20} />
          <span className="font-display text-sm font-bold uppercase tracking-[0.05em]">
            FitLog
          </span>
        </div>
        <p className="text-xs text-muted-3">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
