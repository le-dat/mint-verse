"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message, AIVersion } from "../../types";
import { Star } from "lucide-react";

interface ChatContainerProps {
  messages: Message[];
  onSend: (message: string) => void;
  onImageUpload: (file: File) => void;
  selectedVersion: AIVersion;
  onVersionSelect: (version: AIVersion) => void;
}

export function ChatContainer({
  messages,
  onSend,
  onImageUpload,
  selectedVersion,
  onVersionSelect,
}: ChatContainerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="flex-1 flex flex-col bg-background/50 backdrop-blur-lg border-muted">
      <ChatHeader
        selectedVersion={selectedVersion}
        onVersionSelect={onVersionSelect}
      />
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <ChatInput onSend={onSend} onImageUpload={onImageUpload} />
    </Card>
  );
}