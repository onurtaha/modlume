import type { Metadata } from "next";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Nasıl İndirilir - ModLume",
  description: "Minecraft mod ve shader nasıl indirilir öğrenin.",
};

export default function TutorialPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Play className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Nasıl İndirilir</h1>
          <p className="text-muted-foreground">Mod ve shader indirmeyi dakikalar içinde öğrenin</p>
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
        <h2 className="text-2xl font-bold">Kurulum Adımları</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
            <div>
              <h3 className="font-semibold">Mod Loader İndir</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Modlar için Fabric veya Forge, shaderlar için OptiFine veya Sodium + Iris gerekir.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
            <div>
              <h3 className="font-semibold">Modu İndir</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Herhangi bir mod sayfasından indir butonuna tıkla. Minecraft sürümünle eşleştiğinden emin ol.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
            <div>
              <h3 className="font-semibold">Mods Klasörüne Taşı</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Minecraft mods klasörünü bul (%appdata%/.minecraft/mods) ve .jar dosyasını içine koy.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg border border-border bg-card">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">4</div>
            <div>
              <h3 className="font-semibold">Oyunu Başlat</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Minecraft'ı mod loader profilinle başlat. Modların otomatik yüklenecek!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
