import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import {
FaGithub,
FaLinkedin,
FaTwitter,
FaGlobe,
FaMapMarkerAlt,
FaEnvelope,
FaPhone
} from 'react-icons/fa';

export default function About() {
const [profiles, setProfiles] = useState(null);

useEffect(() => {
api.getProfile()
.then(data => setProfiles(data.results))
.catch(() => {});
}, []);

if (!profiles) return <Loader />;

return (

<div className="min-h-screen w-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-12">  
<div className="w-full max-w-5xl space-y-12">  
{profiles.map((profile) => (  
<motion.div  
key={profile.id}  
className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50  
dark:from-gray-800 dark:via-gray-900 dark:to-gray-800  
border rounded-2xl shadow-xl p-8  
hover:scale-105 hover:shadow-2xl transition-all duration-500"  
initial={{ opacity: 0, y: 40 }}  
whileInView={{ opacity: 1, y: 0 }}  
viewport={{ once: true }}  
>  
<div className="flex flex-col md:flex-row items-center gap-8">  
{/* Profile Image */}  
<motion.img  
src={profile.photo || '/assets/IMG_20240916_091715_347.jpg'}  
alt="profile"  
className="w-44 h-44 rounded-full object-cover border-4 border-sky-200 dark:border-sky-600"  
initial={{ scale: 0.8, opacity: 0 }}  
whileInView={{ scale: 1, opacity: 1 }}  
transition={{ duration: 0.8, ease: 'easeOut' }}  
/>  {/* Profile Info */}
<motion.div
className="flex-1"
initial={{ x: -50, opacity: 0 }}
whileInView={{ x: 0, opacity: 1 }}
transition={{ duration: 0.8, ease: 'easeOut' }}
>
<h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
{profile.name}
</h2>
<p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">
{profile.headline}
</p>
<p className="mt-4 text-slate-700 dark:text-gray-300">{profile.bio}</p>

{/* Contact Info */}    
        <div className="mt-6 space-y-2 text-sm text-gray-700 dark:text-gray-300">    
          {profile.email && (    
            <p className="flex items-center gap-2">    
              <FaEnvelope className="text-pink-500" /> {profile.email}    
            </p>    
          )}    
          {profile.phone && (    
            <p className="flex items-center gap-2">    
              <FaPhone className="text-purple-500" /> {profile.phone}    
            </p>    
          )}    
          {profile.website && (    
            <p className="flex items-center gap-2">    
              <FaGlobe className="text-blue-500" />    
              <a    
                href={profile.website}    
                target="_blank"    
                rel="noreferrer"    
                className="underline hover:text-blue-600 dark:hover:text-blue-400"    
              >    
                {profile.website}    
              </a>    
            </p>    
          )}    
          {profile.location && (    
            <p className="flex items-center gap-2">    
              <FaMapMarkerAlt className="text-red-500" /> {profile.location}    
            </p>    
          )}    
        </div>    

        {/* Social Links */}    
        <div className="flex gap-4 mt-4 text-2xl">    
          {profile.github && (    
            <a    
              href={profile.github}    
              target="_blank"    
              rel="noreferrer"    
              className="hover:text-gray-900 dark:hover:text-white transition"    
            >    
              <FaGithub />    
            </a>    
          )}    
          {profile.linkedin && (    
            <a    
              href={profile.linkedin}  

                  target="_blank"  
                  rel="noreferrer"  
                  className="hover:text-blue-700 dark:hover:text-blue-400 transition"  
                >  
                  <FaLinkedin />  
                </a>  
              )}  
              {profile.twitter && (  
                <a  
                  href={profile.twitter}  
                  target="_blank"  
                  rel="noreferrer"  
                  className="hover:text-sky-500 transition"  
                >  
                  <FaTwitter />  
                </a>  
              )}  
            </div>  
          </motion.div>  
        </div>  
      </motion.div>  
    ))}  
  </div>  
</div>

);
}


