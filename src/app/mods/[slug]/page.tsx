import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Download,
  Shield,
  ChevronLeft,
  CheckCircle,
  Clock,
  FileText,
  HardDrive,
  Lock,
  Star,
} from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
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
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Mods
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Icon & Info */}
            <div className="flex items-start gap-5 flex-1">
              <div className="relative h-24 w-32 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-border/50">
                <img src={mod.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-bold">{mod.title}</h1>
                  <span className="inline-flex items-center rounded-md bg-primary/20 px-2 py-1 text-xs font-semibold text-primary border border-primary/30">
                    FORGE 1.21.11
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400 border border-green-500/30">
                    <CheckCircle className="h-3 w-3" />
                    VERIFIED
                  </span>
                </div>
                
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  {mod.description}
                </p>

                {/* Trust Badges */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Virus Scanned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Safe Download</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>Regular Updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download */}
            <div className="shrink-0 lg:w-80">
              <a href={"/api/download/" + mod.slug} className="download-btn inline-flex w-full justify-center">
                <Download className="h-5 w-5" />
                <span>Download Mod</span>
              </a>
              
              {/* Download Info */}
              <div className="mt-4 rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">1.21.11</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Loader</span>
                  <span className="font-medium">Forge</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="font-medium">~1 MB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">Recently</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial */}
      <div className="bg-card/50 border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              <div className="relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-black">
                <video
                  src="/how-to-install.mp4"
                  controls
                  loop
                  muted
                  playsInline
                  className="w-full md:w-[320px] h-[180px] md:h-[200px] object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Installation Tutorial
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Watch the video to see how to install mods. Then download and install with Forge 1.21.11.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a href={`/api/download/${mod.slug}`} className="download-btn inline-flex px-6 py-2">
                  <Download className="h-4 w-4" />
                  Download Mod
                </a>
                <span className="text-xs text-muted-foreground">
                  Click video for fullscreen
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                About
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <span className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                    {mod.category}
                  </span>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                How to Install
              </h2>
              <div className="rounded-2xl border border-border bg-card p-6">
                <ol className="space-y-4">
                  {[
                    "Download the mod's .jar file",
                    "Open TLauncher",
                    "Click the folder icon in the bottom-left corner to open the Minecraft folder",
                    'Open the "mods" folder. If it doesn\'t exist, create it',
                    'Move the downloaded .jar file into the "mods" folder',
                    "Launch Minecraft using Forge 1.21.11",
                    "The mod is now installed and ready to use!"
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Requirements
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Lock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Loader</p>
                      <p className="font-semibold">Forge 1.21.11</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minecraft</p>
                      <p className="font-semibold">1.21.11</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                      <HardDrive className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-semibold">~1 MB</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold text-green-500">Safe & Scanned</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{mod.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="text-primary">1.21.11</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Loader</span>
                  <span className="text-primary">Forge</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Security</span>
                  <span className="text-green-500">Verified</span>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-500">Safety Guarantee</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Virus scanned & verified
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Direct download
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Original mod files
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Mods */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">More Mods</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedMods.map((m) => (
              <Link
                key={m.slug}
                href={"/mods/" + m.slug}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="shrink-0 w-14 h-10 rounded-lg overflow-hidden">
                  <img src={m.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                    {m.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {m.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
