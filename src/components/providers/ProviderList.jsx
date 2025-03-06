import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiUser, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export const ProviderList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const providers = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      specialty: 'Cardiology',
      npi: '1234567890',
      status: 'active',
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567',
      location: 'Springfield, IL',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Smith',
      specialty: 'Neurology',
      npi: '0987654321',
      status: 'pending',
      email: 'michael.smith@example.com',
      phone: '(555) 987-6543',
      location: 'Chicago, IL',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: '3',
      firstName: 'Emily',
      lastName: 'Brown',
      specialty: 'Pediatrics',
      npi: '5678901234',
      status: 'active',
      email: 'emily.brown@example.com',
      phone: '(555) 456-7890',
      location: 'Aurora, IL',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: '4',
      firstName: 'David',
      lastName: 'Wilson',
      specialty: 'Orthopedics',
      npi: '4321098765',
      status: 'active',
      email: 'david.wilson@example.com',
      phone: '(555) 789-0123',
      location: 'Rockford, IL',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: '5',
      firstName: 'Lisa',
      lastName: 'Anderson',
      specialty: 'Dermatology',
      npi: '9876543210',
      status: 'pending',
      email: 'lisa.anderson@example.com',
      phone: '(555) 234-5678',
      location: 'Peoria, IL',
      photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=200&h=200&auto=format&fit=crop'
    }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      `${provider.firstName} ${provider.lastName} ${provider.specialty}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      provider.npi.includes(searchTerm);
    const matchesFilter = filter === 'all' || provider.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search providers by name, specialty, or NPI..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Providers</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <FiFilter className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filteredProviders.map((provider) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate(`/providers/${provider.id}`)}
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={provider.photo}
                  alt={`${provider.firstName} ${provider.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {provider.firstName} {provider.lastName}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        provider.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{provider.specialty}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">NPI: {provider.npi}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiMapPin className="mr-2" />
                  {provider.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiPhone className="mr-2" />
                  {provider.phone}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiMail className="mr-2" />
                  {provider.email}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <FiUser className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No providers found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};