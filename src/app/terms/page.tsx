import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ModLume terms of service and usage conditions.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using ModLume, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the site.`,
  },
  {
    title: "Description of Service",
    content: `ModLume is a content discovery platform that aggregates and displays Minecraft mod and shader information from the Modrinth API. We provide a user-friendly interface for browsing, searching, and discovering community-created content. We do not host, store, or distribute any mod or shader files.`,
  },
  {
    title: "Intellectual Property",
    content: `All Minecraft mod and shader content displayed on ModLume belongs to their respective original creators. Minecraft is a trademark of Mojang Studios / Microsoft. ModLume does not claim ownership of any third-party content. The ModLume name, branding, and website design are the property of ModLume.`,
  },
  {
    title: "No Affiliation",
    content: `ModLume is an independent project and is not affiliated with, endorsed by, or sponsored by Mojang Studios, Microsoft Corporation, or Modrinth. Any references to Minecraft, Mojang, or Microsoft are for informational purposes only.`,
  },
  {
    title: "User Conduct",
    content: `You agree not to misuse ModLume's services, including but not limited to: attempting to access data through unauthorized means, scraping content beyond reasonable personal use, impersonating others through our contact form, or using the service for any illegal purpose.`,
  },
  {
    title: "External Links & Downloads",
    content: `ModLume links to external websites, primarily Modrinth, for mod and shader downloads. We are not responsible for the content, safety, or practices of these external sites. You download and install mods and shaders at your own risk.`,
  },
  {
    title: "Disclaimer of Warranties",
    content: `ModLume is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee the accuracy, completeness, or timeliness of the information displayed, as it is sourced from third-party APIs.`,
  },
  {
    title: "Limitation of Liability",
    content: `ModLume shall not be liable for any damages arising from the use or inability to use our service, including but not limited to damages from downloading or installing mods or shaders found through our platform.`,
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of ModLume after modifications constitutes acceptance of the updated terms.`,
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-4 text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>

      <div className="mt-10 space-y-10">
        {sections.map(({ title, content }, i) => (
          <section key={title}>
            <h2 className="text-xl font-bold">
              {i + 1}. {title}
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">Contact</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions about these terms? Reach out on our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
