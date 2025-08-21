import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { api } from "../api/api";

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfile()
      .then(data => {
        // if backend sends { results: [...] }
        if (data?.results?.length > 0) {
          setProfile(data.results[0]);
        } else {
          setProfile(data); // in case API returns a single object
        }
      })
      .catch(() => setProfile(null));
  }, []);

  if (!profile) return null;

  return (
    <motion.footer
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t mt-12 transition-colors duration-500"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container-max mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-700 dark:text-gray-300">
        
        {/* Contact Info */}
        <div className="text-center md:text-left space-y-1">
          <p className="font-semibold text-lg">Contact Info</p>
          {profile.address && <p className="text-sm">📍 {profile.address}</p>}
          {profile.location && <p className="text-sm">🌍 {profile.location}</p>}
          {profile.email && <p className="text-sm">✉️ {profile.email}</p>}
          {profile.phone && <p className="text-sm">📞 {profile.phone}</p>}
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-2xl">
          {profile.github && (
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-900 dark:hover:text-gray-100"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
          )}
          {profile.linkedin && (
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
          )}
          {profile.twitter && (
            <motion.a
              href={profile.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-500 dark:hover:text-sky-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </motion.a>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            MyPortfolio
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
