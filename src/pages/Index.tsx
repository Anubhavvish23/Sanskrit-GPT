
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import CategoriesSection from '@/components/CategoriesSection';
import { useSanskritChat } from '@/hooks/useSanskritChat';

const Index = () => {
  const { messages, isLoading, sendMessage, playAudio, sendCategoryQuery } = useSanskritChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="px-4 container max-w-7xl mx-auto flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col">
          <CategoriesSection onSelectCategory={sendCategoryQuery} />
          
          <motion.div 
            className="relative flex-1 flex flex-col mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto flex flex-col pb-4 px-4 gap-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  onPlayAudio={playAudio} 
                />
              ))}
              
              {isLoading && (
                <div className="self-start glass-morphism rounded-2xl p-4 animate-pulse">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200" />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default Index;
