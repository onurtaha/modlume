import Link from "next/link";
import { ArrowRight, Download, Package, Sparkles, Shield } from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionP,
  fadeUp,
  staggerContainer,
} from "@/components/motion-wrapper";

export default async function Home() {
  const featuredMods = curatedMods.slice(0, 8);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative flex flex-col items-center justify-center px-4 py-24 text-center md:py-32"
      >
        <MotionH1
          variants={fadeUp}
          custom={0}
          className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
        >
          Best{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Minecraft Mods
          </span>{" "}
          for 1.21.11
        </MotionH1>

        <MotionP
          variants={fadeUp}
          custom={1}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Curated selection of the best mods with Forge 1.21.11 support. 
          Download, install, and play.
        </MotionP>

        <MotionDiv variants={fadeUp} custom={2} className="mt-8 flex gap-4">
          <Link
            href="/mods"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Package className="size-4" />
            Browse All Mods
          </Link>
        </MotionDiv>
      </MotionSection>

      {/* Featured Mods */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 py-12"
      >
        <MotionDiv variants={fadeUp} className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Mods</h2>
          <Link
            href="/mods"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </MotionDiv>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredMods.map((mod, i) => (
            <MotionDiv key={mod.slug} variants={fadeUp} custom={i}>
              <Link
                href={`/mods/${mod.slug}`}
                className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                    {mod.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {mod.description}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {mod.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Forge 1.21.11
                  </span>
                </div>
              </Link>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      {/* Info Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold">How It Works</h3>
              <p className="mt-2 text-muted-foreground">
                Pick a mod, download the .jar file, and install it with Forge 1.21.11. 
                Watch our tutorial video for step-by-step guidance. All mods are tested and working.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/mods"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
