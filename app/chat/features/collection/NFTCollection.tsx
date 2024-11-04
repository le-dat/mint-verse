"use client";

import { NFTCard } from "../../components/NFTCard";
import { NFT, ListingFormData } from "../../types";
import { motion } from "framer-motion";

interface NFTCollectionProps {
  nfts: NFT[];
  onListNFT: (nft: NFT, data: ListingFormData) => void;
}

export function NFTCollection({ nfts, onListNFT }: NFTCollectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Collection</h2>
        <p className="text-muted-foreground">
          {nfts.length} {nfts.length === 1 ? 'NFT' : 'NFTs'}
        </p>
      </div>

      {nfts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Your collection is empty. Start minting NFTs to see them here!
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {nfts.map((nft) => (
            <motion.div key={nft.id} variants={item}>
              <NFTCard
                nft={nft}
                onList={onListNFT}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}