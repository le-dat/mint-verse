"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChatContainer } from "../../components/chat/ChatContainer";
import { MarketplaceContainer } from "../../components/marketplace/MarketplaceContainer";
import { Message, NFT, ListingFormData, MarketplaceFilters, Network, AIVersion } from "../../types";
import { MARKETPLACE_NFTS, AI_VERSIONS } from "../../data/sample";
import { CollectionContainer } from "@/components/collection/CollectionContainer";
import { NetworkModal } from "@/components/modal/NetworkModal";

export default function ChatPage() {
  const { toast } = useToast();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [pendingNFT, setPendingNFT] = useState<NFT | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<AIVersion>(AI_VERSIONS[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I can help you mint your NFT. You can describe what you want to create using text or voice.",
      timestamp: new Date(),
    },
  ]);

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [marketplaceFilters, setMarketplaceFilters] = useState<MarketplaceFilters>({
    search: "",
    sortBy: "popular",
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
      type: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response and NFT creation
    setTimeout(() => {
      const newNFT: NFT = {
        id: Date.now().toString(),
        name: "AI Generated NFT",
        description: "Created based on your description",
        imageUrl:
          "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
        createdAt: new Date(),
      };

      setPendingNFT(newNFT);
      setShowNetworkModal(true);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I've created an NFT based on your description using ${selectedVersion.name} AI. Please choose a network for deployment.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: "📎 Image uploaded",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] p-4 overflow-hidden bg-gradient-to-b from-background to-secondary">
        <ChatContainer
          messages={messages}
          onSend={handleSend}
          onImageUpload={handleImageUpload}
          selectedVersion={selectedVersion}
          onVersionSelect={handleVersionSelect}
        />
    </div>
  );
}
