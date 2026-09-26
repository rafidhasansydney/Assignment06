import type { Workout } from "./types";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Could not load workouts");
  }
  return res.json();
}

export async function getWorkout(id: number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Could not load this workout");
  }
  return res.json();
}
