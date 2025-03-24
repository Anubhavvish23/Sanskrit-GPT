
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileHeaderBar = () => {
  return (
    <motion.div
      className="w-full p-3 flex items-center justify-center bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
          <span className="text-accent text-sm font-semibold">संस्</span>
        </div>
        <h1 className="text-lg font-medium">
          <span className="text-gradient">Sanskrit</span>
          <span className="text-foreground"> Speak</span>
        </h1>
      </Link>
    </motion.div>
  );
};

export default MobileHeaderBar;
