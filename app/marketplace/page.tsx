"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { MarketplaceContainer } from "../../components/marketplace/MarketplaceContainer";
import { MARKETPLACE_NFTS } from "../../data/sample";
import { MarketplaceFilters, NFT } from "../../types";

export default function ChatPage() {
  const { toast } = useToast();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [marketplaceFilters, setMarketplaceFilters] = useState<MarketplaceFilters>({
    search: "",
    sortBy: "popular",
  });

  const handleBuyNFT = (nft: NFT) => {
    setNfts((prev) => [
      ...prev,
      {
        ...nft,
        id: Date.now().toString(),
        listed: false,
      },
    ]);

    toast({
      title: "NFT Purchased Successfully",
      description: `${nft.name} has been added to your collection`,
    });
  };

  return (
    <div className="flex bg-gradient-to-b from-background to-secondary">
      <MarketplaceContainer
        nfts={MARKETPLACE_NFTS}
        filters={marketplaceFilters}
        onFiltersChange={setMarketplaceFilters}
        onBuyNFT={handleBuyNFT}
      />
    </div>
  );
}
