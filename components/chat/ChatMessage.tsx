'use client';

import { Avatar } from '@/components/ui/avatar';
import { Message } from '../../types';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'flex gap-3 max-w-[80%]',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <Avatar
          className={cn(
            'w-8 h-8',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          )}
        >
          <span className='text-xs'>{isUser ? 'You' : 'AI'}</span>
        </Avatar>

        <div
          className={cn(
            'rounded-xl border p-3',
            isUser
              ? 'bg-[#9945FF] text-white border-[#C99FFF]'
              : 'bg-muted border-[#FFFFFF2B]'
          )}
        >
          <p className='whitespace-pre-wrap break-words'>{message.content}</p>
          <time className='text-xs opacity-50 mt-1 block'>
            {new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(message.timestamp)}
          </time>
        </div>
      </div>
    </div>
  );
}
