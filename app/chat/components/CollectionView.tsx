"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Collection, NFT, ListingFormData } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { NFTCard } from "./NFTCard";

interface CollectionViewProps {
  collection: Collection;
  onBack: () => void;
  onListNFT: (nft: NFT, data: ListingFormData) => void;
}

export function CollectionView({ collection, onBack, onListNFT }: CollectionViewProps) {
  console.log('collection', collection);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-6 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{collection.name}</h2>
          <p className="text-sm text-muted-foreground">
            {collection.nfts.length} {collection.nfts.length === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 h-48 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <AnimatePresence>
            {collection.nfts.map((nft) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <NFTCard
                  nft={nft}
                  onList={onListNFT}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}