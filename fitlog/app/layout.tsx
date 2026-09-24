import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { PlanProvider } from "@/context/PlanProvider";
import { ToastProvider } from "@/context/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} bg-bg font-sans text-white antialiased`}
      >
        <ToastProvider>
          <PlanProvider>{children}</PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
