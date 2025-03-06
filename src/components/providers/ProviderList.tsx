import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiUser, FiArchive } from 'react-icons/fi';
import type { Provider } from '../../types';
import { providersApi } from '../../services/api';

export const ProviderList = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await providersApi.getAll();
      setProviders(response.data);
    };
    fetchProviders();
  }, []);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      `${provider.firstName} ${provider.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      provider.npi.includes(searchTerm);
    
    const matchesFilter = 
      filter === 'all' || 
      provider.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search providers..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="border rounded-lg px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Providers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FiFilter className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProviders.map((provider) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-full">
                  <FiUser className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {provider.firstName} {provider.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">NPI: {provider.npi}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                provider.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {provider.status}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Specialties:</span>{' '}
                {provider.specialties.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Groups:</span>{' '}
                {provider.groups.length}
              </p>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-sm text-primary-600 hover:text-primary-700">
                View Details
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-700">
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};