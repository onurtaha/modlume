import Link from "next/link";
import { Box, Globe, MessageCircle, Heart } from "lucide-react";

const footerLinks = {
  browse: [
    { href: "/mods", label: "All Mods" },
    { href: "/shaders", label: "Shaders" },
    { href: "/categories", label: "Categories" },
    { href: "/trending", label: "Trending" },
    { href: "/popular", label: "Popular" },
  ],
  resources: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  legal: [
    { href: "/dmca", label: "DMCA" },
    { href: "/faq", label: "FAQ" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Box className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ModLume</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              The best curated collection of Minecraft mods for Forge 1.21.11. 
              Download, install, and enhance your game.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Heart className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Browse</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map(({ href, label }) => (
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
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map(({ href, label }) => (
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

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(({ href, label }) => (
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ModLume. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Minecraft mod downloads are provided by third-party developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
