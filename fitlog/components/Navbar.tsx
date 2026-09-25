"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const workoutsActive = pathname === "/" || pathname.startsWith("/workouts");
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="border-b border-line-3 bg-bg">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} priority />
          <span className="font-display text-lg font-bold uppercase tracking-[0.05em]">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
              workoutsActive
                ? "bg-accent-dim font-semibold text-accent"
                : "font-medium text-muted hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
              planActive
                ? "bg-accent-dim font-semibold text-accent"
                : "font-medium text-muted hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold leading-none text-black">
              {planCount}
            </span>
            <span className="text-xs font-medium text-soft">Plan</span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line-7 text-[11px] font-medium leading-none text-soft">
              {savedCount}
            </span>
            <span className="text-xs font-medium text-muted">Saved</span>
          </Link>
        </div>
      </div>

      <nav className="flex justify-center gap-2 border-t border-line-3/50 pb-3 pt-2 sm:hidden">
        <Link
          href="/"
          className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
            workoutsActive
              ? "bg-accent-dim font-semibold text-accent"
              : "font-medium text-muted"
          }`}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={`rounded-full px-4 py-1.5 text-xs transition-colors ${
            planActive
              ? "bg-accent-dim font-semibold text-accent"
              : "font-medium text-muted"
          }`}
        >
          My Plan
        </Link>
      </nav>
    </header>
  );
}
