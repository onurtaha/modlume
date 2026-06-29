import Link from "next/link";
import Image from "next/image";
import { curatedMods } from "@/lib/curatedMods";

export const metadata = { title: "Mods" };

export default async function ModsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Minecraft Mods</h1>
        <p className="mt-2 text-muted-foreground">
          Curated selection of the best mods for Minecraft 1.21.11 with Forge
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {curatedMods.map((mod) => (
          <Link
            key={mod.slug}
            href={"/mods/" + mod.slug}
            className="group block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              {mod.screenshot ? (
                <Image
                  src={mod.screenshot}
                  alt={mod.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <span className="text-4xl opacity-50">🎮</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white border border-white/10">
                  {mod.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-md bg-primary/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-primary-foreground">
                  FORGE
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white drop-shadow-lg truncate">
                  {mod.title}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
