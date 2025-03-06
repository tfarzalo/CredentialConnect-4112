import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { FiClock, FiCalendar, FiX, FiMapPin, FiUsers } from 'react-icons/fi';

const EventModal = ({ event, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {event.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <FiClock className="h-5 w-5" />
            <span>{format(event.date, 'MMMM d, yyyy')} at {event.time}</span>
          </div>

          {event.location && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FiMapPin className="h-5 w-5" />
              <span>{event.location}</span>
            </div>
          )}

          {event.attendees && (
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FiUsers className="h-5 w-5" />
              <span>{event.attendees.join(', ')}</span>
            </div>
          )}

          {event.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {event.description}
            </p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
            {event.type === 'meeting' && (
              <button
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Join Meeting
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const events = [
    {
      date: new Date(),
      title: "Credential Review Meeting",
      type: "meeting",
      time: "10:00 AM",
      location: "Virtual Conference Room",
      attendees: ["Dr. Johnson", "Dr. Smith", "Credentialing Committee"],
      description: "Monthly credential review meeting to discuss pending applications and renewals."
    },
    {
      date: addDays(new Date(), 1),
      title: "License Renewal Deadline",
      type: "deadline",
      time: "2:00 PM",
      description: "Deadline for submitting license renewal documentation for Dr. Anderson."
    },
    {
      date: addDays(new Date(), 2),
      title: "Provider Interview",
      type: "meeting",
      time: "11:30 AM",
      location: "Main Office - Room 204",
      attendees: ["Dr. Williams", "Credentialing Team"],
      description: "Initial interview with new provider candidate Dr. Williams."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Upcoming Events
      </h3>
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

      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};