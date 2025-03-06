import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export const ComparisonBlock = () => {
  const currentMonth = {
    completed: 45,
    inProgress: 15
  };

  const lastMonth = {
    completed: 38,
    inProgress: 12
  };

  const percentageChange = Math.round(
    ((currentMonth.completed - lastMonth.completed) / lastMonth.completed) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Monthly Comparison
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Month</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {lastMonth.completed}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">completed</p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {currentMonth.completed}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">completed</p>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {percentageChange > 0 ? (
          <FiTrendingUp className="text-green-500 mr-2" />
        ) : (
          <FiTrendingDown className="text-red-500 mr-2" />
        )}
        <span className={`font-medium ${
          percentageChange > 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {Math.abs(percentageChange)}% {percentageChange > 0 ? 'increase' : 'decrease'}
        </span>
      </div>
    </motion.div>
  );
};