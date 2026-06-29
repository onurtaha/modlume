import Link from "next/link";
import { ArrowRight, Download, Shield, Clock, CheckCircle, Zap, Flame, Star, Sparkles, Cpu, Box } from "lucide-react";
import { curatedMods } from "@/lib/curatedMods";

const stats = [
  { icon: Box, label: "Mods", value: curatedMods.length },
  { icon: Shield, label: "Safe", value: "100%" },
  { icon: Zap, label: "Fast", value: "DL" },
];

const categories = [
  { name: "Optimization", emoji: "⚡", count: 3 },
  { name: "Storage", emoji: "📦", count: 3 },
  { name: "World Gen", emoji: "🗺️", count: 4 },
  { name: "Mobs", emoji: "🐉", count: 4 },
  { name: "Decoration", emoji: "🏠", count: 5 },
  { name: "Utility", emoji: "🔧", count: 2 },
];

export default async function Home() {
  const featuredMods = curatedMods.slice(0, 8);
  const trendingMods = curatedMods.slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Minecraft 1.21.11 Ready</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                ModLume
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
              The best Minecraft mods in one place. Download, install, play.
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
                href="/tutorial"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/50 px-8 font-semibold transition-all hover:bg-card"
              >
                <Shield className="h-5 w-5" />
                How to Install
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">Popular</span>
              </div>
              <h2 className="text-2xl font-bold">Featured Mods</h2>
            </div>
            <Link href="/mods" className="flex items-center gap-1 text-sm text-primary hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMods.map((mod, i) => (
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
                      {mod.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{mod.title}</h3>
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

      {/* Categories */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Browse</span>
            </div>
            <h2 className="text-2xl font-bold">Categories</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/mods"
                className="group flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1"
              >
                <span className="mb-2 text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{cat.count} mods</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Top Picks</span>
              </div>
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMods.map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <img src={mod.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                  <span className="mt-2 inline-block text-xs text-primary">{mod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-card p-8 md:p-12">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
            
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Play?
              </h2>
              <p className="mx-auto mt-4 text-muted-foreground">
                Download mods for Minecraft 1.21.11. Safe, fast, and easy installation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/mods"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90"
                >
                  <Download className="h-5 w-5" />
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 mb-4">
                <Shield className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Safe Downloads</h3>
              <p className="mt-2 text-sm text-muted-foreground">All mods are virus scanned and verified safe.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 mb-4">
                <Zap className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Fast Access</h3>
              <p className="mt-2 text-sm text-muted-foreground">Quick downloads with no waiting or redirects.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 mb-4">
                <CheckCircle className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold">Easy Install</h3>
              <p className="mt-2 text-sm text-muted-foreground">Simple installation guide included with every mod.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
