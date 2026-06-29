"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Layers } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDownloads, timeAgo } from "@/lib/modrinth";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  icon_url: string | null;
  downloads: number;
  categories: string[];
  project_type: string;
  author?: string;
  updated?: string;
}

export function ProjectCard({
  slug,
  title,
  description,
  icon_url,
  downloads,
  categories,
  project_type,
  author,
  updated,
}: ProjectCardProps) {
  const href = project_type === "shader" ? `/shaders/${slug}` : `/mods/${slug}`;

  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card
          className={cn(
            "h-full border-border bg-card transition-colors hover:border-primary/50"
          )}
        >
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            {icon_url ? (
              <Image
                src={icon_url}
                alt={title}
                width={48}
                height={48}
                className="rounded-lg"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Layers className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold leading-tight">{title}</h3>
              {author && (
                <p className="text-sm text-muted-foreground">by {author}</p>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
            {categories.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="text-xs text-muted-foreground">
            <div className="flex w-full items-center justify-between">
              <span className="inline-flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                {formatDownloads(downloads)}
              </span>
              {updated && <span>{timeAgo(updated)}</span>}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
