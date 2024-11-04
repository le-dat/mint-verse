"use client";

import { useState, useRef } from "react";
import { Mic, MicOff, Send, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVoiceRecording } from "../../hooks/useVoiceRecording";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  onImageUpload: (file: File) => void;
}

export function ChatInput({ onSend, onImageUpload }: ChatInputProps) {
  const { isRecording, startRecording, stopRecording } = useVoiceRecording();
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 border-t border-border">
      <div className="flex gap-2">
        <Button
          variant={isRecording ? "destructive" : "secondary"}
          size="icon"
          onClick={() => isRecording ? stopRecording() : startRecording()}
          className={cn(
            "shrink-0 transition-colors",
            isRecording && "animate-pulse"
          )}
        >
          {isRecording ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>
        
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            id="image-upload"
          />
          <Button
            variant="secondary"
            size="icon"
            className="shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex gap-2">
          <Input
            placeholder={isRecording ? "Recording..." : "Describe your NFT idea..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isRecording}
          />
          <Button 
            onClick={handleSend} 
            className="shrink-0"
            disabled={!input.trim() && !isRecording}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}