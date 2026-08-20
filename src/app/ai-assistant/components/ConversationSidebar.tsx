'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, FileText, Scale, Landmark, MessageSquare, X } from 'lucide-react';
import { demoConversations } from '@/data/demoConversations';

const categories = [
  { id: 'cat-rti', label: 'RTI', icon: FileText },
  { id: 'cat-rights', label: 'Rights', icon: Scale },
  { id: 'cat-schemes', label: 'Schemes', icon: Landmark },
  { id: 'cat-docs', label: 'Documents', icon: MessageSquare },
];

interface Props {
  onClose: () => void;
}

export default function ConversationSidebar({ onClose }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-[14px] font-semibold text-foreground">Conversations</h2>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-[12px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150"
            aria-label="Start new conversation"
          >
            <Plus size={13} />
            New
          </button>
          <button className="lg:hidden p-1.5 rounded-lg hover:bg-muted transition-colors" onClick={onClose} aria-label="Close sidebar">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Recent conversations */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">Recent</p>
        {demoConversations.map((conv) => (
          <button
            key={conv.id}
            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
            aria-label={`Open conversation: ${conv.title}`}
          >
            <p className="text-[13px] font-medium text-foreground truncate group-hover:text-primary transition-colors">{conv.title}</p>
            <div className="flex items-center justify-between mt-0.5">
              <p className="text-[11px] text-muted-foreground truncate flex-1">{conv.preview}</p>
              <span className="text-[10px] text-muted-foreground/60 flex-shrink-0 ml-2">{conv.timestamp}</span>
            </div>
          </button>
        ))}

        {/* Categories */}
        <div className="pt-4">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">Categories</p>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left"
                aria-label={`Browse ${cat.label} conversations`}
              >
                <Icon size={15} className="text-muted-foreground" />
                <span className="text-[13px] text-foreground">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RTI shortcut */}
      <div className="p-3 border-t border-border">
        <Link
          href="/rti-assistant"
          className="flex items-center gap-3 px-3 py-3 rounded-xl bg-primary/8 border border-primary/15 hover:bg-primary/12 transition-colors"
        >
          <FileText size={16} className="text-primary" />
          <div>
            <p className="text-[13px] font-semibold text-primary">RTI Assistant</p>
            <p className="text-[11px] text-muted-foreground">Build an RTI application</p>
          </div>
        </Link>
      </div>
    </div>
  );
}