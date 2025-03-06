// Update padding in Dashboard.jsx since it's now handled by Layout
export const Dashboard = () => {
  const [quote] = useState(houseQuotes[Math.floor(Math.random() * houseQuotes.length)]);

  return (
    <div className="space-y-6">
      {/* Quote Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center"
      >
        <FiMessageSquare className="text-primary-500 mr-3 flex-shrink-0 h-5 w-5" />
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 italic">
          "{quote}" - Dr. House
        </p>
      </motion.div>

      {/* Rest of the dashboard content */}
      {/* ... */}
    </div>
  );
};