import type { Metadata } from "next";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Install - ModLume",
  description: "Learn how to install Minecraft mods and shaders with ModLume.",
};

export default function TutorialPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Play className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">How to Install</h1>
          <p className="text-muted-foreground">Install mods and shaders in minutes</p>
        </div>
      </div>

      {/* Video */}
      <div className="mt-8 aspect-video rounded-xl overflow-hidden border border-border bg-muted">
        <video
          controls
          className="w-full h-full"
          src="/how-to-install.mp4"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Steps */}
      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Installation Steps</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
            <div>
              <h3 className="font-semibold">Download a Mod Loader</h3>
              <p className="text-muted-foreground text-sm mt-1">
                For mods, you need Fabric or Forge. For shaders, you only need OptiFine or Sodium + Iris.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
            <div>
              <h3 className="font-semibold">Download Your Mod</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Click the download button on any mod page. Make sure the version matches your Minecraft version.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
            <div>
              <h3 className="font-semibold">Move to Mods Folder</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Locate your Minecraft mods folder (usually %appdata%/.minecraft/mods) and place the .jar file inside.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</div>
            <div>
              <h3 className="font-semibold">Launch the Game</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Start Minecraft with your mod loader profile. Your mods will automatically load!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
