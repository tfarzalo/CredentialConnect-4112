// Remove the QuickSearch component from the Dashboard since it's now in the navbar
import { motion } from 'framer-motion';
import { Calendar } from '../components/dashboard/Calendar';
import { TaskList } from '../components/dashboard/TaskList';
import { LatestProviders } from '../components/dashboard/LatestProviders';
import { LatestGroups } from '../components/dashboard/LatestGroups';
import { ComparisonBlock } from '../components/dashboard/ComparisonBlock';
import { FiMessageSquare } from 'react-icons/fi';
import { useState } from 'react';
import { houseQuotes } from '../data/houseQuotes';

export const Dashboard = () => {
  const [quote] = useState(houseQuotes[Math.floor(Math.random() * houseQuotes.length)]);

  return (
    <div className="space-y-6 pt-8 px-4 md:px-6">
      {/* Quote Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center"
      >
        <FiMessageSquare className="text-primary-500 mr-3 flex-shrink-0 h-5 w-5" />
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic">
          "{quote}" - Dr. House
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* ... rest of the dashboard content ... */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskList />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LatestProviders />
            <LatestGroups />
          </div>
        </div>
        <div className="space-y-6">
          <Calendar />
          <ComparisonBlock />
        </div>
      </div>
    </div>
  );
};