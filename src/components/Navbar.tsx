
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Gamepad2, MessageSquare, Play } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <MessageSquare size={20} />, label: 'Chat' },
    { path: '/translation', icon: <Book size={20} />, label: 'Translate' },
    { path: '/flashcards', icon: <BookOpen size={20} />, label: 'Flashcards' },
    { path: '/pronunciation', icon: <Play size={20} />, label: 'Pronunciation' },
    { path: '/game', icon: <Gamepad2 size={20} />, label: 'Game' },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border py-2 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="container max-w-md mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center px-4 py-2"
              >
                <div className={`p-2 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-1.5 h-1.5 bg-accent rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
