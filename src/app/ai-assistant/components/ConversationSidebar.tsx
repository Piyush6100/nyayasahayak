'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, Scale, Landmark, MessageSquare, X, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const categories = [
  { id: 'cat-rti', label: 'RTI', icon: FileText },
  { id: 'cat-rights', label: 'Rights', icon: Scale },
  { id: 'cat-schemes', label: 'Schemes', icon: Landmark },
  { id: 'cat-docs', label: 'Documents', icon: MessageSquare },
];

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

interface Props {
  onClose: () => void;
  currentConversationId: string | null;
  onSelectConversation: (id: string | null) => void;
  refreshTrigger: number;
}

export default function ConversationSidebar({ onClose, currentConversationId, onSelectConversation, refreshTrigger }: Props) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('conversations')
          .select('id, title, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setConversations(data || []);
      } catch (err: any) {
        console.error('Failed to fetch conversations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [user, refreshTrigger]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Don't trigger select when deleting
    
    // Optimistic UI update
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      onSelectConversation(null);
    }

    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Conversation deleted');
    } catch (err: any) {
      console.error('Failed to delete conversation:', err);
      toast.error('Failed to delete conversation');
      // Trigger a re-fetch to restore state if failed
      onSelectConversation(currentConversationId); 
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (new Date().toDateString() === d.toDateString()) {
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-[14px] font-semibold text-foreground">Conversations</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectConversation(null)}
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
        
        {isLoading ? (
          <div className="px-3 py-2 text-xs text-muted-foreground">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="px-3 py-2 text-xs text-muted-foreground italic">No past conversations</div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors group cursor-pointer flex justify-between items-start ${
                currentConversationId === conv.id ? 'bg-primary/10' : 'hover:bg-muted'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Open conversation: ${conv.title}`}
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className={`text-[13px] font-medium truncate transition-colors ${
                  currentConversationId === conv.id ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}>
                  {conv.title}
                </p>
                <div className="mt-0.5">
                  <span className="text-[10px] text-muted-foreground/60">{formatDate(conv.updated_at)}</span>
                </div>
              </div>
              <button 
                onClick={(e) => handleDelete(e, conv.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 -mr-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-all"
                title="Delete Conversation"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))
        )}

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

    </div>
  );
}