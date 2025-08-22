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
    <div className="grid md:grid-cols-3 gap-8 items-start px-4 md:px-8 lg:px-16 py-12">
      
      {/* Profile Card */}
      <motion.div 
        className="col-span-1 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 
                   dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                   border rounded-2xl shadow-xl p-8 text-center
                   hover:scale-105 hover:shadow-2xl transition-transform duration-500"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
          src={profile?.photo || '/assets/IMG_20240916_091715_347.jpg'} 
          alt="profile" 
          className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-pink-200"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <h1 className="mt-6 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          {profile?.name || 'Anonymous'}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{profile?.headline || 'No headline available.'}</p>
        
        {/* Social Icons */}
        <div className="mt-4 flex justify-center gap-4 text-xl text-gray-700 dark:text-gray-300">
          {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white"><FaGithub /></a>}
          {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-700"><FaLinkedin /></a>}
          {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>}
        </div>
      </motion.div>

      {/* About & Contact */}
      <div className="md:col-span-2 space-y-6">
        
        {/* About */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 via-green-50 to-teal-50 
                     dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                     border rounded-2xl shadow-xl p-6
                     hover:scale-105 hover:shadow-2xl transition-transform duration-500"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">About</h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300">{profile?.bio || 'No bio available.'}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Contact */}
          <motion.div 
            className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 
                       dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                       border rounded-2xl shadow-xl p-4
                       hover:scale-105 hover:shadow-2xl transition-transform duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Contact</h3>
            {profile?.email 
              ? <p className="flex items-center gap-2 text-sm"><FaEnvelope /> {profile.email}</p> 
              : <p className="text-sm text-gray-500">No email provided.</p>}
            {profile?.phone 
              ? <p className="flex items-center gap-2 text-sm"><FaPhone /> {profile.phone}</p> 
              : <p className="text-sm text-gray-500">No phone provided.</p>}
          </motion.div>

          {/* Location */}
          <motion.div 
            className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 
                       dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                       border rounded-2xl shadow-xl p-4
                       hover:scale-105 hover:shadow-2xl transition-transform duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Location</h3>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt /> {profile?.location || 'Not specified'}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
