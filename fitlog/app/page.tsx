import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24">
      <Image src="/logo.png" alt="FitLog logo" width={56} height={56} />
      <h1 className="font-display text-4xl font-bold uppercase tracking-[0.05em]">
        FitLog
      </h1>
      <p className="text-sm text-muted">Workout library coming up.</p>
    </main>
  );
}
