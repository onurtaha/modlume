import Link from "next/link";
import { ArrowRight, Download, Shield, CheckCircle, Zap, Star, Sparkles, Box, Plus, ChevronRight } from "lucide-react";
import { featuredMods, additionalMods } from "@/lib/curatedMods";

const stats = [
  { icon: Box, label: "Mods", value: "+99" },
  { icon: Shield, label: "Safe", value: "100%" },
  { icon: Zap, label: "Fast", value: "DL" },
];

const categories = [
  { name: "Creatures", emoji: "🐾" },
  { name: "Pets", emoji: "🐕" },
  { name: "Farm", emoji: "🌾" },
  { name: "Storage", emoji: "📦" },
  { name: "World Gen", emoji: "🗺️" },
  { name: "Mobs", emoji: "🐉" },
];

export default async function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 animate-pulse">
              <Sparkles className="h-4 w-4" />
              <span>Minecraft 1.21.11 Ready</span>
            </div>
            
            {/* Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                ModLume
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Download the best Minecraft mods. Safe, fast, and easy installation.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/mods"
                className="group inline-flex h-14 items-center gap-3 rounded-xl bg-primary px-8 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Browse Mods
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tutorial"
                className="group inline-flex h-14 items-center gap-2 rounded-xl border-2 border-border bg-card/80 backdrop-blur px-8 font-semibold transition-all hover:bg-card hover:border-primary/50"
              >
                <Shield className="h-5 w-5 text-primary" />
                How to Install
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  {i > 0 && <div className="hidden sm:block w-px h-8 bg-border" />}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Top Picks</span>
              </div>
              <h2 className="text-3xl font-bold">Featured Mods</h2>
            </div>
            <Link href="/mods" className="group hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMods.slice(0, 8).map((mod, i) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={mod.image} 
                    alt={mod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">{mod.title}</h3>
                  </div>
                </div>
                
                {/* Category & Description */}
                <div className="p-4">
                  <span className="inline-flex items-center rounded-full bg-primary/20 text-primary px-2 py-0.5 text-xs font-medium mb-2">
                    {mod.category}
                  </span>
                  <p className="text-sm text-muted-foreground line-clamp-2">{mod.description}</p>
                </div>
                
                {/* Hover Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Mobile View All */}
          <Link href="/mods" className="group sm:hidden mt-6 flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 font-medium transition-all hover:border-primary/50">
            View All Mods
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* More Featured - Compact Grid */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMods.slice(8, 16).map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                  <img src={mod.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                  <span className="mt-1 inline-block text-xs text-primary">{mod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Box className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Browse</span>
            </div>
            <h2 className="text-3xl font-bold">Categories</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href="/mods"
                className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:bg-card/80 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="mb-3 text-4xl">{cat.emoji}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Mods */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="h-5 w-5 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Popular</span>
            </div>
            <h2 className="text-2xl font-bold">More Recommended Mods</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {additionalMods.map((mod) => (
              <Link
                key={mod.slug}
                href={"/mods/" + mod.slug}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg">
                  <img src={mod.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">{mod.title}</h3>
                  <span className="mt-1 inline-block text-xs text-primary">{mod.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card to-emerald-500/10 p-10 md:p-16">
            {/* Glow Effects */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 rounded-full blur-[80px]" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/30 rounded-full blur-[80px]" />
            
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Play?
              </h2>
              <p className="mx-auto mt-4 text-lg text-muted-foreground">
                Download mods for Minecraft 1.21.11. Safe, fast, and easy.
              </p>
              <div className="mt-10">
                <Link
                  href="/mods"
                  className="group inline-flex h-14 items-center gap-3 rounded-xl bg-primary px-10 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105"
                >
                  <Download className="h-5 w-5" />
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            <div className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-green-500/50 hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Safe Downloads</h3>
              <p className="mt-2 text-sm text-muted-foreground">All mods are virus scanned and verified safe for download.</p>
            </div>
            <div className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">Fast Access</h3>
              <p className="mt-2 text-sm text-muted-foreground">Quick downloads with no waiting or annoying redirects.</p>
            </div>
            <div className="group relative rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">Easy Install</h3>
              <p className="mt-2 text-sm text-muted-foreground">Simple installation guide included with every mod.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
