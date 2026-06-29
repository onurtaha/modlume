import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Download,
  Heart,
  Calendar,
  ExternalLink,
  Scale,
  Users,
  Layers,
  MonitorDown,
  FolderOpen,
  MousePointerClick,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/project-card";
import {
  getProject,
  getProjectVersions,
  getTeamMembers,
  getRelatedProjects,
  formatDownloads,
  timeAgo,
  type ModrinthProject,
} from "@/lib/modrinth";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.icon_url ? [{ url: project.icon_url }] : [],
      },
    };
  } catch {
    return { title: "Shader Not Found" };
  }
}

const installSteps = [
  { icon: MonitorDown, text: "Download the shader pack file" },
  { icon: Layers, text: "Open Minecraft with OptiFine or Iris installed" },
  { icon: MousePointerClick, text: "Go to Options > Video Settings > Shaders" },
  { icon: FolderOpen, text: 'Click "Shaders Folder" to open it' },
  { icon: FolderOpen, text: "Move the downloaded file into the shaders folder" },
  { icon: CheckCircle2, text: 'Select the shader and click "Done"' },
];

export default async function ShaderPage({ params }: Props) {
  const { slug } = await params;

  let project, versions, team;
  try {
    [project, versions] = await Promise.all([
      getProject(slug),
      getProjectVersions(slug),
    ]);
    team = await getTeamMembers(project.team);
  } catch {
    notFound();
  }

  const related = await getRelatedProjects(project.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex flex-1 items-start gap-4">
          {project.icon_url ? (
            <Image
              src={project.icon_url}
              alt={project.title}
              width={80}
              height={80}
              className="rounded-xl"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-muted">
              <Layers className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            {team.length > 0 && (
              <p className="mt-1 text-muted-foreground">
                by {team[0].user.username}
              </p>
            )}
            <p className="mt-2 text-muted-foreground">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Download className="h-4 w-4" />
                {formatDownloads(project.downloads)} downloads
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {formatDownloads(project.followers)} followers
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Updated {timeAgo(project.updated)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Download Section */}
      <div className="mb-8">
        <div className="warning-box">
          <p className="text-sm text-foreground">
            <span className="mr-2">⚠️</span>
            <strong>This shader only works with Minecraft 1.21.11 using OptiFine or Iris.</strong> Vanilla Minecraft is not supported.
          </p>
        </div>

        <a href={`/api/download/${project.slug || project.id}`} className="download-btn">
          <Download className="h-5 w-5" />
          Download (.jar)
        </a>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Installation Guide */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Installation Guide</h2>
            <Card>
              <CardContent className="py-4">
                <ol className="space-y-4">
                  {installSteps.map((step, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm">
                        <span className="mr-2 font-semibold text-primary">
                          {i + 1}.
                        </span>
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>

          {/* Gallery */}
          {project.gallery.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Gallery</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={img.url}
                      alt={img.title || `Screenshot ${i + 1}`}
                      width={600}
                      height={340}
                      className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {img.title && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-sm font-medium text-white">
                          {img.title}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Body / Description */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Description</h2>
            <div
              className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: project.body }}
            />
          </section>

          {/* Versions */}
          {versions.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Versions</h2>
              <div className="space-y-3">
                {versions.slice(0, 20).map((v) => (
                  <Card key={v.id}>
                    <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{v.name}</p>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {v.game_versions.slice(0, 5).map((gv) => (
                            <Badge key={gv} variant="outline" className="text-xs">
                              {gv}
                            </Badge>
                          ))}
                          {v.game_versions.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{v.game_versions.length - 5}
                            </Badge>
                          )}
                          {v.loaders.map((l) => (
                            <Badge key={l} variant="secondary" className="text-xs">
                              {l}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {formatDownloads(v.downloads)}
                          </span>
                          <span>{timeAgo(v.date_published)}</span>
                        </div>
                      </div>
                      {v.files[0] && (
                        <a href={v.files[0].url} target="_blank" rel="noopener noreferrer">
                          <Button variant="default" size="sm">
                            <Download className="mr-1 h-3.5 w-3.5" />
                            Download
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-6 lg:w-72">
          {/* Game Versions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Minecraft Version</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="text-xs">
                1.21.11
              </Badge>
            </CardContent>
          </Card>

          {/* Loaders */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Supported</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">OptiFine</Badge>
                <Badge variant="secondary">Iris</Badge>
              </div>
            </CardContent>
          </Card>

          {/* License */}
          {project.license && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">License</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Scale className="h-4 w-4" />
                  {project.license.url ? (
                    <a
                      href={project.license.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {project.license.name}
                    </a>
                  ) : (
                    <span>{project.license.name}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Links */}
          {(project.source_url || project.issues_url || project.wiki_url || project.discord_url) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {project.source_url && (
                  <a
                    href={project.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Source Code
                  </a>
                )}
                {project.issues_url && (
                  <a
                    href={project.issues_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Issues
                  </a>
                )}
                {project.wiki_url && (
                  <a
                    href={project.wiki_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Wiki
                  </a>
                )}
                {project.discord_url && (
                  <a
                    href={project.discord_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Discord
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* Team Members */}
          {team.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {team.map((m) => (
                  <div key={m.user.id} className="flex items-center gap-3">
                    {m.user.avatar_url ? (
                      <Image
                        src={m.user.avatar_url}
                        alt={m.user.username}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{m.user.username}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      {/* Related Shaders */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold">Related Shaders</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(related as ModrinthProject[]).map((p) => (
              <ProjectCard
                key={p.slug || p.id}
                slug={p.slug}
                title={p.title}
                description={p.description}
                icon_url={p.icon_url}
                downloads={p.downloads}
                categories={p.categories || []}
                project_type={p.project_type || "shader"}
                updated={p.updated}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
