import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Download,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mod = curatedMods.find(m => m.slug === slug);
  if (!mod) return { title: "Mod Not Found - ModLume" };
  return {
    title: `${mod.title} - ModLume`,
    description: mod.description,
  };
}

export default async function ModPage({ params }: Props) {
  const { slug } = await params;
  const mod = curatedMods.find(m => m.slug === slug);
  
  if (!mod) notFound();

  // Get related mods (exclude current)
  const relatedMods = curatedMods
    .filter(m => m.slug !== slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/mods"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Mods
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Icon */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-muted text-5xl shadow-lg">
              {mod.icon}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold">{mod.title}</h1>
                <span className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                  FORGE 1.21.11
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {mod.description}
              </p>
            </div>

            {/* Download */}
            <div className="shrink-0">
              <a href={`/api/download/${mod.slug}`} className="download-btn inline-flex">
                <Download className="h-5 w-5" />
                <span>Download Mod</span>
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Minecraft 1.21.11 • Forge Required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-card/50 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <video
                src="/how-to-install.mp4"
                controls
                loop
                muted
                playsInline
                className="h-24 w-auto rounded-lg border border-border shadow-md"
              />
            </div>
            <div>
              <p className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Tutorial
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Watch the video above • Then download and install with Forge 1.21.11
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">How to Install</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
              Download the mod&apos;s .jar file
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
              Open TLauncher
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">3</span>
              Click the folder icon in the bottom-left corner to open the Minecraft folder
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">4</span>
              Open the &quot;mods&quot; folder. If it doesn&apos;t exist, create it
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">5</span>
              Move the downloaded .jar file into the &quot;mods&quot; folder
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">6</span>
              Launch Minecraft using <strong className="text-foreground">Forge 1.21.11</strong>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">7</span>
              The mod is now installed and ready to use!
            </li>
          </ol>
        </div>
      </div>

      {/* Related Mods */}
      <div className="container mx-auto px-4 py-8 border-t border-border/50">
        <h2 className="mb-6 text-xl font-semibold">More Mods</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedMods.map((m) => (
            <Link
              key={m.slug}
              href={`/mods/${m.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                  {m.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {m.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
