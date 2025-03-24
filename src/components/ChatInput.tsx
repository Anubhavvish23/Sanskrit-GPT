
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal, Mic, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <motion.div
      className="sticky bottom-0 w-full py-4 bg-background/80 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-2 max-w-3xl mx-auto"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about Sanskrit..."
            className="w-full py-3 px-4 pr-12 rounded-full border border-border focus:ring-2 focus:ring-accent/40 focus:border-accent focus:outline-none transition-all glass-morphism"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-muted-foreground hover:text-accent transition-colors"
            aria-label="Voice input"
          >
            <Mic size={18} />
          </button>
        </div>
        <motion.button
          type="submit"
          className="p-3 rounded-full bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || isLoading}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatInput;
