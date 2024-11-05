"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Share2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NFT } from "@/types";

interface NFTDetailModalProps {
  nft: NFT;
  open: boolean;
  onClose: () => void;
  onList?: (nft: NFT) => void;
  onBuy?: (nft: NFT) => void;
}

export function NFTDetailModal({ nft, open, onClose, onList, onBuy }: NFTDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] p-0 gap-0">
        <ScrollArea className="h-full">
          <div className="grid md:grid-cols-2 h-full">
            {/* Image Section */}
            <div className="relative">
              <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/50 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-background/50 backdrop-blur-sm"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              {nft.network && (
                <Badge className="absolute top-4 left-4 bg-primary">
                  {nft.network.icon} {nft.network.name}
                </Badge>
              )}
            </div>

            {/* Details Section */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{nft.name}</h2>
                <p className="text-muted-foreground">{nft.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <p className="font-medium">{nft.owner || "Anonymous"}</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {nft.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {nft.likes || 0}
                  </span>
                </div>
              </div>

              <Separator />

              {nft.listed && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{nft.price} ETH</span>
                    <span className="text-sm text-muted-foreground">
                      (Benefit: {nft.benefitPercentage}%)
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Network</p>
                    <p className="font-medium">{nft.network?.name || "Not deployed"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="font-medium">{nft.createdAt.toLocaleDateString()}</p>
                  </div>
                  {nft.listed && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Listed on</p>
                        <p className="font-medium">OpenSea</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge variant="secondary">For Sale</Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 space-x-3">
                {nft.listed && onBuy ? (
                  <Button className="w-full" onClick={() => onBuy(nft)}>
                    Buy Now for {nft.price} ETH
                  </Button>
                ) : !nft.listed && onList ? (
                  <Button className="w-full" onClick={() => onList(nft)}>
                    List on OpenSea
                  </Button>
                ) : null}
                {nft.listed && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      View on OpenSea <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
