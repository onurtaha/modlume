export interface CuratedMod {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

// Featured mods - your curated collection (top priority)
export const featuredMods: CuratedMod[] = [
  { slug: "alexs-mobs", title: "Alex's Mobs", description: "Adds dozens of new animals including tigers, raccoons, seals, orcas, and many more wild creatures.", category: "Creatures", image: "/assets/mods/alexs-mobs.webp" },
  { slug: "doggy-talents-next", title: "Doggy Talents Next", description: "Train your dogs, level them up, and unlock new abilities. Your loyal companion has never been this useful!", category: "Pets", image: "/assets/mods/doggy-talents-next.webp" },
  { slug: "domestication-innovation", title: "Domestication Innovation", description: "New features and items for your tamed animals. Make your farm more productive than ever.", category: "Farm", image: "/assets/mods/domestication-innovation.webp" },
  { slug: "better-dogs", title: "Better Dogs", description: "More realistic and diverse dog models. Your furry friend never looked this good.", category: "Pets", image: "/assets/mods/better-dogs.webp" },
  { slug: "better-cats", title: "Better Cats", description: "New cat breeds and appearances. From fluffy Persians to sleek Siamese cats.", category: "Pets", image: "/assets/mods/better-cats.webp" },
  { slug: "aquaculture", title: "Aquaculture 2", description: "Completely overhauls fishing with new fish species, tackle, and advanced mechanics.", category: "Fishing", image: "/assets/mods/aquaculture.webp" },
  { slug: "farmers-delight", title: "Farmer's Delight", description: "Makes cooking and farming much more fun with new recipes, crops, and kitchen tools.", category: "Farm", image: "/assets/mods/farmers-delight.webp" },
  { slug: "sophisticated-backpacks", title: "Sophisticated Backpacks", description: "Advanced backpacks with upgrades, more inventory space, and better organization.", category: "Storage", image: "/assets/mods/sophisticated-backpacks.webp" },
  { slug: "waystones", title: "Waystones", description: "Easy teleportation system. Never walk the same path twice with portable waypoints.", category: "Utility", image: "/assets/mods/waystones.webp" },
  { slug: "artifacts", title: "Artifacts", description: "Powerful magical items with unique abilities. Find, equip, and dominate.", category: "Magic", image: "/assets/mods/artifacts.webp" },
  { slug: "iron-chests", title: "Iron Chests", description: "Large storage chests in various materials. Upgrade your storage capacity significantly.", category: "Storage", image: "/assets/mods/iron-chests.webp" },
  { slug: "storagedrawers", title: "Storage Drawers", description: "Organized storage solution with a clean interface. No more messy inventories.", category: "Storage", image: "/assets/mods/storagedrawers.webp" },
  { slug: "biomes-o-plenty", title: "Biomes O' Plenty", description: "Over 80 new biomes to explore. From cherry blossom forests to crystal caves.", category: "World Gen", image: "/assets/mods/biomes-o-plenty.webp" },
  { slug: "terralith", title: "Terralith", description: "Creates magnificent new world generation. Every landscape is breathtaking.", category: "World Gen", image: "/assets/mods/terralith.webp" },
  { slug: "yungs-better-dungeons", title: "YUNG's Better Dungeons", description: "Brand new dungeons to explore with unique loot and challenging encounters.", category: "Dungeons", image: "/assets/mods/yungs-better-dungeons.webp" },
  { slug: "yungs-better-mineshafts", title: "YUNG's Better Mineshafts", description: "Improved mineshafts with better visuals and more loot opportunities.", category: "World Gen", image: "/assets/mods/yungs-better-mineshafts.webp" },
  { slug: "mutant-more", title: "Mutant Monsters", description: "Giant and powerful mutant creatures. Epic bosses that will test your skills.", category: "Mobs", image: "/assets/mods/mutant-more.webp" },
  { slug: "ice-and-fire-dragons", title: "Ice and Fire", description: "Dragons, sea serpents, and more mythical creatures. Epic battles await.", category: "Mobs", image: "/assets/mods/ice-and-fire-dragons.webp" },
  { slug: "mowzies-mobs", title: "Mowzie's Mobs", description: "Unique bosses with distinct mechanics. Forged in Evil and other legendary encounters.", category: "Mobs", image: "/assets/mods/mowzies-mobs.webp" },
  { slug: "twilightforest", title: "The Twilight Forest", description: "Your own dimension with dozens of bosses. Explore a magical enchanted forest.", category: "Adventure", image: "/assets/mods/twilightforest.webp" },
  { slug: "create", title: "Create", description: "Machines and automation. Build contraptions, automate farms, and engineer your world.", category: "Tech", image: "/assets/mods/create.webp" },
  { slug: "supplementaries", title: "Supplementaries", description: "Decorative and functional blocks. Faucets, turntables, jars, and much more.", category: "Decoration", image: "/assets/mods/supplementaries.webp" },
  { slug: "chipped", title: "Chipped", description: "Thousands of decorative block variants. Perfect for detailed building.", category: "Decoration", image: "/assets/mods/chipped.webp" },
  { slug: "macaws-fences-and-walls", title: "Macaw's Fences", description: "Beautiful fence and wall variations. Make your builds stand out.", category: "Decoration", image: "/assets/mods/macaws-fences-and-walls.webp" },
  { slug: "macaws-doors", title: "Macaw's Doors", description: "New door block varieties. From barn doors to Japanese shoji screens.", category: "Decoration", image: "/assets/mods/macaws-doors.webp" },
  { slug: "macaws-bridges", title: "Macaw's Bridges", description: "Bridge blocks for spanning gaps. Build magnificent suspension bridges.", category: "Decoration", image: "/assets/mods/macaws-bridges.webp" },
];

// Additional recommended mods (shown below your collection)
export const additionalMods: CuratedMod[] = [
  { slug: "sodium", title: "Sodium", description: "High-performance rendering engine replacement for Minecraft. Dramatically improves frame rates.", category: "Optimization", image: "/assets/mods/sodium.webp" },
  { slug: "lithium", title: "Lithium", description: "No-compromises game logic optimization mod. Improves performance for both single-player and servers.", category: "Optimization", image: "/assets/mods/lithium.webp" },
  { slug: "indium", title: "Indium", description: "Fabric Rendering Instrumentation, provides Sodium with compatibility for modified rendering.", category: "Optimization", image: "/assets/mods/indium.webp" },
  { slug: "fabric-api", title: "Fabric API", description: "Lightweight and modular API providing common hooks and intercompatibility for Fabric mods.", category: "Library", image: "/assets/mods/fabric-api.webp" },
  { slug: "wthit", title: "WTHIT", description: "What The Helmet It Does - Shows what block/entity you're looking at.", category: "Utility", image: "/assets/mods/wthit.webp" },
];

// All mods combined
export const curatedMods: CuratedMod[] = [...featuredMods, ...additionalMods];
