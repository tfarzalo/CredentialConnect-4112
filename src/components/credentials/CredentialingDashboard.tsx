import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import type { Credential } from '../../types';
import { credentialsApi } from '../../services/api';

export const CredentialingDashboard = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    const fetchCredentials = async () => {
      const response = await credentialsApi.getAll();
      setCredentials(response.data);
    };
    fetchCredentials();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      not_started: 'gray',
      in_progress: 'blue',
      under_review: 'yellow',
      issues_to_address: 'red',
      denied: 'red',
      panel_closed: 'gray',
      approved: 'green',
      commercial_only: 'purple',
    };
    return colors[status] || 'gray';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <FiClock className="text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Pending Review</h3>
              <p className="text-2xl font-bold">
                {credentials.filter(c => c.status === 'under_review').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-full">
              <FiAlertCircle className="text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Issues to Address</h3>
              <p className="text-2xl font-bold">
                {credentials.filter(c => c.status === 'issues_to_address').length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <FiCheckCircle className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Recently Approved</h3>
              <p className="text-2xl font-bold">
                {credentials.filter(c => c.status === 'approved').length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Active Credentials</h2>
        </div>
        <div className="divide-y">
          {credentials.map((credential) => (
            <motion.div
              key={credential.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{credential.providerId}</h3>
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(credential.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm bg-${getStatusColor(credential.status)}-100 text-${getStatusColor(credential.status)}-800`}>
                  {credential.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Payor: {credential.payorId}
                </p>
                <p className="text-sm text-gray-600">
                  Timeline Events: {credential.timeline.length}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};