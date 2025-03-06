import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiMessageSquare,
  FiFileText,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiBriefcase,
  FiDownload,
  FiUpload,
  FiLink
} from 'react-icons/fi';

const CredentialItem = ({ credential }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <FiCheckCircle className="text-green-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiAlertCircle className="text-red-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon(credential.status)}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              {credential.type}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {credential.number || 'No. ' + Math.random().toString(36).substr(2, 8)}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(credential.status)}`}>
          {credential.status.charAt(0).toUpperCase() + credential.status.slice(1)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <FiCalendar className="h-4 w-4" />
          <span>Expires: {new Date(credential.expiration).toLocaleDateString()}</span>
        </div>
        {credential.state && (
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <FiMapPin className="h-4 w-4" />
            <span>State: {credential.state}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const DocumentItem = ({ document }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
  >
    <div className="flex items-center space-x-3">
      <FiFileText className="text-gray-400 dark:text-gray-500" />
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">{document.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
        </p>
      </div>
    </div>
    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
      <FiDownload className="text-gray-500 dark:text-gray-400" />
    </button>
  </motion.div>
);

export const ProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('credentials');
  const [sendingReport, setSendingReport] = useState(false);

  const provider = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop',
    specialty: 'Cardiology',
    npi: '1234567890',
    email: 'sarah.johnson@example.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Medical Center Blvd',
      city: 'Springfield',
      state: 'IL',
      zip: '62701'
    },
    status: 'active',
    joinDate: '2023-01-15',
    credentials: [
      {
        id: 1,
        type: 'Medical License',
        status: 'active',
        expiration: '2024-12-31',
        state: 'IL',
        number: 'ML123456'
      },
      {
        id: 2,
        type: 'Board Certification',
        status: 'pending',
        expiration: '2024-06-30',
        specialty: 'Cardiology',
        number: 'BC789012'
      },
      {
        id: 3,
        type: 'DEA Registration',
        status: 'active',
        expiration: '2025-03-15',
        number: 'XY1234567'
      }
    ],
    groups: ['Central Medical Group', 'Springfield Hospital'],
    documents: [
      {
        id: 1,
        name: 'Medical School Diploma',
        type: 'Education',
        uploadDate: '2023-01-15'
      },
      {
        id: 2,
        name: 'Residency Certificate',
        type: 'Training',
        uploadDate: '2023-01-15'
      },
      {
        id: 3,
        name: 'Current CV',
        type: 'Documentation',
        uploadDate: '2024-01-10'
      }
    ]
  };

  const handleSendReport = async () => {
    setSendingReport(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSendingReport(false);
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${provider.email}`;
  };

  const handleSendText = () => {
    // Implement SMS functionality
    console.log('Sending text to:', provider.phone);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/providers')}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <FiArrowLeft className="mr-2" />
          Back to Providers
        </button>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendEmail}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FiMail className="mr-2" />
            Send Email
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendText}
            className="flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700"
          >
            <FiMessageSquare className="mr-2" />
            Send Text
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendReport}
            disabled={sendingReport}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            <FiFileText className="mr-2" />
            {sendingReport ? 'Sending...' : 'Send Report'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
            <div className="text-center">
              <img
                src={provider.photo}
                alt={`${provider.firstName} ${provider.lastName}`}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {provider.firstName} {provider.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">{provider.specialty}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                provider.status === 'active'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiMail className="flex-shrink-0" />
                <span className="text-sm">{provider.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiPhone className="flex-shrink-0" />
                <span className="text-sm">{provider.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiMapPin className="flex-shrink-0" />
                <span className="text-sm">
                  {provider.address.street}, {provider.address.city}, {provider.address.state} {provider.address.zip}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiBriefcase className="flex-shrink-0" />
                <span className="text-sm">NPI: {provider.npi}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <FiCalendar className="flex-shrink-0" />
                <span className="text-sm">
                  Joined: {new Date(provider.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Associated Groups
              </h3>
              <div className="space-y-2">
                {provider.groups.map((group, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300"
                  >
                    <FiBriefcase className="flex-shrink-0" />
                    <span>{group}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="border-b dark:border-gray-700">
              <div className="flex space-x-4 p-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'credentials'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('credentials')}
                >
                  Credentials
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'documents'
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('documents')}
                >
                  Documents
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'credentials' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Active Credentials
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <FiUpload className="mr-2" />
                      Add Credential
                    </motion.button>
                  </div>
                  {provider.credentials.map((credential) => (
                    <CredentialItem key={credential.id} credential={credential} />
                  ))}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Provider Documents
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      <FiUpload className="mr-2" />
                      Upload Document
                    </motion.button>
                  </div>
                  {provider.documents.map((document) => (
                    <DocumentItem key={document.id} document={document} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};