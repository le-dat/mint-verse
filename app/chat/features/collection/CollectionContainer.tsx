"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Collection, NFT, ListingFormData } from "../../types";
import { CollectionGrid } from "../../components/CollectionGrid";
import { CollectionView } from "../../components/CollectionView";

// Sample collections data
const SAMPLE_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Cyber Punks",
    description:
      "A collection of cyberpunk-themed NFTs featuring futuristic characters and scenes.",
    coverImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    owner: "CryptoArtist",
    createdAt: new Date(),
    nfts: [
      {
        id: "1",
        name: "Cyber Punk #1",
        description: "A futuristic character with glowing eyes and neon lights.",
        imageUrl:
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
        createdAt: new Date(),
        price: 1.2,
        benefitPercentage: 10,
        owner: "CryptoArtist",
        likes: 42,
        views: 120,
        network: {
          id: "1",
          name: "Ethereum",
          icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
          gasPrice: "100 Gwei",
          description: "The world's leading programmable blockchain",
        },
        collectionId: "1",
      },
      {
        id: "2",
        name: "Cyber Punk #2",
        description: "A cybernetic character with a robotic arm and glowing implants.",
        imageUrl:
          "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
        createdAt: new Date(),
        price: 2.3,
        benefitPercentage: 10,
        owner: "CryptoArtist",
        likes: 35,
        views: 98,
        network: {
          id: "1",
          name: "Ethereum",
          icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
          gasPrice: "100 Gwei",
          description: "The world's leading programmable blockchain",
        },
        collectionId: "1",
      },
    ], // This will be populated with the user's NFTs
    floorPrice: 1.2,
    totalValue: 5.8,
  },
  {
    id: "2",
    name: "Cyber Punks",
    description:
      "A collection of cyberpunk-themed NFTs featuring futuristic characters and scenes.",
    coverImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    owner: "CryptoArtist",
    createdAt: new Date(),
    nfts: [], // This will be populated with the user's NFTs
    floorPrice: 1.2,
    totalValue: 5.8,
  },
  // Add more collections as needed
];

interface CollectionContainerProps {
  nfts: NFT[];
  onListNFT: (nft: NFT, data: ListingFormData) => void;
}

export function CollectionContainer({ nfts, onListNFT }: CollectionContainerProps) {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  // Group NFTs by collection
  const collections = SAMPLE_COLLECTIONS.map((collection) => ({
    ...collection,
    nfts: nfts.filter((nft) => nft.collectionId === collection.id),
  }));

  // Add "Uncategorized" collection for NFTs without a collection
  const uncategorizedNFTs = nfts.filter((nft) => !nft.collectionId);
  if (uncategorizedNFTs.length > 0) {
    collections.push({
      id: "uncategorized",
      name: "Uncategorized",
      description: "NFTs that haven't been added to a collection",
      coverImage:
        "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
      owner: "You",
      createdAt: new Date(),
      nfts: uncategorizedNFTs,
      floorPrice: Math.min(...uncategorizedNFTs.map((nft) => nft.price || 0)),
      totalValue: uncategorizedNFTs.reduce((sum, nft) => sum + (nft.price || 0), 0),
    });
  }

  console.log("selectedCollection", selectedCollection);
  return (
    <Card className="h-full bg-background/50 backdrop-blur-lg border-muted overflow-auto">
      {selectedCollection ? (
        <CollectionView
          collection={selectedCollection}
          onBack={() => setSelectedCollection(null)}
          onListNFT={onListNFT}
        />
      ) : (
        <CollectionGrid collections={collections} onCollectionClick={setSelectedCollection} />
      )}
    </Card>
  );
}
