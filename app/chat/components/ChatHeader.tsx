"use client";

import { Sparkles } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="p-4 border-b">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        NFT Minting Assistant
      </h1>
    </div>
  );
}