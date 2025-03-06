import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiBell, FiSettings, FiMoon, FiSun, FiMenu, FiSearch, FiX, FiHome, FiBriefcase, FiFolder } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { NotificationPanel } from '../notifications/NotificationPanel';

export const Navbar = ({ onMenuClick }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiUser, label: 'Providers', path: '/providers' },
    { icon: FiBriefcase, label: 'Credentials', path: '/credentials' },
    { icon: FiFolder, label: 'Documents', path: '/documents' },
    { icon: FiUser, label: 'Groups', path: '/groups' },
    { icon: FiSettings, label: 'Settings', path: '/settings' }
  ];

  return (
    <>
      <nav className="w-full bg-white dark:bg-gray-800 shadow-sm fixed top-0 z-40">
        <div className="max-w-full mx-auto">
          <div className="flex h-16 px-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg md:hidden"
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
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-3xl mx-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsNotificationPanelOpen(true)}
              >
                <FiBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50"
            >
              <div className="p-4 space-y-4">
                <div className="relative mb-4">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-200'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />
    </>
  );
};

export default Navbar;