
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import { ArrowLeft, ArrowRight, RotateCcw, Play } from 'lucide-react';
import { getSpeech } from '@/services/SanskritAPI';

type Flashcard = {
  id: number;
  sanskrit: string;
  english: string;
  category: string;
};

const Flashcards = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'greetings', name: 'Greetings' },
    { id: 'phrases', name: 'Common Phrases' },
    { id: 'numbers', name: 'Numbers' },
    { id: 'days', name: 'Days' },
    { id: 'colors', name: 'Colors' },
    { id: 'family', name: 'Family' },
  ];

  // Generate flashcards based on the data from SanskritAPI.ts
  useEffect(() => {
    // Simulating loading data
    setTimeout(() => {
      const flashcardsData: Flashcard[] = [
        // Greetings
        { id: 1, sanskrit: 'नमस्ते', english: 'Hello / Greetings', category: 'greetings' },
        { id: 2, sanskrit: 'सुप्रभातम्', english: 'Good morning', category: 'greetings' },
        { id: 3, sanskrit: 'शुभसन्ध्या', english: 'Good evening', category: 'greetings' },
        { id: 4, sanskrit: 'शुभरात्रिः', english: 'Good night', category: 'greetings' },
        { id: 5, sanskrit: 'धन्यवादः', english: 'Thank you', category: 'greetings' },
        // Phrases
        { id: 6, sanskrit: 'कृपया पुनः वदतु', english: 'Please say again', category: 'phrases' },
        { id: 7, sanskrit: 'सर्वं कुशलम्?', english: 'Is everything fine?', category: 'phrases' },
        { id: 8, sanskrit: 'समझितम्', english: 'Understood', category: 'phrases' },
        // Numbers
        { id: 9, sanskrit: 'एकम्', english: 'One', category: 'numbers' },
        { id: 10, sanskrit: 'द्वे', english: 'Two', category: 'numbers' },
        { id: 11, sanskrit: 'त्रीणि', english: 'Three', category: 'numbers' },
        // Days
        { id: 12, sanskrit: 'रविवासरः', english: 'Sunday', category: 'days' },
        { id: 13, sanskrit: 'सोमवासरः', english: 'Monday', category: 'days' },
        // Colors
        { id: 14, sanskrit: 'नीलः', english: 'Blue', category: 'colors' },
        { id: 15, sanskrit: 'रक्तः', english: 'Red', category: 'colors' },
        // Family
        { id: 16, sanskrit: 'माता', english: 'Mother', category: 'family' },
        { id: 17, sanskrit: 'पिता', english: 'Father', category: 'family' },
      ];
      
      setCards(flashcardsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter cards based on selected category
  const filteredCards = selectedCategory === 'all' 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);

  const currentCard = filteredCards[currentCardIndex] || null;

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
    }, 200);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 200);
  };

  const resetCards = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex(0);
    }, 200);
  };

  const playAudio = () => {
    if (currentCard) {
      getSpeech(currentCard.sanskrit);
    }
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
              <span className="text-gradient">Sanskrit</span> Flashcards
            </motion.h1>
            
            <div className="mb-8">
              <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-accent text-white'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentCardIndex(0);
                      setFlipped(false);
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center p-10">
                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
              </div>
            ) : filteredCards.length > 0 ? (
              <>
                <div className="relative h-64 sm:h-80 mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentCardIndex}-${flipped}`}
                      className={`absolute inset-0 glass-morphism rounded-xl p-6 flex items-center justify-center cursor-pointer ${
                        flipped ? 'bg-accent/10' : ''
                      }`}
                      onClick={() => setFlipped(!flipped)}
                      initial={{ rotateY: flipped ? -90 : 0, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: flipped ? 0 : 90, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      <div className="text-center">
                        {flipped ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-lg text-muted-foreground mb-2">English</h3>
                            <p className="text-2xl font-medium">{currentCard?.english}</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h3 className="text-lg text-muted-foreground mb-2">Sanskrit</h3>
                            <p className="text-3xl font-medium sanskrit-text mb-4">{currentCard?.sanskrit}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playAudio();
                              }}
                              className="inline-flex items-center justify-center p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                              aria-label="Play pronunciation"
                            >
                              <Play size={18} className="text-accent" />
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Card {currentCardIndex + 1} of {filteredCards.length}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={prevCard}
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      aria-label="Previous card"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    
                    <button
                      onClick={() => setFlipped(!flipped)}
                      className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
                    >
                      {flipped ? 'Show Sanskrit' : 'Show English'}
                    </button>
                    
                    <button
                      onClick={nextCard}
                      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                      aria-label="Next card"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  
                  <button
                    onClick={resetCards}
                    className="p-2 rounded-full hover:bg-secondary/80 transition-colors"
                    aria-label="Reset cards"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center p-10 glass-morphism rounded-xl">
                <p className="text-lg text-muted-foreground">No flashcards available for this category.</p>
              </div>
            )}
          </section>
        </motion.main>
      </div>
    </div>
  );
};

export default Flashcards;
