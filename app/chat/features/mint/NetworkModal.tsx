"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Network } from "../../types";

const NETWORKS: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "🌐",
    gasPrice: "High",
    description: "Main Ethereum network (Mainnet)",
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "⚡",
    gasPrice: "Low",
    description: "Polygon network for faster and cheaper transactions",
  },
  {
    id: "optimism",
    name: "Optimism",
    icon: "🔴",
    gasPrice: "Medium",
    description: "Optimistic rollup for Ethereum mainnet",
  },
];

interface NetworkModalProps {
  open: boolean;
  onClose: () => void;
  onNetworkSelect: (network: Network) => void;
}

export function NetworkModal({ open, onClose, onNetworkSelect }: NetworkModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<string>(NETWORKS[0].id);

  const handleDeploy = () => {
    const network = NETWORKS.find(n => n.id === selectedNetwork);
    if (network) {
      onNetworkSelect(network);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Network for Deployment</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedNetwork}
            onValueChange={setSelectedNetwork}
            className="space-y-4"
          >
            {NETWORKS.map((network) => (
              <div
                key={network.id}
                className="flex items-center space-x-3 space-y-0"
              >
                <RadioGroupItem value={network.id} id={network.id} />
                <Label
                  htmlFor={network.id}
                  className="flex-1 flex items-center cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{network.icon}</span>
                      <span className="font-medium">{network.name}</span>
                      <span className="text-xs bg-secondary px-2 py-1 rounded">
                        Gas: {network.gasPrice}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {network.description}
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDeploy}>
            Deploy NFT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}