import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiClock, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import { TaskList } from '../components/dashboard/TaskList';
import { Calendar } from '../components/dashboard/Calendar';
import { LatestProviders } from '../components/dashboard/LatestProviders';
import { LatestGroups } from '../components/dashboard/LatestGroups';
import { ComparisonBlock } from '../components/dashboard/ComparisonBlock';
import { houseQuotes } from '../data/houseQuotes';

export const Dashboard = () => {
  const [quote] = useState(houseQuotes[Math.floor(Math.random() * houseQuotes.length)]);
  const [selectedPreview, setSelectedPreview] = useState(null);
  
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

  const Preview = ({ data, onClose }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {data.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          {data.content}
        </div>
      </div>
    </motion.div>
  );

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="flex flex-col md:flex-row gap-4">
        {/* Workload Section */}
        <div className="w-full md:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[400px] max-h-[600px] overflow-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Workload
              </h3>
            </div>
            <div className="p-4">
              <TaskList onTaskClick={(task) => setSelectedPreview({
                title: task.title,
                content: (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
                    <div className="mt-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${task.categoryColor}`}>
                        {task.category}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                )
              })} />
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-[400px] max-h-[600px] overflow-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Events
              </h3>
            </div>
            <div className="p-4">
              <Calendar onEventClick={(event) => setSelectedPreview({
                title: event.title,
                content: (
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.type === 'meeting' ? 'Meeting' : 'Deadline'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {event.date} at {event.time}
                    </p>
                  </div>
                )
              })} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <LatestProviders onProviderClick={(provider) => setSelectedPreview({
            title: `${provider.name}`,
            content: (
              <div>
                <p className="text-gray-600 dark:text-gray-300">{provider.specialty}</p>
                <p className="mt-2 text-sm text-gray-500">{provider.status}</p>
              </div>
            )
          })} />
        </div>
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <LatestGroups onGroupClick={(group) => setSelectedPreview({
            title: group.name,
            content: (
              <div>
                <p className="text-gray-600 dark:text-gray-300">{group.type}</p>
                <p className="mt-2 text-sm text-gray-500">{group.providers} providers</p>
              </div>
            )
          })} />
        </div>
        <div className="min-h-[300px] max-h-[400px] overflow-auto">
          <ComparisonBlock />
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <Preview
            data={selectedPreview}
            onClose={() => setSelectedPreview(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};