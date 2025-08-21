import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import TimelineCard from '../components/TimelineCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

export default function Education() {
  const [edu, setEdu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEducation()
      .then(data => setEdu(data.results || []))
      .catch(() => setEdu([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
        Education
      </h2>

      {edu.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No education records available.</p>
      ) : (
        <div className="space-y-6">
          {edu.map(e => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 
                         dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                         border rounded-xl shadow-md p-6 
                         hover:scale-105 hover:shadow-2xl 
                         transition-transform duration-300"
            >
              <TimelineCard
                item={{
                  title: e.degree,
                  subtitle: e.institution,
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
