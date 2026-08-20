import React from 'react';
import { type Message } from '@/data/demoConversations';

interface Props {
  message: Message;
}

export default function UserMessage({ message }: Props) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="max-w-[75%]">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 text-[14px] leading-relaxed">
          {message.content}
        </div>
        <p className="text-[11px] text-muted-foreground mt-1 text-right">{message.timestamp}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <span className="text-[11px] font-semibold text-foreground">You</span>
      </div>
    </div>
  );
}