import type { Metadata } from "next";
import { Box, ExternalLink, Search, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ModLume, a modern Minecraft mods and shaders discovery platform powered by the Modrinth API.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">About ModLume</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        A modern Minecraft mods &amp; shaders discovery platform, built to help
        players find the perfect additions to their game.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">What is ModLume?</h2>
        <p className="text-muted-foreground leading-relaxed">
          ModLume is a clean, fast, and intuitive platform for discovering
          Minecraft mods and shaders. We aggregate project data from the{" "}
          <a
            href="https://modrinth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Modrinth API
          </a>{" "}
          and present it in a beautifully designed interface so you can browse,
          search, and find exactly what you need without the clutter.
        </p>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        {[
          {
            icon: Search,
            title: "Discover & Search",
            description:
              "Browse thousands of mods and shaders with powerful search, filtering by category, game version, and loader.",
          },
          {
            icon: ExternalLink,
            title: "Official Downloads Only",
            description:
              "We never host copyrighted files. Every download link points directly to the official Modrinth project page.",
          },
          {
            icon: Shield,
            title: "Safe & Transparent",
            description:
              "All content metadata comes from the Modrinth API. We respect creators and their intellectual property.",
          },
          {
            icon: Box,
            title: "Open Ecosystem",
            description:
              "Powered by the Modrinth open-source ecosystem, supporting the community-driven future of Minecraft modding.",
          },
        ].map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <Icon className="mb-3 size-6 text-primary" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Content Policy</h2>
        <p className="text-muted-foreground leading-relaxed">
          ModLume does <strong>not</strong> host, store, or distribute any
          copyrighted files. All mod and shader files remain on their original
          hosting platforms. We only display publicly available metadata
          (titles, descriptions, icons, download counts) provided through the
          Modrinth API, and link users to official download pages.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold">Disclaimer</h2>
        <p className="text-muted-foreground leading-relaxed">
          ModLume is not affiliated with, endorsed by, or connected to Mojang
          Studios, Microsoft, or Modrinth. Minecraft is a trademark of Mojang
          Studios. All mod and shader content belongs to their respective
          creators.
        </p>
      </section>
    </div>
  );
}
