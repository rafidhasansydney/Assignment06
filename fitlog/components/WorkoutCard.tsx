import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-line-5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
    >
      <img
        src={workout.image}
        alt={workout.name}
        loading="lazy"
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-between p-6">
        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.05em] text-black"
              >
                {group}
              </span>
            ))}
          </div>
          <h3 className="mt-2 font-display text-lg font-bold uppercase tracking-[0.025em]">
            {workout.name}
          </h3>
          <p className="mt-1 text-xs text-muted">{workout.equipment}</p>
        </div>
        <div className="mt-4 flex items-center gap-4 border-t border-line-4 pt-3">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Clock className="h-3.5 w-3.5" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Flame className="h-3.5 w-3.5" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Star className="h-3.5 w-3.5" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
