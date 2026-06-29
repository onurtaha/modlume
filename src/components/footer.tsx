import Link from "next/link";
import { Box } from "lucide-react";

const browseLinks = [
  { href: "/mods", label: "Mods" },
  { href: "/shaders", label: "Shaders" },
  { href: "/categories", label: "Categories" },
  { href: "/trending", label: "Trending" },
  { href: "/popular", label: "Popular" },
];

const resourceLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Box className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">ModLume</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Discover and explore the best Minecraft mods, shaders, and resource
              packs. Your gateway to enhancing your Minecraft experience.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Browse</h3>
            <ul className="space-y-2">
              {browseLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-2 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>Powered by Modrinth API</p>
          <p>&copy; {new Date().getFullYear()} ModLume. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
