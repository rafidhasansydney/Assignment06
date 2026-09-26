import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="font-display text-3xl font-bold uppercase tracking-[-0.025em]">
        Page not found
      </h1>
      <p className="max-w-md text-sm text-muted">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.025em] text-black transition hover:brightness-95"
      >
        Back to workouts
      </Link>
    </div>
  );
}
