
import { useState, useCallback, useEffect } from 'react';
import { getSanskritResponse, getSpeech } from '@/services/SanskritAPI';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  content: string;
  sanskrit?: string;
  isBot: boolean;
}

export const useSanskritChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add initial welcome message
    setMessages([
      {
        id: uuidv4(),
        content: "Welcome to Sanskrit Speak! I can help you learn Sanskrit. Ask me about greetings, numbers, days, colors, and more.",
        sanskrit: "संस्कृत वाणी में आपका स्वागतम्! मैं आपको संस्कृत सिखने में मदद कर सकता हूँ। मुझसे अभिवादन, संख्याएँ, दिन, रंग, और अधिक के बारे में पूछें।",
        isBot: true
      }
    ]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessageId = uuidv4();
    setMessages(prev => [
      ...prev, 
      { id: userMessageId, content, isBot: false }
    ]);
    
    setIsLoading(true);
    
    try {
      // Get response from Sanskrit API
      const response = await getSanskritResponse(content);
      
      // Add bot response
      const botMessageId = uuidv4();
      setMessages(prev => [
        ...prev,
        { 
          id: botMessageId, 
          content: response.english, 
          sanskrit: response.sanskrit, 
          isBot: true 
        }
      ]);
      
      // Auto-play Sanskrit audio if available
      if (response.sanskrit) {
        setTimeout(() => {
          getSpeech(response.sanskrit);
        }, 500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const playAudio = useCallback((text: string) => {
    getSpeech(text);
  }, []);

  const sendCategoryQuery = useCallback((category: string) => {
    const queries: Record<string, string> = {
      greetings: "Teach me some Sanskrit greetings",
      phrases: "What are some common phrases in Sanskrit?",
      numbers: "How do I count in Sanskrit?",
      days: "Tell me the days of the week in Sanskrit",
      objects: "What are common objects called in Sanskrit?",
      colors: "What are the colors in Sanskrit?",
      family: "How do I say family relations in Sanskrit?",
      directions: "Teach me directions in Sanskrit",
    };
    
    sendMessage(queries[category] || `Teach me about ${category} in Sanskrit`);
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    playAudio,
    sendCategoryQuery
  };
};
