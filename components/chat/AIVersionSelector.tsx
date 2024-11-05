"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Star, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIVersion } from "@/types";

const AI_VERSIONS: AIVersion[] = [
  {
    id: "basic",
    name: "Basic",
    icon: Star,
    price: 0,
    features: ["Basic NFT generation", "Text-to-image", "Standard response time"],
    color: "bg-secondary",
  },
  {
    id: "good",
    name: "Good",
    icon: Zap,
    price: 0.01,
    features: ["Enhanced NFT quality", "Voice commands", "Faster responses", "Priority support"],
    color: "bg-blue-500",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Sparkles,
    price: 0.05,
    features: [
      "Professional NFT generation",
      "Advanced customization",
      "Instant responses",
      "24/7 Priority support",
      "Exclusive features",
    ],
    color: "bg-purple-500",
  },
  {
    id: "vip",
    name: "VIP",
    icon: Crown,
    price: 0.1,
    features: [
      "Ultra-high quality NFTs",
      "Custom art styles",
      "Real-time collaboration",
      "Dedicated support team",
      "Early access to features",
      "Unlimited generations",
    ],
    color: "bg-amber-500",
  },
];

interface AIVersionSelectorProps {
  selectedVersion: AIVersion;
  onVersionSelect: (version: AIVersion) => void;
}

export function AIVersionSelector({
  selectedVersion,
  onVersionSelect,
}: AIVersionSelectorProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setShowModal(true)}
      >
        <selectedVersion.icon className="w-4 h-4" />
        {selectedVersion.name} AI
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose AI Version</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {AI_VERSIONS.map((version) => (
              <motion.div
                key={version.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className={cn(
                    "w-full p-4 rounded-lg text-left transition-colors",
                    "border-2 hover:border-primary",
                    selectedVersion.id === version.id
                      ? "border-primary"
                      : "border-muted",
                  )}
                  onClick={() => {
                    onVersionSelect(version);
                    setShowModal(false);
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg text-white",
                        version.color
                      )}
                    >
                      <version.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{version.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {version.price} ETH
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {version.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </button>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}