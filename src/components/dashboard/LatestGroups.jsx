import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

export const LatestGroups = () => {
  const groups = [
    { id: 1, name: 'Central Medical Group', type: 'Medical Practice', providers: 12 },
    { id: 2, name: 'Riverside Surgery Center', type: 'Surgery Center', providers: 8 },
    { id: 3, name: 'Valley Health Clinic', type: 'Clinic', providers: 15 },
    { id: 4, name: 'Mountain View Hospital', type: 'Hospital', providers: 45 },
    { id: 5, name: 'Downtown Specialists', type: 'Specialty Practice', providers: 6 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        New Groups
      </h3>
      <div className="space-y-3">
        {groups.map(group => (
          <div
            key={group.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <div className="p-2 bg-secondary-100 dark:bg-secondary-900 rounded-full">
              <FiBriefcase className="text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{group.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{group.type}</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {group.providers} providers
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};