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

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {curatedMods.map((mod) => (
          <a
            key={mod.slug}
            href={`/mods/${mod.slug}`}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-3xl">
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
            <div className="mt-3">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {mod.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
