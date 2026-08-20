'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, MicOff, Send, X, FileText, FileSpreadsheet, FileCode, File, Volume2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { type MessageAttachment } from '@/data/demoConversations';
import VoiceHelperModal from '@/components/ui/VoiceHelperModal';

interface Props {
  onSend: (content: string, attachments?: MessageAttachment[]) => void;
  disabled?: boolean;
}

const suggestedPrompts = [
  { id: 'sugg-rti', text: 'Help me file an RTI' },
  { id: 'sugg-deposit', text: 'Landlord deposit issue' },
  { id: 'sugg-consumer', text: 'Consumer complaint' },
  { id: 'sugg-scheme', text: 'Check my scheme eligibility' },
];

export default function MessageComposer({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [showVoiceHelper, setShowVoiceHelper] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up recording on unmount
  useEffect(() => {
    return () => {
      stopAllRecording();
    };
  }, []);

  const stopAllRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch { }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch { }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsListening(false);
    setRecordSeconds(0);
  };

  const startVoiceRecording = async () => {
    if (disabled) return;

    if (isListening) {
      stopAllRecording();
      toast.info('Voice recording stopped');
      return;
    }

    try {
      // 1. Request hardware microphone access
      let stream: MediaStream | null = null;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;
        } catch (mediaErr: any) {
          console.warn('Microphone getUserMedia not available or permission denied:', mediaErr);
        }
      }

      // 2. Setup MediaRecorder if stream is available
      if (stream) {
        audioChunksRef.current = [];
        try {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };
          recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            if (audioBlob.size > 1000) {
              const audioFileAttachment: MessageAttachment = {
                name: `Voice_Note_${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }).replace(' ', '_')}.webm`,
                size: `${(audioBlob.size / 1024).toFixed(1)} KB`,
                type: 'audio/webm',
              };
              setAttachments((prev) => [...prev, audioFileAttachment]);
            }
          };
          recorder.start();
          mediaRecorderRef.current = recorder;
        } catch (recErr) {
          console.warn('MediaRecorder error:', recErr);
        }
      }

      // 3. Setup Web Speech Recognition for live Speech-to-Text
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-IN';

          recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              }
            }
            if (finalTranscript) {
              setValue((prev) => {
                const sep = prev && !prev.endsWith(' ') ? ' ' : '';
                return `${prev}${sep}${finalTranscript.trim()}`;
              });
            }
          };

          recognition.onerror = (event: any) => {
            console.warn('Speech recognition warning:', event.error);
            if (event.error === 'not-allowed') {
              toast.error('Microphone blocked. Check browser/Windows settings.');
              setShowVoiceHelper(true);
            }
          };

          recognition.onend = () => {
            // Keep active if recording
          };

          recognitionRef.current = recognition;
          recognition.start();
        } catch (speechErr) {
          console.warn('SpeechRecognition start failed:', speechErr);
        }
      }

      // 4. Start timer & visual state
      setIsListening(true);
      setRecordSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);

      toast.success('Microphone active — Speak now!');
    } catch (err: any) {
      console.error('Recording initialization error:', err);
      setIsListening(false);
      setShowVoiceHelper(true);
      toast.error('Could not access microphone: ' + (err.message || 'Permission denied'));
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleFileClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: MessageAttachment[] = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || file.name.split('.').pop() || 'file',
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    toast.success(`Attached ${newAttachments.length} document${newAttachments.length > 1 ? 's' : ''}`);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSend = () => {
    if ((value.trim() || attachments.length > 0) && !disabled) {
      stopAllRecording();
      const sendText = value.trim() || (attachments.length > 0 ? `Attached: ${attachments.map(a => a.name).join(', ')}` : '');
      onSend(sendText, attachments);
      setValue('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.includes('Voice_Note')) {
      return <Volume2 size={13} className="text-accent" />;
    }
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf' || ext === 'doc' || ext === 'docx' || ext === 'txt') {
      return <FileText size={13} className="text-primary" />;
    }
    if (ext === 'xls' || ext === 'xlsx' || ext === 'csv') {
      return <FileSpreadsheet size={13} className="text-success" />;
    }
    if (ext === 'json' || ext === 'html' || ext === 'xml') {
      return <FileCode size={13} className="text-accent" />;
    }
    return <File size={13} className="text-muted-foreground" />;
  };

  return (
    <div className="space-y-3">
      {/* Windows & Voice Helper Modal */}
      <VoiceHelperModal
        isOpen={showVoiceHelper}
        onClose={() => setShowVoiceHelper(false)}
        onSelectSample={(sampleText) => {
          setValue(sampleText);
          textareaRef.current?.focus();
        }}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.rtf,.odt,.png,.jpg,.jpeg,.csv,.xlsx,.webm,.mp3,.m4a,.wav"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Suggested prompts */}
      <div className="flex gap-2 flex-wrap">
        {suggestedPrompts.map((p) => (
          <button
            key={p.id}
            onClick={() => { setValue(p.text); textareaRef.current?.focus(); }}
            disabled={disabled}
            className="text-[12px] px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={`Use suggestion: ${p.text}`}
          >
            {p.text}
          </button>
        ))}
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap p-2 bg-secondary/60 rounded-xl border border-border">
          {attachments.map((file, idx) => (
            <div
              key={`att-${idx}-${file.name}`}
              className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg shadow-sm text-[12px] text-foreground"
            >
              {getFileIcon(file.name)}
              <span className="font-medium truncate max-w-[180px]">{file.name}</span>
              <span className="text-muted-foreground text-[11px]">({file.size})</span>
              <button
                type="button"
                onClick={() => removeAttachment(idx)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-1"
                aria-label={`Remove attachment ${file.name}`}
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input container */}
      <div className={`relative bg-card rounded-2xl transition-all duration-200 ${isFocused ? 'shadow-input-focus' : 'shadow-input'} ${isListening ? 'ring-2 ring-accent border-accent' : ''}`}>
        {/* Active Microphone live recording status bar */}
        {isListening && (
          <div className="flex items-center justify-between px-4 pt-3 pb-1 bg-accent/5 rounded-t-2xl border-b border-accent/20 text-accent text-[12px] font-semibold">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <span className="font-mono text-[13px] bg-accent/15 px-2 py-0.5 rounded-md text-accent font-bold">
                {formatTimer(recordSeconds)}
              </span>
              <span className="hidden sm:inline">Listening... Speak clearly</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowVoiceHelper(true)}
                className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <HelpCircle size={12} />
                <span>Tips</span>
              </button>
              <button
                type="button"
                onClick={stopAllRecording}
                className="text-xs bg-accent text-white px-3 py-1 rounded-full font-medium hover:bg-accent/90 shadow-sm transition-all"
              >
                Stop Recording
              </button>
            </div>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Recording voice... (You can speak in English, Hindi or Gujarati)" : "Describe your situation or attach documents..."}
          disabled={disabled}
          className="w-full bg-transparent px-5 pt-4 pb-3 text-[14px] text-foreground placeholder:text-muted-foreground resize-none outline-none rounded-2xl min-h-[72px] max-h-[160px] disabled:opacity-50"
          aria-label="Type your message"
          rows={2}
        />

        <div className="flex items-center justify-between px-4 pb-3 relative">
          <p className="text-[11px] text-muted-foreground">Don&apos;t worry about legal terms.</p>
          <div className="flex items-center gap-1.5">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={handleFileClick}
              disabled={disabled}
              className={`p-2 rounded-lg transition-colors disabled:opacity-40 relative ${attachments.length > 0 ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              title="Attach documents (PDF, Word, Images, Audio)"
              aria-label="Attach file"
            >
              <Paperclip size={15} />
              {attachments.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                  {attachments.length}
                </span>
              )}
            </button>

            {/* Microphone Button */}
            <button
              type="button"
              onClick={startVoiceRecording}
              disabled={disabled}
              className={`p-2 rounded-lg transition-all disabled:opacity-40 ${isListening
                ? 'bg-accent text-white shadow-lg animate-pulse ring-2 ring-accent/50'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              title={isListening ? 'Stop voice recording' : 'Microphone: Speak your question'}
              aria-label={isListening ? 'Stop voice recording' : 'Start microphone recording'}
            >
              {isListening ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            {/* Send Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={(!value.trim() && attachments.length === 0) || disabled}
              className="flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-[13px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all duration-150"
              aria-label="Send message"
            >
              <Send size={13} />
              Send
            </button>
          </div >
        </div >
      </div >
    </div >
  );
}