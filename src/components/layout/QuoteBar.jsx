import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { houseQuotes } from '../../data/houseQuotes';
import { FiMessageSquare } from 'react-icons/fi';

export const QuoteBar = () => {
  const [quote, setQuote] = useState('');

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * houseQuotes.length);
    return houseQuotes[randomIndex];
  };

  useEffect(() => {
    setQuote(getRandomQuote());
  }, [window.location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={quote}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-gray-50 dark:bg-gray-700 px-4 py-2 flex items-center"
      >
        <FiMessageSquare className="text-primary-500 mr-3 flex-shrink-0" />
        <p className="text-sm text-gray-600 dark:text-gray-300 italic">
          "{quote}" - Dr. House
        </p>
      </motion.div>
    </AnimatePresence>
  );
};