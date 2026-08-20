import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Scale, Copy, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';
import { sendChatRequest } from './services/api';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Hello! I am an AI assistant specialized in Indian Law. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuestion = input.trim();
    setInput('');
    setError(null);
    
    setMessages(prev => [...prev, { role: 'user', content: userQuestion }]);
    setIsLoading(true);

    try {
      const data = await sendChatRequest(userQuestion);
      setMessages(prev => [...prev, { role: 'ai', content: data.answer }]);
    } catch (err) {
      setError(err.message || "Failed to generate a response. Please check if the backend is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'ai',
        content: 'Hello! I am an AI assistant specialized in Indian Law. How can I help you today?'
      }
    ]);
    setError(null);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-legal-blue text-white shadow-md z-10">
        <div className="flex items-center gap-3">
          <Scale size={28} className="text-legal-gold" />
          <h1 className="text-xl font-bold tracking-tight">NyayaSahayak AI</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleClearChat}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-slate-700 transition-colors border border-slate-600"
          >
            <Trash2 size={16} />
            Clear
          </button>
          <button 
            onClick={handleClearChat}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-legal-gold text-legal-dark hover:bg-yellow-500 transition-colors"
          >
            <PlusCircle size={16} />
            New Chat
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
        {/* Disclaimer */}
        <div className="mx-auto max-w-4xl w-full">
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-800 text-sm shadow-sm mb-6">
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <p>
              <strong>Disclaimer:</strong> This AI assistant provides general legal information for educational purposes only and is not a substitute for professional legal advice. Always consult a qualified legal professional for advice concerning your specific situation.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl w-full flex flex-col gap-6 pb-20">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex flex-col max-w-[85%] md:max-w-[75%] rounded-2xl p-5 shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-legal-blue text-white rounded-tr-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-opacity-20 border-current">
                  <span className="font-semibold text-xs tracking-wider uppercase opacity-80">
                    {msg.role === 'user' ? 'You' : 'Legal AI'}
                  </span>
                </div>
                <div className={`prose prose-sm md:prose-base max-w-none ${msg.role === 'user' ? 'prose-invert text-white' : 'text-slate-800'}`}>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
                
                {msg.role === 'ai' && (
                  <div className="mt-4 pt-3 flex justify-end border-t border-slate-100">
                    <button 
                      onClick={() => handleCopy(msg.content)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                      title="Copy response"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-5 shadow-sm flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-slate-500 font-medium">Analyzing legal context...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 flex items-center gap-3 shadow-sm">
              <AlertTriangle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-slate-200 p-4 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <form onSubmit={handleSubmit} className="flex relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask a question about Indian law..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl py-3 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-legal-blue focus:border-transparent resize-none min-h-[60px] max-h-[120px] shadow-inner"
              rows={1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 md:bottom-3 p-2 bg-legal-blue text-white rounded-lg hover:bg-indigo-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-xs text-slate-400 font-medium">
              Powered by Gemma-2-2B-Indian-Law. Press Enter to send, Shift+Enter for new line.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
