import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiUsers, FiBriefcase, FiFolder, FiSettings } from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/' },
  { icon: FiUsers, label: 'Providers', path: '/providers' },
  { icon: FiBriefcase, label: 'Credentials', path: '/credentials' },
  { icon: FiFolder, label: 'Documents', path: '/documents' },
  { icon: FiUsers, label: 'Groups', path: '/groups' },
  { icon: FiSettings, label: 'Settings', path: '/settings' }
];

export const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <aside 
      className={`${
        isOpen ? 'md:w-64' : 'md:w-20'
      } hidden md:flex md:flex-col bg-white dark:bg-gray-800 shadow-sm min-h-screen transition-all duration-300`}
    >
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
                <motion.div whileHover={{ scale: 1.1 }} className="mr-4 h-6 w-6">
                  <item.icon
                    className={`h-6 w-6 ${
                      isActive ? 'text-primary-600 dark:text-primary-200' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </motion.div>
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 Credible
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;