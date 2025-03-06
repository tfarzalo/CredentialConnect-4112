import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiBell, FiClock, FiCheckCircle } from 'react-icons/fi';

export const NotificationPanel = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "Credential Review Required",
      message: "Dr. Sarah Johnson's medical license needs review",
      type: "review",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Document Expiring Soon",
      message: "DEA Certificate expires in 30 days",
      type: "warning",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Verification Complete",
      message: "Dr. Michael Smith's board certification verified",
      type: "success",
      time: "1 day ago"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-lg z-50"
          >
            <div className="p-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiX className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {notification.type === 'review' && (
                          <FiClock className="h-5 w-5 text-yellow-500" />
                        )}
                        {notification.type === 'warning' && (
                          <FiBell className="h-5 w-5 text-red-500" />
                        )}
                        {notification.type === 'success' && (
                          <FiCheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};