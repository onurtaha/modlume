export interface CuratedMod {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
}

const categoryColors: Record<string, string> = {
  "Creatures": "from-green-600/40 to-emerald-800/60",
  "Pets": "from-amber-600/40 to-orange-800/60",
  "Farm": "from-yellow-600/40 to-lime-800/60",
  "Fishing": "from-blue-600/40 to-cyan-800/60",
  "Storage": "from-slate-600/40 to-gray-800/60",
  "Utility": "from-purple-600/40 to-violet-800/60",
  "Magic": "from-fuchsia-600/40 to-pink-800/60",
  "World Gen": "from-teal-600/40 to-cyan-800/60",
  "Dungeons": "from-red-600/40 to-rose-800/60",
  "Mobs": "from-orange-600/40 to-red-800/60",
  "Adventure": "from-indigo-600/40 to-blue-800/60",
  "Tech": "from-yellow-600/40 to-amber-800/60",
  "Decoration": "from-rose-600/40 to-pink-800/60",
};

export const curatedMods: CuratedMod[] = [
  {
    slug: "alexsmobs",
    title: "Alex's Mobs",
    description: "Adds dozens of new animals including tigers, raccoons, seals, orcas, and many more wild creatures.",
    category: "Creatures",
    color: categoryColors["Creatures"]
  },
  {
    slug: "doggy-talents-next",
    title: "Doggy Talents Next",
    description: "Train your dogs, level them up, and unlock new abilities. Your loyal companion has never been more useful!",
    category: "Pets",
    color: categoryColors["Pets"]
  },
  {
    slug: "domestication-innovation",
    title: "Domestication Innovation",
    description: "New features and items for your tamed animals. Make your farm more productive than ever.",
    category: "Farm",
    color: categoryColors["Farm"]
  },
  {
    slug: "better-dogs",
    title: "Better Dogs",
    description: "More realistic and diverse dog models. Your furry friend never looked this good.",
    category: "Pets",
    color: categoryColors["Pets"]
  },
  {
    slug: "better-cats",
    title: "Better Cats",
    description: "New cat breeds and appearances. From fluffy Persians to sleek Siamese cats.",
    category: "Pets",
    color: categoryColors["Pets"]
  },
  {
    slug: "aquaculture",
    title: "Aquaculture 2",
    description: "Completely overhauls fishing with new fish species, tackle, and advanced mechanics.",
    category: "Fishing",
    color: categoryColors["Fishing"]
  },
  {
    slug: "farmers-delight",
    title: "Farmer's Delight",
    description: "Makes cooking and farming much more fun with new recipes, crops, and kitchen tools.",
    category: "Farm",
    color: categoryColors["Farm"]
  },
  {
    slug: "sophisticated-backpacks",
    title: "Sophisticated Backpacks",
    description: "Advanced backpacks with upgrades, more inventory space, and better organization.",
    category: "Storage",
    color: categoryColors["Storage"]
  },
  {
    slug: "waystones",
    title: "Waystones",
    description: "Easy teleportation system. Never walk the same path twice with portable waypoints.",
    category: "Utility",
    color: categoryColors["Utility"]
  },
  {
    slug: "artifacts",
    title: "Artifacts",
    description: "Powerful magical items with unique abilities. Find, equip, and dominate.",
    category: "Magic",
    color: categoryColors["Magic"]
  },
  {
    slug: "iron-chests",
    title: "Iron Chests",
    description: "Large storage chests in various materials. Upgrade your storage capacity significantly.",
    category: "Storage",
    color: categoryColors["Storage"]
  },
  {
    slug: "storage-drawers",
    title: "Storage Drawers",
    description: "Organized storage solution with a clean interface. No more messy inventories.",
    category: "Storage",
    color: categoryColors["Storage"]
  },
  {
    slug: "biomes-o-plenty",
    title: "Biomes O' Plenty",
    description: "Over 80 new biomes to explore. From cherry blossom forests to crystal caves.",
    category: "World Gen",
    color: categoryColors["World Gen"]
  },
  {
    slug: "terralith",
    title: "Terralith",
    description: "Creates magnificent new world generation. Every landscape is breathtaking.",
    category: "World Gen",
    color: categoryColors["World Gen"]
  },
  {
    slug: "yungs-better-dungeons",
    title: "YUNG's Better Dungeons",
    description: "Brand new dungeons to explore with unique loot and challenging encounters.",
    category: "Dungeons",
    color: categoryColors["Dungeons"]
  },
  {
    slug: "yungs-better-mineshafts",
    title: "YUNG's Better Mineshafts",
    description: "Improved mineshafts with better visuals and more loot opportunities.",
    category: "World Gen",
    color: categoryColors["World Gen"]
  },
  {
    slug: "mutant-more",
    title: "Mutant Monsters",
    description: "Giant and powerful mutant creatures. Epic bosses that will test your skills.",
    category: "Mobs",
    color: categoryColors["Mobs"]
  },
  {
    slug: "ice-and-fire",
    title: "Ice and Fire",
    description: "Dragons, sea serpents, and more mythical creatures. Epic battles await.",
    category: "Mobs",
    color: categoryColors["Mobs"]
  },
  {
    slug: "mowzies-mobs",
    title: "Mowzie's Mobs",
    description: "Unique bosses with distinct mechanics. Forged in Evil and other legendary encounters.",
    category: "Mobs",
    color: categoryColors["Mobs"]
  },
  {
    slug: "twilight-forest",
    title: "The Twilight Forest",
    description: "Your own dimension with dozens of bosses. Explore a magical enchanted forest.",
    category: "Adventure",
    color: categoryColors["Adventure"]
  },
  {
    slug: "create",
    title: "Create",
    description: "Machines and automation. Build contraptions, automate farms, and engineer your world.",
    category: "Tech",
    color: categoryColors["Tech"]
  },
  {
    slug: "supplementaries",
    title: "Supplementaries",
    description: "Decorative and functional blocks. Faucets, turntables, jars, and much more.",
    category: "Decoration",
    color: categoryColors["Decoration"]
  },
  {
    slug: "chipped",
    title: "Chipped",
    description: "Thousands of decorative block variants. Perfect for detailed building.",
    category: "Decoration",
    color: categoryColors["Decoration"]
  },
  {
    slug: "macaws-fences-and-walls",
    title: "Macaw's Fences",
    description: "Beautiful fence and wall variations. Make your builds stand out.",
    category: "Decoration",
    color: categoryColors["Decoration"]
  },
  {
    slug: "macaws-doors",
    title: "Macaw's Doors",
    description: "New door block varieties. From barn doors to Japanese shoji screens.",
    category: "Decoration",
    color: categoryColors["Decoration"]
  },
  {
    slug: "macaws-bridges",
    title: "Macaw's Bridges",
    description: "Bridge blocks for spanning gaps. Build magnificent suspension bridges.",
    category: "Decoration",
    color: categoryColors["Decoration"]
  }
];
