"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Workout } from "@/lib/types";

export type PlanItem = { workout: Workout; done: boolean };

export type AddResult = "added" | "full" | "duplicate";

type PlanContextValue = {
  plan: PlanItem[];
  saved: Workout[];
  planCount: number;
  savedCount: number;
  addToPlan: (workout: Workout) => AddResult;
  removeFromPlan: (id: number) => void;
  markDone: (id: number) => void;
  saveForLater: (workout: Workout) => AddResult;
  removeFromSaved: (id: number) => void;
  isPlanned: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const MAX_PLAN_SIZE = 5;
const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

const PlanContext = createContext<PlanContextValue | null>(null);

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan has to be used inside PlanProvider");
  }
  return ctx;
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch {
      setPlan([]);
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout): AddResult => {
    if (plan.some((item) => item.workout.id === workout.id)) {
      return "duplicate";
    }
    if (plan.length >= MAX_PLAN_SIZE) {
      return "full";
    }
    setPlan((current) => [...current, { workout, done: false }]);
    return "added";
  };

  const removeFromPlan = (id: number) => {
    setPlan((current) => current.filter((item) => item.workout.id !== id));
  };

  const markDone = (id: number) => {
    setPlan((current) =>
      current.map((item) =>
        item.workout.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const saveForLater = (workout: Workout): AddResult => {
    if (saved.some((item) => item.id === workout.id)) {
      return "duplicate";
    }
    setSaved((current) => [...current, workout]);
    return "added";
  };

  const removeFromSaved = (id: number) => {
    setSaved((current) => current.filter((item) => item.id !== id));
  };

  const isPlanned = (id: number) => plan.some((item) => item.workout.id === id);
  const isSaved = (id: number) => saved.some((item) => item.id === id);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        planCount: plan.length,
        savedCount: saved.length,
        addToPlan,
        removeFromPlan,
        markDone,
        saveForLater,
        removeFromSaved,
        isPlanned,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}
