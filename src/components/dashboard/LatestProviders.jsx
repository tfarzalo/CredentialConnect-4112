import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const LatestProviders = () => {
  const navigate = useNavigate();
  
  const providers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Dr. Michael Smith',
      specialty: 'Neurology',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Dr. Emily Brown',
      specialty: 'Pediatrics',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Dr. David Wilson',
      specialty: 'Orthopedics',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      status: 'Pending'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        New Providers
      </h3>
      <div className="space-y-3">
        {providers.map(provider => (
          <motion.div
            key={provider.id}
            whileHover={{ scale: 1.01 }}
            onClick={() => navigate(`/providers/${provider.id}`)}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
              <FiUser className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{provider.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{provider.specialty}</p>
            </div>
            <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
              provider.status === 'Active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {provider.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};