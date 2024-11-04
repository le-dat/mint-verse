"use client";

import { NFTCard } from "./NFTCard";
import { NFT, ListingFormData } from "../types";

interface NFTCollectionProps {
  nfts: NFT[];
  onListNFT: (nft: NFT, data: ListingFormData) => void;
}

export function NFTCollection({ nfts, onListNFT }: NFTCollectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} onList={onListNFT} />
      ))}
    </div>
  );
}