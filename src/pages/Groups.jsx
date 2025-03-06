import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiUsers, FiMapPin, FiPhone, FiMail, FiPlus } from 'react-icons/fi';

export const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const groups = [
    {
      id: 1,
      name: "Central Medical Group",
      type: "Medical Practice",
      location: "Springfield, IL",
      providers: 15,
      status: "active",
      contact: {
        name: "John Smith",
        phone: "(555) 123-4567",
        email: "john.smith@cmg.com"
      }
    },
    {
      id: 2,
      name: "Riverside Surgery Center",
      type: "Surgery Center",
      location: "Chicago, IL",
      providers: 8,
      status: "active",
      contact: {
        name: "Sarah Johnson",
        phone: "(555) 987-6543",
        email: "sarah.j@riverside.com"
      }
    },
    // Add more groups as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Groups
        </h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <FiPlus className="mr-2" />
          Add Group
        </motion.button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y dark:divide-gray-700">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {group.type}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  group.status === 'active'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                }`}>
                  {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiMapPin className="mr-2" />
                  {group.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiUsers className="mr-2" />
                  {group.providers} Providers
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiPhone className="mr-2" />
                  {group.contact.phone}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};