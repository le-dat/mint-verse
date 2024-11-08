"use client";

import { Collection, NFT, AIVersion } from "../types";
import { Star, Zap, Sparkles, Crown } from "lucide-react";

export const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Cyber Punks",
    description:
      "A collection of cyberpunk-themed NFTs featuring futuristic characters and scenes.",
    coverImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    owner: "CryptoArtist",
    createdAt: new Date(),
    nfts: [],
    floorPrice: 1.2,
    totalValue: 5.8,
  },
  {
    id: "2",
    name: "Digital Dreams",
    description: "Surreal digital art exploring the boundaries of imagination and technology.",
    coverImage:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    owner: "DreamWeaver",
    createdAt: new Date(),
    nfts: [],
    floorPrice: 0.8,
    totalValue: 3.2,
  },
  {
    id: "3",
    name: "Abstract Realms",
    description: "Abstract compositions pushing the boundaries of digital art.",
    coverImage:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&auto=format&fit=crop&q=60",
    owner: "ArtisticSoul",
    createdAt: new Date(),
    nfts: [],
    floorPrice: 1.5,
    totalValue: 7.5,
  },
];

export const MARKETPLACE_NFTS: NFT[] = [
  {
    id: "m1",
    name: "Cyber Punk Dragon",
    description:
      "A futuristic dragon in a cyberpunk setting, breathing neon fire against a backdrop of towering skyscrapers.",
    imageUrl:
      "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&auto=format&fit=crop&q=60",
    createdAt: new Date(),
    listed: true,
    price: 2.5,
    benefitPercentage: 10,
    owner: "CryptoArtist",
    likes: 234,
    views: 1502,
    collectionId: "1",
  },
  {
    id: "m2",
    name: "Digital Dreamscape",
    description:
      "A surreal landscape where reality bends and digital elements merge with natural forms.",
    imageUrl:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    createdAt: new Date(),
    listed: true,
    price: 1.8,
    benefitPercentage: 15,
    owner: "DreamWeaver",
    likes: 189,
    views: 892,
    collectionId: "2",
  },
  {
    id: "m3",
    name: "Abstract Harmony",
    description:
      "An intricate composition of geometric shapes and flowing lines creating a harmonious abstract piece.",
    imageUrl:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    createdAt: new Date(),
    listed: true,
    price: 3.2,
    benefitPercentage: 12,
    owner: "ArtisticSoul",
    likes: 345,
    views: 2103,
    collectionId: "3",
  },
  {
    id: "m4",
    name: "Neon Nights",
    description:
      "A vibrant cityscape bathed in neon lights, capturing the essence of night life in a digital age.",
    imageUrl:
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&auto=format&fit=crop&q=60",
    createdAt: new Date(),
    listed: true,
    price: 1.5,
    benefitPercentage: 8,
    owner: "CryptoArtist",
    likes: 156,
    views: 945,
    collectionId: "1",
  },
];

export const AI_VERSIONS: AIVersion[] = [
  {
    id: "basic",
    name: "Basic",
    icon: Star,
    price: 0,
    features: ["Basic NFT generation", "Text-to-image", "Standard response time"],
    color: "bg-secondary",
  },
  {
    id: "good",
    name: "Good",
    icon: Zap,
    price: 0.01,
    features: ["Enhanced NFT quality", "Voice commands", "Faster responses", "Priority support"],
    color: "bg-blue-500",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Sparkles,
    price: 0.05,
    features: [
      "Professional NFT generation",
      "Advanced customization",
      "Instant responses",
      "24/7 Priority support",
      "Exclusive features",
    ],
    color: "bg-purple-500",
  },
  {
    id: "vip",
    name: "VIP",
    icon: Crown,
    price: 0.1,
    features: [
      "Ultra-high quality NFTs",
      "Custom art styles",
      "Real-time collaboration",
      "Dedicated support team",
      "Early access to features",
      "Unlimited generations",
    ],
    color: "bg-amber-500",
  },
];
