
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Chat' },
    { path: '/translation', label: 'Translate' },
    { path: '/flashcards', label: 'Flashcards' },
    { path: '/pronunciation', label: 'Pronunciation' }
  ];
  
  return (
    <motion.header 
      className="flex justify-between items-center py-6 px-8 glass-morphism mb-8 rounded-xl mx-auto max-w-7xl w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <span className="text-accent text-xl font-semibold">संस्</span>
          </div>
          <h1 className="text-2xl font-semibold">
            <span className="text-gradient">Sanskrit</span>
            <span className="text-foreground"> Speak</span>
          </h1>
        </Link>
      </motion.div>
      
      <motion.nav 
        className="hidden md:flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative ${
                isActive 
                  ? 'text-accent' 
                  : 'text-foreground/70 hover:text-accent smooth-transition'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </motion.header>
  );
};

export default Header;
