import Link from "next/link";
import { ArrowRight, Download, Shield, Clock, Star, CheckCircle, Zap, Flame, Sparkles, Grid3X3, TrendingUp, Plus } from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionP,
  fadeUp,
  staggerContainer,
} from "@/components/motion-wrapper";

const categories = [
  { name: "Creatures", icon: "🦁", count: 3 },
  { name: "Storage", icon: "📦", count: 3 },
  { name: "Pets", icon: "🐕", count: 3 },
  { name: "World Gen", icon: "🌍", count: 3 },
  { name: "Tech", icon: "⚙️", count: 1 },
  { name: "Magic", icon: "✨", count: 1 },
];

export default async function Home() {
  const featuredMods = curatedMods.slice(0, 4);
  const trendingMods = curatedMods.slice(4, 12);
  const newMods = curatedMods.slice(12, 20);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Zap className="h-4 w-4" />
              <span>Minecraft 1.21.11 Ready</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              The Best{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Minecraft Mods
              </span>
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Curated collection of {curatedMods.length}+ premium mods for Forge 1.21.11. 
              Download, install, and play in minutes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/mods"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
                <Download className="h-5 w-5" />
                Browse Mods
              </Link>
              <Link
                href="#categories"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/50 px-8 font-semibold transition-all hover:bg-card"
              >
                View Categories
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Virus Scanned</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Safe Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Regular Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured Mods</h2>
              <p className="text-sm text-muted-foreground mt-1">Hand-picked by our team</p>
            </div>
            <Link href="/mods" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredMods.map((mod, i) => (
              <Link
                key={mod.slug}
                href={`/mods/${mod.slug}`}
                className="group relative rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="absolute top-4 right-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-3xl shadow-inner">
                    {mod.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                      {mod.title}
                    </h3>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary mt-1">
                      {mod.category}
                    </span>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                  {mod.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Forge 1.21.11</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Download <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Categories</h2>
            <p className="text-sm text-muted-foreground mt-1">Browse mods by type</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/mods"
                className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <span className="text-4xl mb-2">{cat.icon}</span>
                <span className="font-medium text-sm">{cat.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{cat.count} mods</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Mods */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-500" />
              <div>
                <h2 className="text-2xl font-bold">Trending Now</h2>
                <p className="text-sm text-muted-foreground mt-1">Most popular this week</p>
              </div>
            </div>
            <Link href="/mods" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMods.map((mod, i) => (
              <Link
                key={mod.slug}
                href={`/mods/${mod.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
                  {mod.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {mod.description}
                  </p>
                  <span className="mt-2 inline-block text-xs text-primary">
                    Forge 1.21.11
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Mods */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plus className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">New Additions</h2>
                <p className="text-sm text-muted-foreground mt-1">Recently added to collection</p>
              </div>
            </div>
            <Link href="/mods" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newMods.map((mod, i) => (
              <Link
                key={mod.slug}
                href={`/mods/${mod.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-xl">
                  {mod.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {mod.description}
                  </p>
                  <span className="mt-2 inline-block text-xs text-primary">
                    {mod.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-card overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Enhance Your Game?
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Browse our curated collection of {curatedMods.length}+ mods and find the perfect additions for your Minecraft world.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/mods"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                >
                  <Download className="h-5 w-5" />
                  Browse All Mods
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
