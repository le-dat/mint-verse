'use client';

import { useState, useRef } from 'react';
import { Mic, MicOff, Send, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVoiceRecording } from '../../hooks/use-voice-recording';
import { cn } from '@/lib/utils';

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

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="p-4 border-t m-4 border-border dark:bg-white/10 bg-white/10 backdrop-blur-sm rounded-[36px]">
      {/* Border animation */}
      <div className=" rounded-[28px] pointer-events-none absolute inset-0 overflow-hidden after:absolute after:w-[120px] after:h-10 after:blur-md after:bg-gradient-to-r after:from-white after:via-white after:to-transparent after:animate-moveAround dark:bg-[#26517826] dark:backdrop-blur-[15px]" />

      <div className="flex gap-2 items-center p-4 dark:bg-black bg-primary-foreground relative z-10 rounded-3xl">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            id="image-upload"
          />
          <Button variant="warning" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
            <ImageIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex gap-2">
          <Input
            placeholder={isRecording ? 'Recording...' : 'Describe your NFT idea...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isRecording}
          />
          <Button
            variant={isRecording ? 'destructive' : 'default'}
            size="icon"
            onClick={toggleRecording}
            className={cn(
              'shrink-0 transition-colors bg-transparent hover:bg-transparent hover:opacity-75',
              isRecording && 'animate-pulse'
            )}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 stroke-red-500" />
            ) : (
              <Mic className="w-5 h-5 dark:stroke-white stroke-primary" />
            )}
          </Button>

          <Button variant="info" onClick={handleSend} className="shrink-0" disabled={!input.trim() && !isRecording}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
