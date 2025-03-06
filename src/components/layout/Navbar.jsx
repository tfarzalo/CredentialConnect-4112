import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBell, FiSettings, FiMoon, FiSun, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { NotificationPanel } from '../notifications/NotificationPanel';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNewNotifications] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'task',
      title: 'New Credential Request',
      message: 'Dr. Sarah Johnson submitted a new credential request',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Expiring License',
      message: "Dr. Michael Smith's medical license expires in 30 days",
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Approval Completed',
      message: 'Credentialing approved for Valley Health Clinic',
      time: '2 hours ago'
    }
  ];

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-800 shadow-sm fixed top-0 z-50">
        <div className="max-w-full mx-auto">
          <div className="flex h-16 px-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMenu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-['Poppins'] font-semibold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  Credible
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search providers, credentials, documents..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsNotificationPanelOpen(true)}
                >
                  <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  {hasNewNotifications && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </button>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:block">
                <FiSettings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <FiSun className="h-5 w-5 text-gray-300" />
                ) : (
                  <FiMoon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiUser className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700"
            >
              <div className="p-4">
                <div className="relative mb-4">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Link
                    to="/providers"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Providers
                  </Link>
                  <Link
                    to="/credentials"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Credentials
                  </Link>
                  <Link
                    to="/documents"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Documents
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
      />
    </>
  );
};