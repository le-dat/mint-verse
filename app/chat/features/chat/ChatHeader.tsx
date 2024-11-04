"use client";

import { Sparkles } from "lucide-react";
import { AIVersionSelector } from "../../components/AIVersionSelector";
import { AIVersion } from "../../types";

interface ChatHeaderProps {
  selectedVersion: AIVersion;
  onVersionSelect: (version: AIVersion) => void;
}

export function ChatHeader({ selectedVersion, onVersionSelect }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
        <Sparkles className="w-6 h-6" />
        NFT Minting Assistant
      </h1>
      <AIVersionSelector
        selectedVersion={selectedVersion}
        onVersionSelect={onVersionSelect}
      />
    </div>
  );
}