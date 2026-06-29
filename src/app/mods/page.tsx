import Link from "next/link";
import { searchProjects } from "@/lib/modrinth";
import { ProjectCard } from "@/components/project-card";

export const metadata = { title: "Mods" };

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "downloads", label: "Downloads" },
  { value: "updated", label: "Updated" },
  { value: "newest", label: "Newest" },
] as const;

const LIMIT = 20;

function buildUrl(base: string, overrides: Record<string, string | number>) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(overrides)) {
    if (v !== "" && v !== undefined) p.set(k, String(v));
  }
  return `${base}?${p.toString()}`;
}

export default async function ModsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = params.query ?? "";
  const sortBy = params.sort ?? "relevance";
  const page = Math.max(1, Number(params.page ?? 1));
  const offset = (page - 1) * LIMIT;

  let result;
  let error = false;

  try {
    result = await searchProjects(query, [["project_type:mod"]], sortBy, offset, LIMIT);
  } catch {
    error = true;
  }

  const totalPages = result ? Math.ceil(result.total_hits / LIMIT) : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Minecraft Mods</h1>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {result ? `${result.total_hits.toLocaleString()} results` : "—"}
        </p>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((opt) => (
            <Link
              key={opt.value}
              href={buildUrl("/mods", { query, sort: opt.value })}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                sortBy === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {error ? (
        <p className="mt-12 text-center text-muted-foreground">
          Something went wrong loading mods. Please try again later.
        </p>
      ) : result && result.hits.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {result.hits.map((hit) => (
            <ProjectCard
              key={hit.slug}
              slug={hit.slug}
              title={hit.title}
              description={hit.description}
              icon_url={hit.icon_url}
              downloads={hit.downloads}
              categories={hit.categories}
              project_type={hit.project_type}
              author={hit.author}
              updated={hit.date_modified}
            />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">No mods found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-4">
          {page > 1 ? (
            <Link
              href={buildUrl("/mods", { query, sort: sortBy, page: page - 1 })}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground opacity-50">
              Previous
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link
              href={buildUrl("/mods", { query, sort: sortBy, page: page + 1 })}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground opacity-50">
              Next
            </span>
          )}
        </div>
      )}
    </main>
  );
}
