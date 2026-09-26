"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { usePlan, type PlanItem } from "@/context/PlanProvider";
import { useToast } from "@/context/ToastProvider";

type SortKey = "duration" | "caloriesBurned" | "rating";

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-soft">
      {icon}
      {value}
    </span>
  );
}

function PlanCard({
  item,
  tab,
  onMarkDone,
  onRemove,
}: {
  item: PlanItem;
  tab: "plan" | "saved";
  onMarkDone: (workout: Workout, done: boolean) => void;
  onRemove: (workout: Workout) => void;
}) {
  const { workout, done } = item;

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-line-2 bg-[#14171e] p-4 transition-colors hover:border-line-5 sm:flex-row sm:items-center sm:justify-between ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-20 w-36 shrink-0 rounded-xl object-cover"
        />
        <div className="min-w-0">
          <h3
            className={`font-display text-base font-bold uppercase tracking-[0.025em] ${
              done ? "line-through decoration-accent" : ""
            }`}
          >
            {workout.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-2">{workout.equipment}</p>
          <div className="mt-1.5 flex items-center gap-3">
            <Stat
              icon={<Clock className="h-3.5 w-3.5 text-accent" />}
              value={`${workout.duration} min`}
            />
            <Stat
              icon={<Flame className="h-3.5 w-3.5 text-accent" />}
              value={`${workout.caloriesBurned} kcal`}
            />
            <Stat
              icon={<Star className="h-3.5 w-3.5 text-accent" />}
              value={String(workout.rating)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-line-6 px-4 py-2 text-xs font-medium text-white transition hover:border-white/40"
        >
          View Details
        </Link>
        {tab === "plan" && (
          <button
            onClick={() => onMarkDone(workout, !done)}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-black transition hover:brightness-95"
          >
            <Check className="h-3.5 w-3.5" />
            {done ? "Marked done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => onRemove(workout)}
          aria-label={`Remove ${workout.name}`}
          className="rounded-full p-1.5 text-muted transition hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-white/15 bg-[#111317]/50 px-4 py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-[0.035em]">
        Nothing here yet
      </h3>
      <p className="mt-2 text-xs text-[#a1a1aa]">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-black transition hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, markDone, removeFromPlan, removeFromSaved } = usePlan();
  const { showToast } = useToast();
  const [tab, setTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setWorkouts([]));
  }, []);

  const planItems = useMemo(() => {
    if (workouts === null) return null;
    return plan.map((item) => ({
      ...item,
      workout: workouts.find((w) => w.id === item.workout.id) ?? item.workout,
    }));
  }, [plan, workouts]);

  const savedItems = useMemo(() => {
    if (workouts === null) return null;
    return saved.map((workout) => ({
      workout: workouts.find((w) => w.id === workout.id) ?? workout,
      done: false,
    }));
  }, [saved, workouts]);

  const items =
    tab === "plan"
      ? planItems && [...planItems].sort((a, b) => a.workout[sortBy] - b.workout[sortBy])
      : savedItems && [...savedItems].sort((a, b) => a.workout[sortBy] - b.workout[sortBy]);

  const totalMinutes = plan.reduce((sum, item) => sum + item.workout.duration, 0);
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.workout.caloriesBurned,
    0
  );

  const handleMarkDone = (workout: Workout, done: boolean) => {
    markDone(workout.id);
    showToast(done ? "Marked as done" : "Marked as not done", done ? "success" : "info");
  };

  const handleRemove = (workout: Workout) => {
    if (tab === "plan") {
      removeFromPlan(workout.id);
      showToast("Removed from today's plan", "info");
    } else {
      removeFromSaved(workout.id);
      showToast("Removed from saved", "info");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-10 lg:px-12">
      <section>
        <h1 className="font-display text-3xl font-bold uppercase tracking-[-0.025em]">
          My Plan
        </h1>
        <p className="mt-2 text-sm text-muted-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      <section className="mt-6">
        <div className="rounded-2xl border border-line-2 bg-panel-2 py-6 sm:py-8">
          <div className="grid grid-cols-1 divide-y divide-line-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-2 sm:py-0">
              <p className="text-xs text-muted-2">Exercises</p>
              <p className="mt-1 font-display text-4xl font-bold text-accent">
                {plan.length}
              </p>
            </div>
            <div className="px-6 py-2 sm:py-0">
              <p className="text-xs text-muted-2">Minutes</p>
              <p className="mt-1 font-display text-4xl font-bold">
                {totalMinutes}
              </p>
            </div>
            <div className="px-6 py-2 sm:py-0">
              <p className="text-xs text-muted-2">Calories</p>
              <p className="mt-1 font-display text-4xl font-bold">
                {totalCalories}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-line-2 bg-[#151921] p-1">
          <button
            onClick={() => setTab("plan")}
            className={`rounded-lg px-4 py-1.5 text-xs transition ${
              tab === "plan"
                ? "border border-line-5 bg-[#1f242d] font-bold text-white"
                : "text-muted-2 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`rounded-lg px-4 py-1.5 text-xs transition ${
              tab === "saved"
                ? "border border-line-5 bg-[#1f242d] font-bold text-white"
                : "text-muted-2 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-2">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="appearance-none rounded-lg border border-line-2 bg-panel-2 py-2 pl-3 pr-8 text-xs text-white focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white" />
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-4">
        {items === null ? (
          <p className="animate-pulse py-16 text-center text-sm text-muted-2">
            Loading workouts…
          </p>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((item) => (
            <PlanCard
              key={`${tab}-${item.workout.id}`}
              item={item}
              tab={tab}
              onMarkDone={handleMarkDone}
              onRemove={handleRemove}
            />
          ))
        )}
      </section>
    </div>
  );
}
