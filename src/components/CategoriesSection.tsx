
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'greetings', name: 'नमस्काराः', english: 'Greetings' },
  { id: 'phrases', name: 'वाक्यानि', english: 'Phrases' },
  { id: 'numbers', name: 'संख्याः', english: 'Numbers' },
  { id: 'days', name: 'दिनानि', english: 'Days' },
  { id: 'objects', name: 'वस्तूनि', english: 'Objects' },
  { id: 'colors', name: 'वर्णाः', english: 'Colors' },
  { id: 'family', name: 'कुलपरिचयः', english: 'Family' },
  { id: 'directions', name: 'दिशाः', english: 'Directions' },
];

const features = [
  { id: 'translation', icon: 'T', name: 'Translation', path: '/translation' },
  { id: 'flashcards', icon: 'F', name: 'Flashcards', path: '/flashcards' },
  { id: 'pronunciation', icon: 'P', name: 'Pronunciation', path: '/pronunciation' },
  { id: 'game', icon: 'G', name: 'Game', path: '/game' },
];

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
}

const CategoriesSection = ({ onSelectCategory }: CategoriesSectionProps) => {
  return (
    <motion.section 
      className="mb-8 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-medium">
          <span className="text-gradient">Explore</span> Categories
        </h2>
        <Link to="/flashcards" className="text-sm text-accent hover:underline">View All</Link>
      </div>
      
      <div className="flex overflow-x-auto gap-3 pb-4 px-4 hide-scrollbar">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            className="glass-container flex-shrink-0 rounded-xl animated-border"
            onClick={() => onSelectCategory(category.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 + index * 0.1,
              ease: "easeOut" 
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center gap-1">
              <p className="text-lg font-medium sanskrit-text">{category.name}</p>
              <p className="text-sm text-muted-foreground">{category.english}</p>
            </div>
          </motion.button>
        ))}
      </div>
      
      <div className="mt-6 px-4">
        <h2 className="text-xl font-medium mb-4">
          <span className="text-gradient">Learning</span> Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                ease: "easeOut" 
              }}
            >
              <Link 
                to={feature.path}
                className="glass-container flex items-center gap-4 h-full rounded-xl group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-accent text-xl font-semibold">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-medium">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">Learn {feature.name.toLowerCase()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CategoriesSection;
