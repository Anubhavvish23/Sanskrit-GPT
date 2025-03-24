
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface MessageBubbleProps {
  message: {
    id: string;
    content: string;
    sanskrit?: string;
    isBot: boolean;
  };
  onPlayAudio: (text: string) => void;
}

const MessageBubble = ({ message, onPlayAudio }: MessageBubbleProps) => {
  const isBot = message.isBot;
  
  return (
    <motion.div
      className={cn(
        "mb-4 max-w-[80%] smooth-transition",
        isBot ? "self-start" : "self-end"
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={cn(
          "rounded-2xl p-4",
          isBot
            ? "glass-morphism"
            : "bg-accent text-white"
        )}
      >
        {message.sanskrit && (
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium sanskrit-text">
              {message.sanskrit}
            </p>
            <button 
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              onClick={() => onPlayAudio(message.sanskrit)}
              aria-label="Play audio"
            >
              <Play size={16} />
            </button>
          </div>
        )}
        <p className={cn(
          "text-base",
          isBot ? "text-foreground" : "text-white"
        )}>
          {message.content}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
