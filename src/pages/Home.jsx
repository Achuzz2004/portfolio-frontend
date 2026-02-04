import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfile()
      .then(data => setProfile(data.results[0]))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Profile Card */}
        <motion.div 
          className="lg:col-span-4 sticky top-24 flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative group">
            {/* Animated Glow behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={profile?.photo || 'https://via.placeholder.com/150'} 
              alt="profile" 
              className="relative w-44 h-44 rounded-full object-cover border-2 border-white dark:border-gray-900 shadow-xl"
            />
          </div>

          <h1 className="mt-8 text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            {profile?.name || 'Anonymous'}
          </h1>
          
          <p className="mt-3 text-sm font-medium px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/30">
            {profile?.headline || 'Creative Developer'}
          </p>
          
          <div className="mt-8 flex gap-6 text-gray-400 dark:text-gray-500">
            {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors"><FaGithub size={22} /></a>}
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-purple-500 transition-colors"><FaLinkedin size={22} /></a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors"><FaTwitter size={22} /></a>}
          </div>
        </motion.div>

        {/* About & Info */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Section */}
          <motion.div 
            className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"></span>
              About Me
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-light italic">
              "{profile?.bio || 'Crafting digital experiences with precision and passion.'}"
            </p>
          </motion.div>

          {/* Contact Details Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div 
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Contact</h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                {profile?.email && <p className="flex items-center gap-3 text-sm hover:text-purple-500 transition-colors cursor-pointer"><FaEnvelope className="text-pink-500" /> {profile.email}</p>}
                {profile?.phone && <p className="flex items-center gap-3 text-sm hover:text-purple-500 transition-colors cursor-pointer"><FaPhone className="text-purple-500" /> {profile.phone}</p>}
              </div>
            </motion.div>

            <motion.div 
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Location</h3>
              <p className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-blue-500" /> 
                {profile?.location || 'San Francisco, CA'}
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
