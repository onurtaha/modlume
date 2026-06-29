"use client";

import { useEffect, useState } from "react";
import { Package, Sparkles, Download, Users, Settings, Star } from "lucide-react";
import {
  searchProjects,
  formatDownloads,
  type ModrinthSearchHit,
} from "@/lib/modrinth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

interface Stats {
  totalMods: number;
  totalShaders: number;
  totalDownloads: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <Icon className="size-4" />
          {label}
        </CardDescription>
        <CardTitle className="text-2xl">
          {loading ? <Skeleton className="h-8 w-24" /> : value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function ProjectRow({ hit }: { hit: ModrinthSearchHit }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        {hit.icon_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={hit.icon_url}
            alt=""
            className="size-8 rounded-md shrink-0"
          />
        ) : (
          <div className="size-8 rounded-md bg-muted shrink-0" />
        )}
        <div className="min-w-0">
          <p className="font-medium truncate">{hit.title}</p>
          <p className="text-xs text-muted-foreground truncate">/{hit.slug}</p>
        </div>
      </div>
      <span className="text-sm text-muted-foreground shrink-0 ml-4">
        <Download className="inline size-3.5 mr-1" />
        {formatDownloads(hit.downloads)}
      </span>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [mods, setMods] = useState<ModrinthSearchHit[]>([]);
  const [shaders, setShaders] = useState<ModrinthSearchHit[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteName, setSiteName] = useState("ModLume");
  const [siteDesc, setSiteDesc] = useState(
    "Discover and explore Minecraft mods, shaders, and resource packs."
  );

  useEffect(() => {
    async function load() {
      try {
        const [modsRes, shadersRes] = await Promise.all([
          searchProjects("", [["project_type:mod"]], "downloads", 0, 5),
          searchProjects("", [["project_type:shader"]], "downloads", 0, 5),
        ]);

        const totalDownloads = [...modsRes.hits, ...shadersRes.hits].reduce(
          (sum, h) => sum + h.downloads,
          0
        );

        setStats({
          totalMods: modsRes.total_hits,
          totalShaders: shadersRes.total_hits,
          totalDownloads,
        });
        setMods(modsRes.hits);
        setShaders(shadersRes.hits);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of ModLume content and settings
        </p>
      </div>

      <Separator />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Total Mods"
          value={stats ? formatDownloads(stats.totalMods) : "0"}
          loading={loading}
        />
        <StatCard
          icon={Sparkles}
          label="Total Shaders"
          value={stats ? formatDownloads(stats.totalShaders) : "0"}
          loading={loading}
        />
        <StatCard
          icon={Download}
          label="Top Downloads"
          value={stats ? formatDownloads(stats.totalDownloads) : "0"}
          loading={loading}
        />
        <StatCard
          icon={Users}
          label="Unique Authors"
          value={
            stats
              ? String(
                  new Set([...mods, ...shaders].map((h) => h.author)).size
                )
              : "0"
          }
          loading={loading}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue={0}>
        <TabsList>
          <TabsTrigger value={0}>
            <Star className="size-4 mr-1.5" /> Featured
          </TabsTrigger>
          <TabsTrigger value={1}>
            <Settings className="size-4 mr-1.5" /> Settings
          </TabsTrigger>
        </TabsList>

        {/* Featured tab */}
        <TabsContent value={0}>
          <div className="grid gap-6 lg:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="size-5" /> Top Mods
                </CardTitle>
                <CardDescription>By downloads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full" />
                    ))
                  : mods.map((hit) => (
                      <ProjectRow key={hit.project_id} hit={hit} />
                    ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5" /> Top Shaders
                </CardTitle>
                <CardDescription>By downloads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-full" />
                    ))
                  : shaders.map((hit) => (
                      <ProjectRow key={hit.project_id} hit={hit} />
                    ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings tab */}
        <TabsContent value={1}>
          <Card className="mt-4 max-w-xl">
            <CardHeader>
              <CardTitle>Site Settings</CardTitle>
              <CardDescription>
                Local state only — not persisted.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="siteName">
                  Site Name
                </label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="siteDesc">
                  Description
                </label>
                <Textarea
                  id="siteDesc"
                  rows={3}
                  value={siteDesc}
                  onChange={(e) => setSiteDesc(e.target.value)}
                />
              </div>
              <Button
                onClick={() => alert(`Saved (demo): ${siteName}`)}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
