"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FeatureShowcaseCard from '@/components/sahaaya/FeatureShowcaseCard';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  const handleQuickAction = (route: string) => {
    router.push(route);
  };
  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-400/40 to-pink-400/40' 
            : 'bg-gradient-to-br from-blue-400/50 to-purple-400/50'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
          isDarkMode 
            ? 'bg-gradient-to-br from-cyan-400/40 to-blue-400/40' 
            : 'bg-gradient-to-br from-pink-400/50 to-rose-400/50'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
          isDarkMode 
            ? 'bg-gradient-to-br from-yellow-400/30 to-orange-400/30' 
            : 'bg-gradient-to-br from-cyan-400/40 to-blue-400/40'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          isDarkMode 
            ? 'bg-gradient-to-br from-green-400/30 to-emerald-400/30' 
            : 'bg-gradient-to-br from-green-400/40 to-emerald-400/40'
        }`} style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900' 
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </motion.button>
      </div>
      
      <div className="container mx-auto p-4 md:p-6 max-w-7xl relative z-10">
      <div className="text-center mb-8">
          <motion.h1 
            className={`text-3xl md:text-4xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to Sahaaya AI
          </motion.h1>
          <motion.p 
            className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How can we support you today?
          </motion.p>
      </div>

        {/* Enhanced Feature Showcase Card with Animated Characters */}
        <FeatureShowcaseCard />

        {/* Quick Action Buttons */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2 
            className={`text-2xl font-bold text-center mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Quick Access
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Emotional Support */}
            <motion.div 
              className="bg-gradient-to-br from-blue-500 to-cyan-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/emotional-support')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.div>
              <span className="text-sm font-semibold">Emotional</span>
            </motion.div>

            {/* Legal Support */}
            <motion.div 
              className="bg-gradient-to-br from-purple-500 to-pink-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/legal-support')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ⚖️
              </motion.div>
              <span className="text-sm font-semibold">Legal</span>
            </motion.div>

            {/* Sign Language */}
            <motion.div 
              className="bg-gradient-to-br from-pink-500 to-rose-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/sign-language')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(236, 72, 153, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🤝
              </motion.div>
              <span className="text-sm font-semibold">Sign</span>
            </motion.div>

            {/* Human Support */}
            <motion.div 
              className="bg-gradient-to-br from-green-500 to-emerald-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/human-support')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  scale: [1, 1.1, 1],
                  y: [0, -1, 0]
                }}
                transition={{ 
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👥
              </motion.div>
              <span className="text-sm font-semibold">Human</span>
            </motion.div>

            {/* Supporter Portal */}
            <motion.div 
              className="bg-gradient-to-br from-indigo-500 to-blue-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/supporter-chat')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                🔑
              </motion.div>
              <span className="text-sm font-semibold">Supporter</span>
            </motion.div>

            {/* Stress Relief Games */}
            <motion.div 
              className="bg-gradient-to-br from-yellow-500 to-orange-400 h-20 rounded-lg flex flex-col items-center justify-center text-white cursor-pointer shadow-lg"
              onClick={() => handleQuickAction('/stress-relief-games')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div 
                className="text-2xl mb-1"
                animate={{ 
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.15, 1]
                }}
                transition={{ 
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎮
              </motion.div>
              <span className="text-sm font-semibold">Games</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
