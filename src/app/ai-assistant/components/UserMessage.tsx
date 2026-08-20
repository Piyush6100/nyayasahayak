import React from 'react';
import { type Message } from '@/data/demoConversations';
import { FileText, FileSpreadsheet, FileCode, File } from 'lucide-react';

interface Props {
  message: Message;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf' || ext === 'doc' || ext === 'docx' || ext === 'txt') {
    return <FileText size={14} className="text-white/90" />;
  }
  if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
    return <FileSpreadsheet size={14} className="text-white/90" />;
  }
  if (ext === 'json' || ext === 'html' || ext === 'xml') {
    return <FileCode size={14} className="text-white/90" />;
  }
  return <File size={14} className="text-white/90" />;
};

export default function UserMessage({ message }: Props) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="max-w-[75%] space-y-2">
        {/* Attachments preview if present */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end">
            {message.attachments.map((file, idx) => (
              <div
                key={`user-att-${idx}-${file.name}`}
                className="flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-xl text-[12px] shadow-sm border border-white/20"
              >
                {getFileIcon(file.name)}
                <span className="font-medium truncate max-w-[180px]">{file.name}</span>
                <span className="text-[10px] opacity-80">({file.size})</span>
              </div>
            ))}
          </div>
        )}

        {message.content && (
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 text-[14px] leading-relaxed shadow-sm">
            {message.content}
          </div>
        )}
        <p className="text-[11px] text-muted-foreground mt-1 text-right">{message.timestamp}</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <span className="text-[11px] font-semibold text-foreground">You</span>
      </div>
    </div>
  );
}