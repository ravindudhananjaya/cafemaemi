import React, { useState, useRef, useEffect } from 'react';
import { Send, X, User, Loader2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { MENU_ITEMS, TEXTS } from '../constants';
import { getMenuRecommendation } from '../services/gemini';

interface AiWaiterProps {
  lang: Language;
}

const AiWaiter: React.FC<AiWaiterProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { 
      role: 'ai', 
      text: lang === Language.EN 
        ? "Namaste! I'm your personal flavor concierge. Tell me what tastes you enjoy, and I'll guide you through our spices." 
        : "ナマステ！専属のフレーバーコンシェルジュです。お好みの味をお聞かせいただければ、最適なスパイス料理をご案内します。" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const response = await getMenuRecommendation(userMsg, MENU_ITEMS, lang);
    
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-red-700 to-red-900 text-amber-100 p-4 rounded-full shadow-2xl shadow-amber-900/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2 group border-2 border-amber-500"
        >
          <Sparkles size={24} className="animate-pulse text-amber-400" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-serif font-bold tracking-wide">
            {TEXTS.askChef[lang.toLowerCase()]}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border-2 border-amber-600 animate-fade-in-up">
          {/* Header */}
          <div className="bg-red-900 p-4 flex justify-between items-center text-white border-b border-amber-500">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 p-1.5 rounded-full">
                <User size={16} className="text-red-900" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-amber-100">{TEXTS.chefRecommends[lang.toLowerCase()]}</h3>
                <p className="text-[10px] text-amber-200 uppercase tracking-wider">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-amber-200 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 h-80 overflow-y-auto bg-orange-50 space-y-4" style={{backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.95}}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-red-800 text-white rounded-br-none' 
                      : 'bg-white text-red-950 border border-amber-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                <div className="bg-white text-amber-600 border border-amber-200 p-3 rounded-2xl rounded-bl-none text-sm shadow-sm flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  <span className="italic">{TEXTS.loading[lang.toLowerCase()]}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-amber-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={TEXTS.askPlaceholder[lang.toLowerCase()]}
              className="flex-1 bg-orange-50 border border-amber-200 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 rounded-full px-4 py-2 text-sm outline-none text-red-900 placeholder-red-900/40"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-red-800 hover:bg-red-900 text-amber-100 p-2.5 rounded-full transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiWaiter;