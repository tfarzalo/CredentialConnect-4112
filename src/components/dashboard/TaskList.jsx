import { motion } from 'framer-motion';
import { FiFile, FiClock, FiAlertCircle } from 'react-icons/fi';

const TaskItem = ({ task, onClick }) => {
  const categoryColors = {
    Documentation: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    New: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Review: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    Urgent: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick({
        ...task,
        categoryColor: categoryColors[task.category]
      })}
      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        {task.type === 'document' && <FiFile className="text-gray-400 dark:text-gray-500" />}
        {task.type === 'review' && <FiClock className="text-yellow-400 dark:text-yellow-500" />}
        {task.type === 'urgent' && <FiAlertCircle className="text-red-400 dark:text-red-500" />}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[task.category]}`}>
          {task.category}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {task.dueDate}
        </span>
      </div>
    </motion.div>
  );
};

export const TaskList = ({ onTaskClick }) => {
  const tasks = [
    {
      id: 1,
      title: "Review Dr. Smith's Credentials",
      description: "Complete credential verification",
      category: "Review",
      type: "review",
      dueDate: "Today"
    },
    {
      id: 2,
      title: "Missing Documentation",
      description: "Request updated license for Dr. Johnson",
      category: "Documentation",
      type: "document",
      dueDate: "Tomorrow"
    },
    {
      id: 3,
      title: "New Provider Application",
      description: "Process application for Dr. Williams",
      category: "New",
      type: "document",
      dueDate: "2 days"
    },
    {
      id: 4,
      title: "Expiring Credentials",
      description: "Follow up on expiring credentials",
      category: "Urgent",
      type: "urgent",
      dueDate: "Today"
    }
  ];

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
};