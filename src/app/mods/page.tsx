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
            {/* Gradient Background */}
            <div className={"relative h-36 overflow-hidden bg-gradient-to-br " + mod.color}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWlsbC1vcGFjaXR5PSIuMDUiPjxjaGFydCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJlc3VsdD0iaW5zaWRlIj48cGF0aCBkPSJNIDAgMCBMIDQwIDAgTCA0MCA0MCBMIDAgNDAgWiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3JlY3Q+PC9nPjwvc3ZnPg==')] opacity-50" />
              
              {/* Forge Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-xs font-bold text-white">
                  FORGE
                </span>
              </div>
              
              {/* Category Badge */}
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center rounded-md bg-black/60 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
                  {mod.category}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                {mod.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
