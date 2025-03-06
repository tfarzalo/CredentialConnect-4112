import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiFolder, FiBriefcase, FiSettings, FiPieChart } from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/' },
  { icon: FiUsers, label: 'Providers', path: '/providers' },
  { icon: FiBriefcase, label: 'Groups', path: '/groups' },
  { icon: FiFolder, label: 'Documents', path: '/documents' },
  { icon: FiPieChart, label: 'Reports', path: '/reports' },
  { icon: FiSettings, label: 'Settings', path: '/settings' }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
      <nav className="flex-1 mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-200'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mr-4 h-6 w-6"
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-200'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </motion.div>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Copyright Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Copyright 2025 Sullivan Management & Consulting Group | Credible
        </p>
      </div>
    </aside>
  );
};