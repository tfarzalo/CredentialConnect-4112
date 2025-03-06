import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFile, FiClock, FiAlertCircle, FiX, FiUser, FiCalendar } from 'react-icons/fi';

const TaskModal = ({ task, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {task.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm ${
              task.category === 'Urgent'
                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                : task.category === 'Review'
                ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
            }`}>
              {task.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Due: {task.dueDate}
            </span>
          </div>

          {task.assignedTo && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiUser className="h-4 w-4" />
              <span>Assigned to: {task.assignedTo}</span>
            </div>
          )}

          {task.relatedProvider && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiUser className="h-4 w-4" />
              <span>Related Provider: {task.relatedProvider}</span>
            </div>
          )}

          {task.deadline && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <FiCalendar className="h-4 w-4" />
              <span>Deadline: {task.deadline}</span>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Mark Complete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TaskItem = ({ task, onClick }) => {
  const categoryColors = {
    Documentation: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    New: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Review: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    Urgent: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        {task.type === 'document' && <FiFile className="text-gray-400 dark:text-gray-500" />}
        {task.type === 'review' && <FiClock className="text-yellow-400 dark:text-yellow-500" />}
        {task.type === 'urgent' && <FiAlertCircle className="text-red-400 dark:text-red-500" />}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-3 py-1 rounded-full text-xs ${categoryColors[task.category]}`}>
          {task.category}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {task.dueDate}
        </span>
      </div>
    </motion.div>
  );
};

export const TaskList = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = [
    {
      id: 1,
      title: "Review Dr. Smith's Credentials",
      description: "Complete credential verification for new provider including medical license and board certification documents.",
      category: "Review",
      type: "review",
      dueDate: "Today",
      assignedTo: "John Doe",
      relatedProvider: "Dr. Smith",
      deadline: "2024-03-20",
      priority: "High"
    },
    {
      id: 2,
      title: "Missing Documentation",
      description: "Request updated license for Dr. Johnson. Current license expires in 30 days.",
      category: "Documentation",
      type: "document",
      dueDate: "Tomorrow",
      assignedTo: "Jane Smith",
      relatedProvider: "Dr. Johnson",
      deadline: "2024-03-21",
      priority: "Medium"
    },
    {
      id: 3,
      title: "New Provider Application",
      description: "Process application for Dr. Williams including background check and reference verification.",
      category: "New",
      type: "document",
      dueDate: "2 days",
      assignedTo: "Mike Brown",
      relatedProvider: "Dr. Williams",
      deadline: "2024-03-22",
      priority: "Low"
    },
    {
      id: 4,
      title: "Expiring Credentials",
      description: "Follow up on expiring credentials for 3 providers. Urgent attention required.",
      category: "Urgent",
      type: "urgent",
      dueDate: "Today",
      assignedTo: "Sarah Wilson",
      relatedProvider: "Multiple",
      deadline: "2024-03-20",
      priority: "Critical"
    }
  ];

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onClick={() => setSelectedTask(task)}
        />
      ))}
      
      <AnimatePresence>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};