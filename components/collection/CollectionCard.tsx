"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Collection } from "../../types";
import { Eye, Heart, ShoppingCart, Wallet } from "lucide-react";
import { Button } from "../ui/button";

interface CollectionCardProps {
  collection: Collection;
  onClick: () => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden cursor-pointer group" onClick={onClick}>
        <div className="aspect-[2/1] relative overflow-hidden">
          <img
            src={collection.coverImage}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
            <p className="text-sm text-white/80">by {collection.owner}</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {collection.description}
          </p>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Floor</p>
                <p className="font-medium">{collection.floorPrice} ETH</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Items</p>
                <p className="font-medium">{collection.nfts.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <div>
                <p className="text-muted-foreground">Value</p>
                <p className="font-medium">{collection.totalValue} ETH</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              // setShowListingModal(true);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Deloy Network
          </Button>
          <Button
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              // setShowListingModal(true);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            List on OpenSea
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
