// Sample NFT data used across the app
const authorImg = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face";

const nftImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1633186710895-309db2eca9e4?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=600&fit=crop",
];

const nftNames = [
  "Pinky Ocean", "Deep Space", "Rainbow Style", "Cyber Punk",
  "Neon Dreams", "Abstract Wave", "Digital Soul", "Cosmic Dust"
];

const authorNames = [
  "Monica Lucas", "David Chen", "Sarah Kim", "Alex Turner",
  "Emma Wilson", "James Park", "Lisa Brown", "Ryan Costa"
];

const authorImages = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
];

export function generateNfts(count = 8) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: nftNames[i % nftNames.length] + " #" + (100 + i),
    image: nftImages[i % nftImages.length],
    authorImage: authorImages[i % authorImages.length],
    authorName: authorNames[i % authorNames.length],
    price: (Math.random() * 4 + 0.5).toFixed(2),
    likes: Math.floor(Math.random() * 150 + 20),
    countdown: `${Math.floor(Math.random() * 8 + 1)}h ${Math.floor(Math.random() * 59)}m ${Math.floor(Math.random() * 59)}s`,
  }));
}

export function generateTopSellers(count = 12) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: authorNames[i % authorNames.length],
    image: authorImages[i % authorImages.length],
    sales: (Math.random() * 5 + 0.5).toFixed(1),
  }));
}

export function generateCollections(count = 4) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: nftNames[i % nftNames.length],
    image: nftImages[i % nftImages.length],
    authorImage: authorImages[i % authorImages.length],
    code: "ERC-" + (190 + i),
  }));
}

export const categories = [
  { name: "Art", icon: "🎨" },
  { name: "Music", icon: "🎵" },
  { name: "Domain Names", icon: "🌐" },
  { name: "Virtual Worlds", icon: "🌍" },
  { name: "Trading Cards", icon: "🃏" },
  { name: "Collectibles", icon: "💎" },
];

export { authorImg, nftImages, authorNames, authorImages };