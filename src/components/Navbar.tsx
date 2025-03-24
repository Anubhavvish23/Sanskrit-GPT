
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Gamepad2, MessageSquare, Play, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { path: '/', icon: <MessageSquare size={20} />, label: 'Chat' },
    { path: '/translation', icon: <Book size={20} />, label: 'Translate' },
    { path: '/flashcards', icon: <BookOpen size={20} />, label: 'Flashcards' },
    { path: '/pronunciation', icon: <Play size={20} />, label: 'Pronunciation' },
    { path: '/game', icon: <Gamepad2 size={20} />, label: 'Game' },
  ];

  return (
    <>
      {/* Mobile Menu Button (only shows on smaller screens) */}
      {isMobile && (
        <motion.div 
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-md shadow-md">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] pt-12">
              <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold mb-2">Sanskrit Speak</div>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive ? 'bg-accent/10 text-accent' : 'hover:bg-accent/5'
                      }`}
                    >
                      <div className={isActive ? 'text-accent' : 'text-muted-foreground'}>
                        {item.icon}
                      </div>
                      <span className={isActive ? 'font-medium' : ''}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}

      {/* Bottom Navigation Bar */}
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
    </>
  );
};

export default Navbar;
