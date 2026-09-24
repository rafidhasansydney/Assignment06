"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Check, Info } from "lucide-react";

type ToastKind = "success" | "info";

type ToastItem = {
  id: number;
  message: string;
  kind: ToastKind;
};

const ToastContext = createContext<{ showToast: (message: string, kind?: ToastKind) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast has to be used inside ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const showToast = useCallback((message: string, kind: ToastKind = "success") => {
    counter.current += 1;
    const id = counter.current;
    setToasts((current) => [...current, { id, message, kind }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-[300px] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast-in flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3 shadow-lg shadow-black/40"
          >
            {toast.kind === "success" ? (
              <Check className="h-4 w-4 shrink-0 text-accent" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-muted" />
            )}
            <span className="text-sm text-soft">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
