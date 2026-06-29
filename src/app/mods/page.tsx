import Link from "next/link";
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
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={mod.preview} 
                alt={mod.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-xs font-bold text-white">
                  FORGE
                </span>
              </div>
              
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                  {mod.category}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white drop-shadow-lg">
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
