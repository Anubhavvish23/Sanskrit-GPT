
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { toast } from "sonner";
import { getSpeech } from '@/services/SanskritAPI';
import { Play } from 'lucide-react';

const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState<{sanskrit: string, english: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslation = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to translate');
      return;
    }

    setIsLoading(true);
    try {
      // Use the existing Groq API call
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { 
              role: 'system', 
              content: `You are a Sanskrit language translator. Provide accurate translations from English to Sanskrit using Devanagari script. Format response with Sanskrit first, then English explanation.` 
            },
            { role: 'user', content: `Translate this to Sanskrit: ${inputText}` }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch translation');
      }
      
      const data = await response.json();
      const messageContent = data.choices[0].message.content;
      
      // Extract Sanskrit part
      let sanskritPart = '';
      let englishPart = messageContent;
      
      // Attempt to separate Sanskrit and English parts
      const parts = messageContent.split(/\n\n|\n/);
      
      if (parts.length > 1) {
        // Check if the first part contains Devanagari script
        if (/[\u0900-\u097F]/.test(parts[0])) {
          sanskritPart = parts[0].trim();
          englishPart = parts.slice(1).join('\n').trim();
        }
      }
      
      setTranslatedText({
        sanskrit: sanskritPart,
        english: englishPart
      });
      
    } catch (error) {
      console.error('Translation error:', error);
      toast.error('Could not get translation');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (text: string) => {
    getSpeech(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="px-4 container max-w-7xl mx-auto flex-1 flex flex-col">
        <Header />
        
        <motion.main 
          className="flex-1 flex flex-col gap-8 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <section className="max-w-3xl mx-auto w-full">
            <motion.h1 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-gradient">Sanskrit</span> Translator
            </motion.h1>
            
            <motion.div 
              className="glass-morphism p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="mb-4">
                <label htmlFor="translation-input" className="block text-sm font-medium mb-2">
                  Enter English text to translate
                </label>
                <textarea
                  id="translation-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type here to translate into Sanskrit..."
                  className="w-full p-3 border border-border rounded-lg bg-background/50 min-h-[120px] focus:ring-2 focus:ring-accent/40 focus:border-accent focus:outline-none transition-all"
                />
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  onClick={handleTranslation}
                  disabled={isLoading || !inputText.trim()}
                  className="px-6 py-2 bg-accent text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? 
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block mr-2"></span>
                      Translating...
                    </span> : 
                    'Translate'
                  }
                </motion.button>
              </div>
            </motion.div>
            
            {translatedText && (
              <motion.div 
                className="mt-8 glass-morphism p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">Translation</h3>
                  {translatedText.sanskrit && (
                    <button 
                      onClick={() => playAudio(translatedText.sanskrit)}
                      className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                      aria-label="Play audio"
                    >
                      <Play size={20} className="text-accent" />
                    </button>
                  )}
                </div>
                
                {translatedText.sanskrit && (
                  <p className="text-lg mb-4 font-medium sanskrit-text">
                    {translatedText.sanskrit}
                  </p>
                )}
                
                <div className="pt-3 border-t border-border/50">
                  <h4 className="text-sm text-muted-foreground mb-2">Explanation</h4>
                  <p className="text-foreground whitespace-pre-line">
                    {translatedText.english}
                  </p>
                </div>
              </motion.div>
            )}
          </section>
        </motion.main>
      </div>
    </div>
  );
};

export default Translation;
