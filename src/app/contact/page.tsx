import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the ModLume team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Contact Us</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Have a question, suggestion, or found an issue? We&apos;d love to hear
        from you.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-5">
        {/* Form */}
        <form className="space-y-6 md:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none"
              >
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium leading-none"
            >
              Subject
            </label>
            <Input id="subject" placeholder="What is this about?" />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium leading-none"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell us more..."
              rows={6}
            />
          </div>

          <Button type="button" size="lg" className="w-full sm:w-auto">
            <Mail className="mr-2 size-4" />
            Send Message
          </Button>
        </form>

        {/* Sidebar */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold">Before you reach out</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Bug report?</strong>{" "}
                Describe the issue and steps to reproduce it.
              </li>
              <li>
                <strong className="text-foreground">Content issue?</strong>{" "}
                All mods and shaders come from Modrinth. Please report content
                issues directly on Modrinth.
              </li>
              <li>
                <strong className="text-foreground">Feature request?</strong>{" "}
                Tell us what would make ModLume better for you.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
