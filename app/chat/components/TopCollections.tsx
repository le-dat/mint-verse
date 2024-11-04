"use client";

import { Card } from "@/components/ui/card";
import { NFT } from "../types";
import { TrendingUp, Eye, Heart } from "lucide-react";

interface TopCollectionsProps {
  collections: NFT[];
}

export function TopCollections({ collections }: TopCollectionsProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Top Collections</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {collections.slice(0, 3).map((nft) => (
          <Card key={nft.id} className="p-3 flex items-center gap-3">
            <img
              src={nft.imageUrl}
              alt={nft.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{nft.name}</h4>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {nft.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" /> {nft.likes}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}