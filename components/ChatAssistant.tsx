
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

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
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-80 md:w-96 glass rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-white/10"
          >
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Sparkles size={14} className="sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold">Diddy AI</h5>
                  <p className="text-[9px] sm:text-[10px] text-green-400 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors p-1">
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-white/40 text-xs sm:text-sm py-8 sm:py-10 px-4">
                  Ask me anything about Dwarkesh's projects or skills!
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm ${
                    msg.role === 'user' 
                    ? 'bg-white text-black rounded-br-none' 
                    : 'bg-white/5 border border-white/10 text-white/80 rounded-bl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-base sm:text-lg font-bold text-teal-400 mt-3 mb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-sm sm:text-base font-bold text-teal-400 mt-2 mb-1" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-xs sm:text-sm font-bold text-white mt-2 mb-1" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                            em: ({node, ...props}) => <em className="italic text-white/90" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="text-white/80" {...props} />,
                            code: ({node, inline, ...props}: any) => 
                              inline ? (
                                <code className="bg-white/10 px-1 py-0.5 rounded text-teal-300 text-[10px] sm:text-xs" {...props} />
                              ) : (
                                <code className="block bg-white/10 p-2 rounded mt-1 mb-2 text-[10px] sm:text-xs overflow-x-auto" {...props} />
                              ),
                            a: ({node, ...props}) => <a className="text-teal-400 hover:text-teal-300 underline" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl rounded-bl-none">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-150"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 outline-none focus:border-white/20 transition-all text-xs sm:text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 p-1.5 sm:p-2 bg-white text-black rounded-md sm:rounded-lg hover:scale-105 transition-transform"
                >
                  <Send size={14} className="sm:w-4 sm:h-4" />
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
        className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:shadow-white/20 transition-all"
      >
        <MessageSquare size={20} className="sm:w-6 sm:h-6" />
      </motion.button>
    </div>
  );
};

export default ChatAssistant;
