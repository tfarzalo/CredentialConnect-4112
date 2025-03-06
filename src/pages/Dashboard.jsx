import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { TaskList } from '../components/dashboard/TaskList';
import { Calendar } from '../components/dashboard/Calendar';
import { LatestProviders } from '../components/dashboard/LatestProviders';
import { LatestGroups } from '../components/dashboard/LatestGroups';
import { ComparisonBlock } from '../components/dashboard/ComparisonBlock';
import { houseQuotes } from '../data/houseQuotes';

export const Dashboard = () => {
  const [quote] = useState(houseQuotes[Math.floor(Math.random() * houseQuotes.length)]);
  
  const stats = [
    {
      title: "Pending Review",
      count: 12,
      icon: FiClock,
      color: "yellow"
    },
    {
      title: "Issues to Address",
      count: 5,
      icon: FiAlertCircle,
      color: "red"
    },
    {
      title: "Recently Approved",
      count: 24,
      icon: FiCheckCircle,
      color: "green"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Quote Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3"
      >
        <div className="flex items-center">
          <FiMessageSquare className="text-primary-500 mr-3 flex-shrink-0 h-5 w-5" />
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
            "{quote}" - Dr. House
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 min-h-[100px]"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-full`}>
                <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.count}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="flex gap-4">
        {/* Workload Section - 2/3 width */}
        <div className="flex-grow-0 flex-shrink-0 w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[400px] max-h-[600px] overflow-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Workload
              </h3>
            </div>
            <div className="p-4">
              <TaskList />
            </div>
          </div>
        </div>

        {/* Calendar Section - 1/3 width */}
        <div className="flex-grow-0 flex-shrink-0 w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[400px] max-h-[600px] overflow-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Events
              </h3>
            </div>
            <div className="p-4">
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <LatestProviders />
        </div>
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <LatestGroups />
        </div>
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <ComparisonBlock />
        </div>
      </div>
    </div>
  );
};