const BASE_URL = "https://api.modrinth.com/v2";

const cache = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function fetchModrinth<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const key = url.toString();
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.data as T;

  const res = await fetch(key, {
    headers: { "User-Agent": "ModLume/1.0 (modlume.online)" },
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`Modrinth API error: ${res.status}`);
  const data = await res.json();
  cache.set(key, { data, expires: Date.now() + CACHE_TTL });
  return data as T;
}

export interface ModrinthProject {
  slug: string;
  title: string;
  description: string;
  body: string;
  categories: string[];
  client_side: string;
  server_side: string;
  project_type: string;
  downloads: number;
  icon_url: string | null;
  color: number | null;
  id: string;
  team: string;
  published: string;
  updated: string;
  followers: number;
  versions: string[];
  game_versions: string[];
  loaders: string[];
  gallery: GalleryImage[];
  featured_gallery: string | null;
  license: { id: string; name: string; url: string | null };
  source_url: string | null;
  issues_url: string | null;
  wiki_url: string | null;
  discord_url: string | null;
  donation_urls: { id: string; platform: string; url: string }[];
}

export interface GalleryImage {
  url: string;
  featured: boolean;
  title: string | null;
  description: string | null;
  created: string;
  ordering: number;
}

export interface ModrinthSearchResult {
  hits: ModrinthSearchHit[];
  offset: number;
  limit: number;
  total_hits: number;
}

export interface ModrinthSearchHit {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: string;
  server_side: string;
  project_type: string;
  downloads: number;
  icon_url: string | null;
  color: number | null;
  project_id: string;
  author: string;
  versions: string[];
  follows: number;
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  gallery: string[];
  featured_gallery: string | null;
}

export interface ModrinthVersion {
  id: string;
  project_id: string;
  name: string;
  version_number: string;
  changelog: string | null;
  game_versions: string[];
  loaders: string[];
  featured: boolean;
  date_published: string;
  downloads: number;
  files: ModrinthFile[];
  dependencies: { version_id: string | null; project_id: string | null; dependency_type: string }[];
}

export interface ModrinthFile {
  hashes: { sha1: string; sha512: string };
  url: string;
  filename: string;
  primary: boolean;
  size: number;
}

export interface ModrinthTeamMember {
  team_id: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    role: string;
  };
  role: string;
  ordering: number;
}

export interface ModrinthCategory {
  icon: string;
  name: string;
  project_type: string;
  header: string;
}

export async function searchProjects(
  query: string,
  facets?: string[][],
  index?: string,
  offset = 0,
  limit = 20
): Promise<ModrinthSearchResult> {
  const params: Record<string, string> = { limit: String(limit), offset: String(offset) };
  if (query) params.query = query;
  if (facets?.length) params.facets = JSON.stringify(facets);
  if (index) params.index = index;
  return fetchModrinth<ModrinthSearchResult>("/search", params);
}

export async function getProject(idOrSlug: string): Promise<ModrinthProject> {
  return fetchModrinth<ModrinthProject>(`/project/${idOrSlug}`);
}

export async function getProjectVersions(
  idOrSlug: string,
  loaders?: string[],
  gameVersions?: string[]
): Promise<ModrinthVersion[]> {
  const params: Record<string, string> = {};
  if (loaders?.length) params.loaders = JSON.stringify(loaders);
  if (gameVersions?.length) params.game_versions = JSON.stringify(gameVersions);
  return fetchModrinth<ModrinthVersion[]>(`/project/${idOrSlug}/version`, params);
}

export async function getTeamMembers(teamId: string): Promise<ModrinthTeamMember[]> {
  return fetchModrinth<ModrinthTeamMember[]>(`/team/${teamId}/members`);
}

export async function getCategories(): Promise<ModrinthCategory[]> {
  return fetchModrinth<ModrinthCategory[]>("/tag/category");
}

export async function getRelatedProjects(projectId: string): Promise<ModrinthProject[]> {
  try {
    // Modrinth doesn't have a direct related endpoint, so search by first category
    const project = await getProject(projectId);
    if (project.categories.length > 0) {
      const result = await searchProjects("", [
        ["categories:" + project.categories[0]],
        ["project_type:" + project.project_type],
      ], "relevance", 0, 6);
      return result.hits
        .filter((h) => h.project_id !== project.id)
        .slice(0, 4) as unknown as ModrinthProject[];
    }
    return [];
  } catch {
    return [];
  }
}

export function formatDownloads(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count} ${i.label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
