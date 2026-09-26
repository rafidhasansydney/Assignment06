"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanProvider";
import { useToast } from "@/context/ToastProvider";

export default function WorkoutDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { showToast } = useToast();
  const { addToPlan, saveForLater, planCount } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getWorkout(id)
      .then(setWorkout)
      .catch(() => setFailed(true));
  }, [id]);

  const handleAdd = () => {
    if (!workout) return;
    const result = addToPlan(workout);
    if (result === "added") {
      showToast("Added to today's plan");
    } else if (result === "duplicate") {
      showToast("Already in today's plan", "info");
    } else if (result === "full") {
      showToast("Today's plan is full — finish a lift first", "info");
    }
  };

  const handleSave = () => {
    if (!workout) return;
    const result = saveForLater(workout);
    if (result === "added") {
      showToast("Saved for later");
    } else if (result === "duplicate") {
      showToast("Already saved", "info");
    }
  };

  if (failed) {
    return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold uppercase">
          Workout not found
        </h1>
        <p className="text-sm text-muted">
          This lift doesn&apos;t exist in the library.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-md bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.025em] text-black transition hover:brightness-95"
        >
          Back to the library
        </Link>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid animate-pulse gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="h-72 rounded-2xl bg-panel sm:h-96 lg:h-[600px]" />
          <div className="space-y-5">
            <div className="h-10 w-3/4 rounded-lg bg-panel" />
            <div className="h-4 w-full rounded bg-panel" />
            <div className="h-4 w-2/3 rounded bg-panel" />
            <div className="h-52 rounded-2xl bg-panel" />
          </div>
        </div>
      </div>
    );
  }

  const planFull = planCount >= 5;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", String(workout.rating)],
  ];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-2xl border border-line-2 bg-header shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[600px]"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-display text-3xl font-bold uppercase tracking-[-0.025em] sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-accent px-3.5 py-1 text-xs font-semibold text-header"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line-2 bg-panel-3">
            {specs.map(([label, value], index) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-6 px-6 py-3.5 ${
                  index > 0 ? "border-t border-line-2" : ""
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-[0.05em] text-muted">
                  {label}
                </span>
                <span className="text-sm font-medium text-soft">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <h2 className="text-base font-extrabold uppercase tracking-[0.05em]">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-muted">{index + 1}.</span>
                  <span className="text-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={handleAdd}
              disabled={planFull}
              title={planFull ? "Today's plan already has 5 lifts" : undefined}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-header shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Add to today's plan
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl border border-line-6 px-6 py-3 text-sm font-medium text-soft transition hover:border-white/40"
            >
              <Bookmark className="h-4 w-4" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
