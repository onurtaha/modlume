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
  FileText,
  ImageIcon,
  Shield,
  Loader,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
      title: `${project.title} - ModLume`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.icon_url ? [{ url: project.icon_url }] : [],
      },
    };
  } catch {
    return { title: "Mod Not Found - ModLume" };
  }
}

export default async function ModPage({ params }: Props) {
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
    <div className="min-h-screen">
      {/* Hero Header with Gallery */}
      <div className="relative border-b border-border/50">
        {/* Large Preview Gallery */}
        {project.gallery.length > 0 && (
          <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
            <Image
              src={project.gallery[0].url}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="container mx-auto">
                <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
                  {/* Icon + Info */}
                  <div className="flex items-end gap-4 flex-1">
                    {project.icon_url ? (
                      <div className="relative shrink-0">
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-border bg-card shadow-lg md:h-20 md:w-20">
                          <Image
                            src={project.icon_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-xl border-2 border-border bg-muted">
                        <FileText className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                        <Badge variant="secondary" className="text-xs">1.21.11</Badge>
                        <Badge variant="outline" className="text-xs bg-primary/20 border-primary/50 text-primary">FORGE</Badge>
                      </div>
                      {team.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          by <span className="text-foreground">{team[0].user.username}</span>
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {formatDownloads(project.downloads)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {formatDownloads(project.followers)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Download Button */}
                  <div className="shrink-0">
                    <a href={`/api/download/${project.slug || project.id}`} className="download-btn inline-flex">
                      <Download className="h-5 w-5" />
                      <span>Download Mod</span>
                      <span className="hidden md:inline text-sm opacity-80 ml-2">• Minecraft 1.21.11 Forge</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Hero if no gallery */}
        {!project.gallery.length && (
          <div className="bg-gradient-to-b from-primary/5 to-transparent">
            <div className="container mx-auto px-4 py-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                {/* Icon */}
                {project.icon_url ? (
                  <div className="relative shrink-0">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-border shadow-lg">
                      <Image
                        src={project.icon_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <Badge variant="outline" className="absolute -bottom-2 -right-2 text-xs bg-primary/20 border-primary/50 text-primary">FORGE</Badge>
                  </div>
                ) : (
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-2 border-border bg-muted">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <Badge variant="secondary" className="text-xs">1.21.11</Badge>
                  </div>
                  {team.length > 0 && (
                    <p className="mt-1 text-muted-foreground">
                      by <span className="text-foreground">{team[0].user.username}</span>
                    </p>
                  )}
                  <p className="mt-3 max-w-3xl text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {formatDownloads(project.downloads)} downloads
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {formatDownloads(project.followers)} followers
                    </span>
                  </div>
                </div>

                {/* Download */}
                <div className="shrink-0 lg:w-72">
                  <a href={`/api/download/${project.slug || project.id}`} className="download-btn inline-flex">
                    <Download className="h-5 w-5" />
                    <span>Download Mod</span>
                    <span className="hidden md:inline text-sm opacity-80 ml-2">• Minecraft 1.21.11 Forge</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Installation Guide */}
      <div className="bg-card/50 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium">How to Install:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span>1. Download .jar file</span>
              <span className="hidden md:inline">→</span>
              <span>2. Open TLauncher</span>
              <span className="hidden md:inline">→</span>
              <span>3. Put in mods folder</span>
              <span className="hidden md:inline">→</span>
              <span>4. Launch with <strong className="text-foreground">Forge 1.21.11</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery Thumbnails */}
            {project.gallery.length > 1 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Screenshots</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.gallery.slice(1, 7).map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"
                    >
                      <Image
                        src={img.url}
                        alt={img.title || `Screenshot ${i + 2}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {img.title && (
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="text-sm font-medium text-white">{img.title}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Description */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">About This Mod</h2>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div
                  className="prose prose-sm prose-invert max-w-none 
                    prose-headings:text-foreground prose-p:text-muted-foreground 
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-li:text-muted-foreground
                    prose-img:rounded-lg prose-img:border prose-img:border-border"
                  dangerouslySetInnerHTML={{ __html: project.body }}
                />
              </div>
            </section>

            {/* Versions */}
            {versions.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Loader className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Versions</h2>
                </div>
                <div className="space-y-2">
                  {versions.slice(0, 10).map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{v.name}</p>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatDownloads(v.downloads)} downloads</span>
                            <span>•</span>
                            <span>{timeAgo(v.date_published)}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        1.21.11
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Minecraft Version</p>
                  <p className="font-medium">1.21.11</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Loader</p>
                  <p className="font-medium">Forge</p>
                </div>
                {project.license && (
                  <div>
                    <p className="text-xs text-muted-foreground">License</p>
                    <a
                      href={project.license.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      <Scale className="h-3 w-3" />
                      {project.license.name}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories */}
            {project.categories.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat.replace(/-/g, " ")}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Links */}
            {(project.source_url || project.issues_url || project.wiki_url || project.discord_url) && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {project.source_url && (
                    <a
                      href={project.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Source Code
                    </a>
                  )}
                  {project.issues_url && (
                    <a
                      href={project.issues_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Report Issue
                    </a>
                  )}
                  {project.discord_url && (
                    <a
                      href={project.discord_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Discord
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Team */}
            {team.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Developers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {team.map((m) => (
                    <div key={m.user.id} className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-muted">
                        {m.user.avatar_url ? (
                          <Image
                            src={m.user.avatar_url}
                            alt={m.user.username}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Users className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.user.username}</p>
                        <p className="text-xs capitalize text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Mods */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-xl font-semibold">Related Mods</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(related as ModrinthProject[]).map((p) => (
                <ProjectCard
                  key={p.slug || p.id}
                  slug={p.slug}
                  title={p.title}
                  description={p.description}
                  icon_url={p.icon_url}
                  downloads={p.downloads}
                  categories={p.categories || []}
                  project_type={p.project_type || "mod"}
                  updated={p.updated}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
