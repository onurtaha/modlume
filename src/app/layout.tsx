import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ModLume - Minecraft Mods & Shaders Discovery",
    template: "%s | ModLume",
  },
  description:
    "Discover the best Minecraft mods and shaders. Browse, search, and download from thousands of community creations powered by Modrinth.",
  metadataBase: new URL("https://modlume.online"),
  keywords: [
    "Minecraft",
    "mods",
    "shaders",
    "Modrinth",
    "download",
    "resource packs",
    "modding",
  ],
  openGraph: {
    title: "ModLume - Minecraft Mods & Shaders Discovery",
    description:
      "Discover the best Minecraft mods and shaders. Browse, search, and download from thousands of community creations.",
    url: "https://modlume.online",
    siteName: "ModLume",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModLume - Minecraft Mods & Shaders Discovery",
    description:
      "Discover the best Minecraft mods and shaders.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
