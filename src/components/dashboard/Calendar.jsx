// Update the Calendar component styling
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { FiClock, FiCalendar } from 'react-icons/fi';

export const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const events = [
    {
      date: new Date(),
      title: "Credential Review Meeting",
      type: "meeting",
      time: "10:00 AM",
    },
    {
      date: addDays(new Date(), 1),
      title: "License Renewal Deadline",
      type: "deadline",
      time: "2:00 PM",
    },
    {
      date: addDays(new Date(), 2),
      title: "Provider Interview",
      type: "meeting",
      time: "11:30 AM",
    }
  ];

  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedEvent(event)}
          className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
        >
          <div className="flex-shrink-0">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-full">
              {event.type === 'meeting' ? (
                <FiClock className="text-primary-600 dark:text-primary-400" />
              ) : (
                <FiCalendar className="text-primary-600 dark:text-primary-400" />
              )}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-gray-100">{event.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(event.date, 'MMM dd')} at {event.time}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};