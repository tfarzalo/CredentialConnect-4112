import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        <motion.main
          className="flex-1 overflow-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;