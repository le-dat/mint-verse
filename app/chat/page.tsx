"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChatContainer } from "./features/chat/ChatContainer";
import { CollectionContainer } from "./features/collection/CollectionContainer";
import { MarketplaceContainer } from "./features/marketplace/MarketplaceContainer";
import { NetworkModal } from "./features/mint/NetworkModal";
import { Message, NFT, ListingFormData, MarketplaceFilters, Network, AIVersion } from "./types";
import { MARKETPLACE_NFTS, AI_VERSIONS } from "./data/sample";

export default function ChatPage() {
  const { toast } = useToast();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [pendingNFT, setPendingNFT] = useState<NFT | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<AIVersion>(AI_VERSIONS[0]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hi! I can help you mint your NFT. You can describe what you want to create using text or voice.',
      timestamp: new Date(),
    },
  ]);

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [marketplaceFilters, setMarketplaceFilters] = useState<MarketplaceFilters>({
    search: '',
    sortBy: 'popular',
  });

  const handleVersionSelect = (version: AIVersion) => {
    if (version.price > 0) {
      toast({
        title: `Upgrading to ${version.name}`,
        description: `Processing payment of ${version.price} ETH...`,
      });
    }
    setSelectedVersion(version);
  };

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response and NFT creation
    setTimeout(() => {
      const newNFT: NFT = {
        id: Date.now().toString(),
        name: 'AI Generated NFT',
        description: 'Created based on your description',
        imageUrl: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60',
        createdAt: new Date(),
      };

      setPendingNFT(newNFT);
      setShowNetworkModal(true);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've created an NFT based on your description using ${selectedVersion.name} AI. Please choose a network for deployment.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleNetworkSelect = (network: Network) => {
    if (pendingNFT) {
      const nftWithNetwork = { ...pendingNFT, network };
      setNfts(prev => [...prev, nftWithNetwork]);
      setPendingNFT(null);

      toast({
        title: "NFT Created Successfully",
        description: `Your NFT has been deployed to ${network.name}`,
      });
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: '📎 Image uploaded',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
    };
    reader.readAsDataURL(file);
  };

  const handleListNFT = (nft: NFT, data: ListingFormData) => {
    setNfts(prev => prev.map(item => 
      item.id === nft.id
        ? {
            ...item,
            ...data,
            listed: true,
          }
        : item
    ));

    toast({
      title: "NFT Listed Successfully",
      description: `${data.name} has been listed on OpenSea for ${data.price} ETH`,
    });
  };

  const handleBuyNFT = (nft: NFT) => {
    setNfts(prev => [...prev, {
      ...nft,
      id: Date.now().toString(),
      listed: false,
    }]);

    toast({
      title: "NFT Purchased Successfully",
      description: `${nft.name} has been added to your collection`,
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-background to-secondary">
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <ChatContainer
              messages={messages}
              onSend={handleSend}
              onImageUpload={handleImageUpload}
              selectedVersion={selectedVersion}
              onVersionSelect={handleVersionSelect}
            />
          </TabsContent>

          <TabsContent value="collection" className="flex-1">
            <CollectionContainer
              nfts={nfts}
              onListNFT={handleListNFT}
            />
          </TabsContent>

          <TabsContent value="marketplace" className="flex-1">
            <MarketplaceContainer
              nfts={MARKETPLACE_NFTS}
              filters={marketplaceFilters}
              onFiltersChange={setMarketplaceFilters}
              onBuyNFT={handleBuyNFT}
            />
          </TabsContent>
        </Tabs>

        <NetworkModal
          open={showNetworkModal}
          onClose={() => setShowNetworkModal(false)}
          onNetworkSelect={handleNetworkSelect}
        />
      </div>
    </div>
  );
}