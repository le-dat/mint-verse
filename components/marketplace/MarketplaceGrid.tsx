"use client";

import { NFT } from "../../types";
import { NFTCard } from "../nft/NFTCard";

interface MarketplaceGridProps {
  nfts: NFT[];
  onBuy: (nft: NFT) => void;
}

export function MarketplaceGrid({ nfts, onBuy }: MarketplaceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} showBuyButton onBuy={() => onBuy(nft)} />
      ))}
    </div>
  );
}
