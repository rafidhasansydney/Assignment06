"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import WorkoutCard from "@/components/WorkoutCard";

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="h-48 w-full bg-white/5" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-24 rounded-full bg-white/5" />
        <div className="h-6 w-3/4 bg-white/5" />
        <div className="h-4 w-1/2 bg-white/5" />
        <div className="mt-6 h-4 w-2/3 bg-white/5" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setFailed(true));
  }, []);

  const retry = () => {
    setFailed(false);
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setFailed(true));
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <section className="flex flex-col items-center gap-10 rounded-2xl border border-line bg-panel p-6 sm:p-10 lg:flex-row lg:justify-between lg:p-14">
        <div className="flex max-w-[558px] flex-col gap-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.025em] sm:text-5xl lg:text-[60px]">
            Train with intent. Log every set.
          </h1>
          <p className="max-w-[482px] text-base leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-md bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.025em] text-black shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:brightness-95"
          >
            Browse Workouts
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
        <Image
          src="/banner.png"
          alt="Muscular figure training on a gym machine"
          width={334}
          height={334}
          priority
          className="size-44 sm:size-64 lg:size-[334px]"
        />
      </section>

      <section id="library" className="mt-8 sm:mt-12">
        <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.025em]">
          The Library
        </h2>
        <p className="mt-1 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {failed ? (
            <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl border border-line bg-panel py-16 text-center">
              <p className="text-sm text-muted">
                Couldn&apos;t load workouts. Check your connection.
              </p>
              <button
                onClick={retry}
                className="rounded-md border border-line-6 px-4 py-2 text-xs font-medium text-soft transition hover:border-white/40"
              >
                Try Again
              </button>
            </div>
          ) : workouts === null ? (
            Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
          ) : (
            workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
