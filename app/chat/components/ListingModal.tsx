"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NFT, ListingFormData } from "../types";

interface ListingModalProps {
  nft: NFT;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ListingFormData) => void;
}

export function ListingModal({ nft, open, onClose, onSubmit }: ListingModalProps) {
  const [formData, setFormData] = useState<ListingFormData>({
    name: nft.name,
    description: nft.description,
    price: nft.price || 0,
    benefitPercentage: nft.benefitPercentage || 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List NFT on OpenSea</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (ETH)</Label>
              <Input
                id="price"
                type="number"
                step="0.001"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="benefit">Benefit %</Label>
              <Input
                id="benefit"
                type="number"
                min="0"
                max="100"
                value={formData.benefitPercentage}
                onChange={(e) => setFormData({ ...formData, benefitPercentage: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">List on OpenSea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}