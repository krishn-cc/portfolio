
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getAIResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass rounded-3xl overflow-hidden shadow-2xl border-white/10"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <h5 className="text-sm font-bold">Dwarkesh AI</h5>
                  <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-white/40 text-sm py-10">
                  Ask me anything about Dwarkesh's projects or skills!
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-white text-black rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl rounded-bl-none">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-white/20 transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-2 bg-white text-black rounded-lg hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:shadow-white/20 transition-all"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};

export default ChatAssistant;
