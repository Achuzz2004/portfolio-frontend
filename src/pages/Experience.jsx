import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import TimelineCard from '../components/TimelineCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

export default function Experience() {
  const [exp, setExp] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getExperience()
      .then(data => setExp(data.results || []))
      .catch(() => setExp([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        Experience
      </h2>

      {exp.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No experience records available.</p>
      ) : (
        <div className="space-y-6">
          {exp.map(e => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50
                         dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                         border rounded-xl shadow-md p-6 
                         hover:scale-105 hover:shadow-2xl
                         transition-transform duration-300"
            >
              <TimelineCard
                item={{
                  title: e.role,
                  subtitle: e.company,
                  start: e.start_date,
                  end: e.end_date,
                  description: e.description
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
