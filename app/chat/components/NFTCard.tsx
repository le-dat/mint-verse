"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { NFT, ListingFormData } from "../types";
import { ListingModal } from "./ListingModal";
import { NFTDetailModal } from "./NFTDetailModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NFTCardProps {
  nft: NFT;
  showBuyButton?: boolean;
  onList?: (nft: NFT, data: ListingFormData) => void;
  onBuy?: (nft: NFT) => void;
}

export function NFTCard({ nft, showBuyButton, onList, onBuy }: NFTCardProps) {
  const [showListingModal, setShowListingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleList = (data: ListingFormData) => {
    onList?.(nft, data);
    setShowListingModal(false);
  };

  return (
    <>
      <Card 
        className="overflow-hidden group cursor-pointer"
        onClick={() => setShowDetailModal(true)}
      >
        <div className="aspect-square relative">
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "bg-background/50 backdrop-blur-sm",
                liked && "text-red-500"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          {nft.listed && (
            <Badge className="absolute top-2 left-2 bg-primary">
              Listed on OpenSea
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{nft.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {nft.description}
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
            {nft.owner && <span>by {nft.owner}</span>}
            {(nft.views || nft.likes) && (
              <div className="flex items-center gap-3">
                {nft.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {nft.views}
                  </span>
                )}
                {nft.likes && (
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {nft.likes}
                  </span>
                )}
              </div>
            )}
          </div>

          {nft.listed && (
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-semibold ml-1">{nft.price} ETH</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Benefit:</span>
                <span className="font-semibold ml-1">{nft.benefitPercentage}%</span>
              </div>
            </div>
          )}

          {showBuyButton && nft.listed ? (
            <Button 
              className="w-full" 
              onClick={(e) => {
                e.stopPropagation();
                onBuy?.(nft);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          ) : !nft.listed && onList ? (
            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowListingModal(true);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              List on OpenSea
            </Button>
          ) : null}
        </div>
      </Card>

      <NFTDetailModal
        nft={nft}
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onList={onList && (() => setShowListingModal(true))}
        onBuy={onBuy}
      />

      {onList && (
        <ListingModal
          nft={nft}
          open={showListingModal}
          onClose={() => setShowListingModal(false)}
          onSubmit={handleList}
        />
      )}
    </>
  );
}