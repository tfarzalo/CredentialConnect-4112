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
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const groups = [
    { id: '1', name: 'Surgery Center A' },
    { id: '2', name: 'Medical Group B' },
    { id: '3', name: 'Clinic C' }
  ];

  const statuses = [
    { id: 'active', name: 'Active' },
    { id: 'pending', name: 'Pending' },
    { id: 'review', name: 'Under Review' },
    { id: 'expired', name: 'Expired' }
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
                <img
                  src={darkMode ? '/credible-logo-dark.svg' : '/credible-logo-light.svg'}
                  alt="Credible"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-4">
              <div className="flex w-full gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search providers, credentials, documents..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                >
                  <option value="">All Groups</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <select
                  className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
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
        notifications={[]}
      />
    </>
  );
};