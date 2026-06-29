import Link from "next/link";
import { Grid3X3 } from "lucide-react";
import { getCategories } from "@/lib/modrinth";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Categories" };

const TYPE_LABELS: Record<string, string> = {
  mod: "Mods",
  shader: "Shaders",
  resourcepack: "Resource Packs",
  datapack: "Data Packs",
  modpack: "Modpacks",
  plugin: "Plugins",
};

function categoryHref(name: string, projectType: string) {
  const base = projectType === "shader" ? "/shaders" : "/mods";
  return `${base}?category=${encodeURIComponent(name)}`;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const grouped = categories.reduce<Record<string, typeof categories>>(
    (acc, cat) => {
      (acc[cat.project_type] ??= []).push(cat);
      return acc;
    },
    {}
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Categories</h1>

      {Object.entries(grouped).map(([type, cats]) => (
        <section key={type} className="mt-10">
          <h2 className="text-xl font-semibold text-muted-foreground">
            {TYPE_LABELS[type] ?? type}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cats.map((cat) => (
              <Link key={cat.name} href={categoryHref(cat.name, type)}>
                <Card className="h-full border-border bg-card transition-colors hover:border-primary/50">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium capitalize">
                        {cat.name}
                      </p>
                      {cat.header && (
                        <p className="truncate text-xs text-muted-foreground">
                          {cat.header}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
