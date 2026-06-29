import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ModLume privacy policy — how we handle your data.",
};

const sections = [
  {
    title: "Information We Collect",
    content: `ModLume does not require user accounts and does not track you across the web. The only personal information we may receive is what you voluntarily provide through our contact form (name, email address, and message content). We do not sell, share, or distribute this information to third parties.`,
  },
  {
    title: "Modrinth API Data",
    content: `ModLume displays publicly available mod and shader metadata fetched from the Modrinth API, including project titles, descriptions, icons, download counts, and categories. We do not store or cache this data beyond what is necessary for page rendering and performance. For Modrinth's own data practices, please refer to Modrinth's privacy policy.`,
  },
  {
    title: "Cookies & Local Storage",
    content: `We may use cookies or local storage solely to remember your site preferences (such as search filters or display settings). We do not use tracking cookies, advertising cookies, or any third-party analytics cookies.`,
  },
  {
    title: "Third-Party Links",
    content: `ModLume contains links to external sites, primarily Modrinth project pages for downloading mods and shaders. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.`,
  },
  {
    title: "Data Security",
    content: `We take reasonable measures to protect any information you provide through our contact form. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Children's Privacy",
    content: `ModLume does not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information via the contact form, please contact us so we can delete it.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of ModLume after changes constitutes acceptance of the revised policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Privacy Policy
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
        <h3 className="text-lg font-semibold">Questions?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          If you have any questions about this privacy policy, please reach out
          through our{" "}
          <a href="/contact" className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
