import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
      <Flame className="size-16 text-orange-500 animate-pulse" />

      <h1 className="mt-6 text-5xl font-extrabold tracking-tight">404</h1>

      <p className="mt-4 text-xl font-semibold text-muted-foreground">
        You seem lost in the Nether
      </p>

      <p className="mt-2 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist — perhaps a Ghast
        blew it up, or maybe you typed the wrong coordinates.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <Home className="size-4" />
          Back to Overworld
        </Link>
        <Link
          href="/mods"
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-6 font-medium transition-colors hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Browse Mods
        </Link>
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Pro tip:</strong> Check the URL
          for typos, or use the search bar to find what you&apos;re looking for.
        </p>
      </div>
    </div>
  );
}
