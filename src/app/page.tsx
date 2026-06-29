import Link from "next/link";
import { ArrowRight, Download, Shield, Clock, CheckCircle, Zap, Flame, Plus } from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";

const categories = [
  { name: "Creatures", count: 3 },
  { name: "Storage", count: 3 },
  { name: "Pets", count: 3 },
  { name: "World Gen", count: 3 },
  { name: "Tech", count: 1 },
  { name: "Magic", count: 1 },
];

export default async function Home() {
  const featuredMods = curatedMods.slice(0, 4);
  const trendingMods = curatedMods.slice(4, 12);
  const newMods = curatedMods.slice(12, 20);

  return (
    <main className="min-h-screen">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured Mods</h2>
              <p className="mt-1 text-sm text-muted-foreground">Hand-picked by our team</p>
            </div>
            <Link href="/mods" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredMods.map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={mod.image} 
                    alt={mod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-xs font-bold text-white">
                      FORGE
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{mod.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{mod.category}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{mod.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Categories</h2>
            <p className="mt-1 text-sm text-muted-foreground">Browse mods by type</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/mods"
                className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <span className="mb-2 text-3xl">🎮</span>
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{cat.count} mods</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-orange-500" />
              <div>
                <h2 className="text-2xl font-bold">Trending Now</h2>
                <p className="mt-1 text-sm text-muted-foreground">Most popular this week</p>
              </div>
            </div>
            <Link href="/mods" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMods.map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img src={mod.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{mod.description}</p>
                  <span className="mt-2 inline-block text-xs text-primary">{mod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Plus className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">New Additions</h2>
                <p className="mt-1 text-sm text-muted-foreground">Recently added to collection</p>
              </div>
            </div>
            <Link href="/mods" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newMods.map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img src={mod.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{mod.description}</p>
                  <span className="mt-2 inline-block text-xs text-primary">{mod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-card">
            <div className="px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Enhance Your Game?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
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
