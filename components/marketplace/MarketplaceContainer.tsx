'use client';

import { MarketplaceHeader } from './MarketplaceHeader';
import { TopCollections } from '../collection/TopCollections';
import { MarketplaceGrid } from './MarketplaceGrid';
import { NFT, MarketplaceFilters } from '../../types';
import { Card } from '@/components/ui/card';

interface MarketplaceContainerProps {
  nfts: NFT[];
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
  onBuyNFT: (nft: NFT) => void;
}

export function MarketplaceContainer({
  nfts,
  filters,
  onFiltersChange,
  onBuyNFT,
}: MarketplaceContainerProps) {
  const filteredNFTs = nfts
    .filter(
      (nft) =>
        nft.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        nft.description.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((nft) => nft.listed) // Only show listed NFTs
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return (a.price || 0) - (b.price || 0);
        case 'price_high':
          return (b.price || 0) - (a.price || 0);
        case 'recent':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default: // 'popular'
          return (b.likes || 0) - (a.likes || 0);
      }
    });

  return (
    <Card className='h-full border-muted bg-transparent overflow-auto'>
      <MarketplaceHeader filters={filters} onFiltersChange={onFiltersChange} />
      <TopCollections collections={nfts.filter((nft) => nft.listed)} />
      <MarketplaceGrid nfts={filteredNFTs} onBuy={onBuyNFT} />
    </Card>
  );
}
