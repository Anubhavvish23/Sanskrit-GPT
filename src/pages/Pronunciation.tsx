
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Play, Volume2, Mic, Download } from 'lucide-react';
import { getSpeech } from '@/services/SanskritAPI';

interface PronunciationGuide {
  id: number;
  character: string;
  transliteration: string;
  description: string;
  examples: Array<{sanskrit: string, english: string}>;
}

const pronunciationGuides: PronunciationGuide[] = [
  {
    id: 1,
    character: 'अ',
    transliteration: 'a',
    description: 'Short vowel, like "u" in "but"',
    examples: [
      {sanskrit: 'अत्र', english: 'here'},
      {sanskrit: 'न', english: 'not'}
    ]
  },
  {
    id: 2,
    character: 'आ',
    transliteration: 'ā',
    description: 'Long vowel, like "a" in "father"',
    examples: [
      {sanskrit: 'आम्', english: 'yes'},
      {sanskrit: 'आप:', english: 'water'}
    ]
  },
  {
    id: 3,
    character: 'इ',
    transliteration: 'i',
    description: 'Short vowel, like "i" in "pin"',
    examples: [
      {sanskrit: 'इह', english: 'here'},
      {sanskrit: 'किम्', english: 'what'}
    ]
  },
  {
    id: 4,
    character: 'ई',
    transliteration: 'ī',
    description: 'Long vowel, like "ee" in "deep"',
    examples: [
      {sanskrit: 'नदी', english: 'river'},
      {sanskrit: 'जीवनम्', english: 'life'}
    ]
  },
  {
    id: 5,
    character: 'उ',
    transliteration: 'u',
    description: 'Short vowel, like "u" in "push"',
    examples: [
      {sanskrit: 'गुरु', english: 'teacher'},
      {sanskrit: 'सुखम्', english: 'happiness'}
    ]
  },
  {
    id: 6,
    character: 'ऊ',
    transliteration: 'ū',
    description: 'Long vowel, like "oo" in "pool"',
    examples: [
      {sanskrit: 'भू', english: 'earth'},
      {sanskrit: 'पूर्णम्', english: 'complete'}
    ]
  },
  {
    id: 7,
    character: 'क',
    transliteration: 'ka',
    description: 'Unaspirated consonant, like "k" in "skip"',
    examples: [
      {sanskrit: 'कमलम्', english: 'lotus'},
      {sanskrit: 'लोक:', english: 'world'}
    ]
  },
  {
    id: 8,
    character: 'ख',
    transliteration: 'kha',
    description: 'Aspirated consonant, like "kh" with strong "h"',
    examples: [
      {sanskrit: 'खगः', english: 'bird'},
      {sanskrit: 'मुखम्', english: 'face'}
    ]
  },
];

const Pronunciation = () => {
  const [selectedGuide, setSelectedGuide] = useState<PronunciationGuide | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredGuides = searchQuery
    ? pronunciationGuides.filter(
        guide => 
          guide.character.includes(searchQuery) || 
          guide.transliteration.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pronunciationGuides;

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
          <section className="max-w-5xl mx-auto w-full">
            <motion.h1 
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-gradient">Sanskrit</span> Pronunciation Guide
            </motion.h1>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a character..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pr-10 rounded-full border border-border focus:ring-2 focus:ring-accent/40 focus:border-accent focus:outline-none transition-all glass-morphism"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {filteredGuides.map((guide) => (
                <motion.div
                  key={guide.id}
                  className="glass-morphism p-4 rounded-xl cursor-pointer hover:bg-accent/5 transition-colors"
                  onClick={() => setSelectedGuide(guide)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + guide.id * 0.05, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl sanskrit-text mb-2">{guide.character}</p>
                      <p className="text-sm text-muted-foreground">{guide.transliteration}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(guide.character);
                      }}
                      className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                      aria-label="Play pronunciation"
                    >
                      <Play size={18} className="text-accent" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedGuide && (
              <motion.div 
                className="glass-morphism p-6 rounded-xl mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-4xl sanskrit-text">{selectedGuide.character}</h2>
                    <p className="text-lg text-muted-foreground">{selectedGuide.transliteration}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => playAudio(selectedGuide.character)}
                      className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                      aria-label="Play pronunciation"
                    >
                      <Volume2 size={20} className="text-accent" />
                    </button>
                    <button
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      aria-label="Record pronunciation"
                    >
                      <Mic size={20} />
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Pronunciation</h3>
                  <p className="text-foreground">{selectedGuide.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Examples</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedGuide.examples.map((example, index) => (
                      <div 
                        key={index} 
                        className="bg-secondary/30 p-3 rounded-lg flex justify-between items-center"
                      >
                        <div>
                          <p className="text-lg sanskrit-text">{example.sanskrit}</p>
                          <p className="text-sm text-muted-foreground">{example.english}</p>
                        </div>
                        <button
                          onClick={() => playAudio(example.sanskrit)}
                          className="p-1.5 rounded-full hover:bg-accent/10 transition-colors"
                          aria-label="Play example"
                        >
                          <Play size={16} className="text-accent" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hidden audio element for playback */}
                <audio ref={audioRef} className="hidden" />
              </motion.div>
            )}
          </section>
        </motion.main>
      </div>
    </div>
  );
};

export default Pronunciation;
