import Link from "next/link";
import { ArrowRight, Download, Package, Sparkles } from "lucide-react";
import { searchProjects, formatDownloads } from "@/lib/modrinth";
import { ProjectCard } from "@/components/project-card";
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionP,
  fadeUp,
  staggerContainer,
} from "@/components/motion-wrapper";

export default async function Home() {
  let trendingMods = null;
  let recentShaders = null;
  let modCount = 0;
  let shaderCount = 0;

  try {
    const [modsResult, shadersResult] = await Promise.all([
      searchProjects("", [["project_type:mod"]], "downloads", 0, 8),
      searchProjects("", [["project_type:shader"]], "updated", 0, 4),
    ]);
    trendingMods = modsResult.hits;
    recentShaders = shadersResult.hits;
    modCount = modsResult.total_hits;
    shaderCount = shadersResult.total_hits;
  } catch {
    // fallback handled below
  }

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
          Discover{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Minecraft Mods
          </span>{" "}
          &amp; Shaders
        </MotionH1>

        <MotionP
          variants={fadeUp}
          custom={1}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          ModLume helps you find, explore, and download the best Minecraft mods
          and shaders. Powered by Modrinth.
        </MotionP>

        <MotionDiv variants={fadeUp} custom={2} className="mt-8 flex gap-4">
          <Link
            href="/mods"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Package className="size-4" />
            Browse Mods
          </Link>
          <Link
            href="/shaders"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-6 font-medium transition-colors hover:bg-muted"
          >
            <Sparkles className="size-4" />
            Browse Shaders
          </Link>
        </MotionDiv>
      </MotionSection>

      {/* Stats */}
      {(modCount > 0 || shaderCount > 0) && (
        <MotionSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-6 px-4 pb-16 md:grid-cols-3"
        >
          {[
            { label: "Mods Available", value: formatDownloads(modCount), icon: Package },
            { label: "Shaders Available", value: formatDownloads(shaderCount), icon: Sparkles },
            { label: "Powered By", value: "Modrinth", icon: Download },
          ].map((stat, i) => (
            <MotionDiv
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
            >
              <stat.icon className="mb-2 size-6 text-primary" />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </MotionDiv>
          ))}
        </MotionSection>
      )}

      {/* Trending Mods */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 py-12"
      >
        <MotionDiv variants={fadeUp} className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Mods</h2>
          <Link
            href="/trending"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </MotionDiv>

        {trendingMods ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMods.map((mod, i) => (
              <MotionDiv key={mod.project_id} variants={fadeUp} custom={i}>
                <ProjectCard
                  slug={mod.slug}
                  title={mod.title}
                  description={mod.description}
                  icon_url={mod.icon_url}
                  downloads={mod.downloads}
                  categories={mod.categories}
                  project_type={mod.project_type}
                  author={mod.author}
                  updated={mod.date_modified}
                />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Unable to load trending mods. Please try again later.
          </p>
        )}
      </MotionSection>

      {/* Recent Shaders */}
      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-4 py-12"
      >
        <MotionDiv variants={fadeUp} className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Shaders</h2>
          <Link
            href="/shaders"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </MotionDiv>

        {recentShaders ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentShaders.map((shader, i) => (
              <MotionDiv key={shader.project_id} variants={fadeUp} custom={i}>
                <ProjectCard
                  slug={shader.slug}
                  title={shader.title}
                  description={shader.description}
                  icon_url={shader.icon_url}
                  downloads={shader.downloads}
                  categories={shader.categories}
                  project_type={shader.project_type}
                  author={shader.author}
                  updated={shader.date_modified}
                />
              </MotionDiv>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Unable to load shaders. Please try again later.
          </p>
        )}
      </MotionSection>
    </main>
  );
}
