'use client';

import { CollectionContainer } from '@/components/collection/CollectionContainer';
import { NetworkModal } from '@/components/modal/NetworkModal';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { ListingFormData, Network, NFT } from '../../types';

export default function ChatPage() {
  const { toast } = useToast();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [pendingNFT, setPendingNFT] = useState<NFT | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  const handleNetworkSelect = (network: Network) => {
    if (pendingNFT) {
      const nftWithNetwork = { ...pendingNFT, network };
      setNfts((prev) => [...prev, nftWithNetwork]);
      setPendingNFT(null);

      toast({
        title: 'NFT Created Successfully',
        description: `Your NFT has been deployed to ${network.name}`,
      });
    }
  };

  const handleListNFT = (nft: NFT, data: ListingFormData) => {
    setNfts((prev) =>
      prev.map((item) =>
        item.id === nft.id
          ? {
              ...item,
              ...data,
              listed: true,
            }
          : item
      )
    );

    toast({
      title: 'NFT Listed Successfully',
      description: `${data.name} has been listed on OpenSea for ${data.price} ETH`,
    });
  };

  return (
    <div className='flex h-screen bg-transparent'>
      <div className='flex flex-col w-full max-w-6xl mx-auto p-4'>
        <CollectionContainer nfts={nfts} onListNFT={handleListNFT} />

        <NetworkModal
          open={showNetworkModal}
          onClose={() => setShowNetworkModal(false)}
          onNetworkSelect={handleNetworkSelect}
        />
      </div>
    </div>
  );
}
