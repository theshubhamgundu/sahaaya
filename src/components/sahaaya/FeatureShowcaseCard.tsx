"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Scale, 
  Hand, 
  Users, 
  Key, 
  Gamepad2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Feature {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  animationType: 'waves' | 'balance' | 'wave' | 'nod' | 'rotate' | 'glow';
}

const features: Feature[] = [
  {
    id: 'emotional',
    icon: Heart,
    title: 'Emotional Support',
    subtitle: 'Talk, share, and feel heard',
    description: 'Get compassionate AI support for your emotional well-being. Share your feelings and receive empathetic responses.',
    gradient: 'from-blue-500 to-cyan-400',
    animationType: 'waves'
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal Support',
    subtitle: 'Know your rights clearly',
    description: 'Access reliable legal guidance and understand your rights with AI-powered legal assistance.',
    gradient: 'from-purple-500 to-pink-400',
    animationType: 'balance'
  },
  {
    id: 'sign-language',
    icon: Hand,
    title: 'Sign Language',
    subtitle: 'Communicate with ease',
    description: 'Break communication barriers with AI-powered sign language interpretation and learning tools.',
    gradient: 'from-pink-500 to-rose-400',
    animationType: 'wave'
  },
  {
    id: 'human',
    icon: Users,
    title: 'Human Support',
    subtitle: 'Real humans ready to help',
    description: 'Connect with trained human supporters when you need personal, one-on-one assistance.',
    gradient: 'from-green-500 to-emerald-400',
    animationType: 'nod'
  },
  {
    id: 'supporter',
    icon: Key,
    title: 'Supporter Portal',
    subtitle: 'For registered helpers',
    description: 'Join our community of supporters and help others while building meaningful connections.',
    gradient: 'from-indigo-500 to-blue-400',
    animationType: 'rotate'
  },
  {
    id: 'games',
    icon: Gamepad2,
    title: 'Stress Relief Games',
    subtitle: 'Play & relax instantly',
    description: 'Engage with interactive games designed to reduce stress and promote mental well-being.',
    gradient: 'from-yellow-500 to-orange-400',
    animationType: 'glow'
  }
];

// Enhanced animation variants for different types
const animationVariants = {
  waves: {
    y: [0, -12, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.15, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
      'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  balance: {
    rotate: [0, 8, -8, 0],
    scale: [1, 1.15, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
      'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  wave: {
    rotate: [0, 25, -25, 0],
    y: [0, -10, 0],
    scale: [1, 1.15, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
      'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  nod: {
    y: [0, -6, 0],
    rotate: [0, 3, -3, 0],
    scale: [1, 1.15, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
      'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
    ],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  },
  rotate: {
    rotate: [0, 360],
    scale: [1, 1.15, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))',
      'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.6))',
      'brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.3))'
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear" as const
    }
  },
  glow: {
    scale: [1, 1.25, 1],
    filter: [
      'brightness(1) drop-shadow(0 0 15px rgba(255,255,255,0.4))',
      'brightness(1.3) drop-shadow(0 0 25px rgba(255,255,255,0.8))',
      'brightness(1) drop-shadow(0 0 15px rgba(255,255,255,0.4))'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Emotional Support Character - Two embracing figures with glowing hearts
const EmotionalCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    {/* Two embracing characters */}
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -2, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Left Character (Blue top) */}
      <motion.div
        className="absolute left-2 top-4 w-16 h-20"
        animate={{
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Light blue hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-blue-300 rounded-full"></div>
        </div>
        {/* Body - Blue top */}
        <div className="w-12 h-14 bg-blue-400 rounded-full mx-auto mt-1 relative">
          {/* Left arm - embracing */}
          <motion.div
            className="absolute top-2 -left-1 w-3 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -15, -10, 0],
              x: [0, -1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Right Character (Green top) */}
      <motion.div
        className="absolute right-2 top-2 w-16 h-20"
        animate={{
          rotate: [0, -1, 1, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Light blue hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-blue-300 rounded-full"></div>
        </div>
        {/* Body - Green top */}
        <div className="w-12 h-14 bg-green-400 rounded-full mx-auto mt-1 relative">
          {/* Right arm - embracing */}
          <motion.div
            className="absolute top-2 -right-1 w-3 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 15, 10, 0],
              x: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Glowing Hearts */}
      <motion.div
        className="absolute top-1 left-1/2 transform -translate-x-1/2 text-lg"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ❤️
      </motion.div>
      <motion.div
        className="absolute top-6 left-4 text-sm"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -5, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        ❤️
      </motion.div>
      <motion.div
        className="absolute top-8 right-6 text-sm"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -3, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        ❤️
      </motion.div>

      {/* Swirling light trails */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-pink-200 rounded-full opacity-30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </motion.div>
  </motion.div>
);

// Legal Support Character - Pointing at contract with scales
const LegalCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -1, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Left Character (Male - Blue suit) */}
      <motion.div
        className="absolute left-2 top-6 w-16 h-20"
        animate={{
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Dark blue hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-blue-800 rounded-full"></div>
        </div>
        {/* Body - Blue suit */}
        <div className="w-12 h-14 bg-blue-500 rounded-full mx-auto mt-1 relative">
          {/* White shirt */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
          {/* Pointing arm */}
          <motion.div
            className="absolute top-2 -right-2 w-3 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 25, 20, 0],
              x: [0, 2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Right Character (Female - Teal suit) */}
      <motion.div
        className="absolute right-2 top-8 w-16 h-20"
        animate={{
          rotate: [0, -0.5, 0.5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Light purple hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-purple-300 rounded-full"></div>
        </div>
        {/* Body - Teal suit */}
        <div className="w-12 h-14 bg-teal-400 rounded-full mx-auto mt-1 relative">
          {/* White shirt */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
          {/* Arms holding contract */}
          <motion.div
            className="absolute top-2 -left-1 w-3 h-6 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -10, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2 -right-1 w-3 h-6 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 10, 5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Contract Document */}
      <motion.div
        className="absolute top-12 right-6 w-12 h-16 bg-white rounded border-2 border-gray-300"
        animate={{
          y: [0, -1, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Contract text */}
        <div className="p-1 text-xs">
          <div className="font-bold text-black">CONTRACT</div>
          <div className="text-gray-600 text-xs">___________</div>
          <div className="text-gray-600 text-xs">___________</div>
          <div className="text-gray-600 text-xs">___________</div>
        </div>
        {/* Gold seal */}
        <div className="absolute bottom-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border border-red-500"></div>
      </motion.div>

      {/* Scales of Justice */}
      <motion.div
        className="absolute top-2 left-1/2 transform -translate-x-1/2"
        animate={{
          rotate: [0, 2, -2, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-lg">⚖️</div>
      </motion.div>

      {/* Gavel */}
      <motion.div
        className="absolute bottom-4 right-8 text-sm"
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ⚖️
      </motion.div>
    </motion.div>
  </motion.div>
);

// Sign Language Character - Teal hair, signing gestures with motion lines
const SignLanguageCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -1, 0]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Main Character */}
      <motion.div
        className="absolute left-1/2 top-6 transform -translate-x-1/2 w-20 h-24"
        animate={{
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-10 h-10 bg-orange-200 rounded-full relative">
          {/* Teal bob hair */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-teal-400 rounded-full"></div>
        </div>
        
        {/* Body - Light blue top */}
        <div className="w-14 h-16 bg-blue-300 rounded-full mx-auto mt-1 relative">
          {/* Left hand - raised with motion lines */}
          <motion.div
            className="absolute top-2 -left-2 w-4 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -25, 25, -15, 0],
              y: [0, -2, 0, -1, 0],
              x: [0, -1, 0, -0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Right hand - pointing with motion lines */}
          <motion.div
            className="absolute top-3 -right-2 w-4 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 20, -20, 10, 0],
              y: [0, -1, 0, -0.5, 0],
              x: [0, 1, 0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </div>
      </motion.div>

      {/* Motion lines around hands */}
      <motion.div
        className="absolute top-8 left-4 w-2 h-8 bg-pink-200 rounded-full opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-10 right-6 w-2 h-6 bg-pink-200 rounded-full opacity-60"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
          rotate: [0, -15, 15, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Crescent moons and dots */}
      <motion.div
        className="absolute top-6 left-8 text-xs"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 20, -20, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌙
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7
        }}
      />
      <motion.div
        className="absolute top-12 right-4 w-1 h-1 bg-white rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Heart below left hand */}
      <motion.div
        className="absolute top-16 left-6 text-sm"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ❤️
      </motion.div>

      {/* Swirling lines around character */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-pink-200 rounded-full opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1]
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </motion.div>
  </motion.div>
);

// Human Support Character - Two figures with golden heart
const HumanSupportCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Left Character (Shorter - Bob hair) */}
      <motion.div
        className="absolute left-2 top-8 w-16 h-20"
        animate={{
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Dark brown bob hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-amber-800 rounded-full"></div>
        </div>
        {/* Body - Teal top */}
        <div className="w-12 h-14 bg-teal-400 rounded-full mx-auto mt-1 relative">
          {/* Cream inner shirt */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full"></div>
          {/* Left arm - gentle touch */}
          <motion.div
            className="absolute top-2 -left-1 w-3 h-6 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -5, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Right Character (Taller - Shoulder length hair) */}
      <motion.div
        className="absolute right-2 top-6 w-16 h-20"
        animate={{
          rotate: [0, -0.5, 0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Dark brown shoulder length hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-amber-800 rounded-full"></div>
        </div>
        {/* Body - Teal top */}
        <div className="w-12 h-14 bg-teal-400 rounded-full mx-auto mt-1 relative">
          {/* Cream inner shirt */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-100 rounded-full"></div>
          {/* Right arm - supporting gesture */}
          <motion.div
            className="absolute top-2 -right-1 w-3 h-6 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 5, 2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Golden Heart with radiating lines */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-lg">💛</div>
        {/* Radiating golden lines */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-yellow-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-yellow-300 rounded-full opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </motion.div>

      {/* Light blue circular background */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-200 rounded-full opacity-30"
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  </motion.div>
);

// Supporter Portal Character - Woman with dashboard and key
const SupporterCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Main Character (Woman) */}
      <motion.div
        className="absolute right-2 top-4 w-16 h-20"
        animate={{
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-8 h-8 bg-orange-200 rounded-full relative">
          {/* Dark hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gray-800 rounded-full"></div>
        </div>
        {/* Body - Light brown blazer */}
        <div className="w-12 h-14 bg-amber-600 rounded-full mx-auto mt-1 relative">
          {/* White top */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full"></div>
          {/* Left arm - on hip */}
          <motion.div
            className="absolute top-2 -left-1 w-3 h-6 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -10, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Right arm - pointing at dashboard */}
          <motion.div
            className="absolute top-2 -right-1 w-3 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 20, 15, 0],
              x: [0, 2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        {/* Dark blue trousers */}
        <div className="w-12 h-6 bg-blue-800 rounded-full mx-auto mt-1"></div>
      </motion.div>

      {/* Digital Dashboard */}
      <motion.div
        className="absolute left-2 top-8 w-20 h-16 bg-white rounded border-2 border-gray-300"
        animate={{
          y: [0, -1, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Browser window controls */}
        <div className="flex space-x-1 p-1">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        
        {/* Dashboard content */}
        <div className="p-1 text-xs">
          {/* Profile icon */}
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
          </div>
          
          {/* Line graph */}
          <div className="mb-1">
            <div className="w-full h-2 bg-gray-200 rounded relative">
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-green-400 rounded"
                animate={{
                  scaleX: [0.3, 0.7, 0.5, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
          
          {/* Bar charts */}
          <div className="flex space-x-1 mb-1">
            <div className="w-2 h-3 bg-blue-400 rounded"></div>
            <div className="w-2 h-2 bg-blue-400 rounded"></div>
            <div className="w-2 h-4 bg-blue-400 rounded"></div>
          </div>
          
          {/* Progress circle */}
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-gray-300 rounded-full relative mr-1">
              <motion.div
                className="absolute top-0 left-0 w-full h-full border-2 border-green-400 rounded-full"
                animate={{
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            <div className="w-6 h-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </motion.div>

      {/* Key and Person Icon */}
      <motion.div
        className="absolute top-2 right-8 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-xs">🔑</div>
      </motion.div>
      <motion.div
        className="absolute top-2 right-12 w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -1, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="text-xs">👤</div>
      </motion.div>

      {/* Light blue circular background */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-200 rounded-full opacity-30"
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  </motion.div>
);

// Games Character - Person with controller and gaming elements
const GamesCharacter = () => (
  <motion.div
    className="absolute bottom-2 right-2 w-40 h-48"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    <motion.div
      className="relative w-full h-full"
      animate={{
        y: [0, -2, 0]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Main Character */}
      <motion.div
        className="absolute left-1/2 top-6 transform -translate-x-1/2 w-20 h-24"
        animate={{
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Head */}
        <div className="w-10 h-10 bg-orange-200 rounded-full relative">
          {/* Brown hair */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-amber-700 rounded-full"></div>
        </div>
        
        {/* Body - Teal hoodie */}
        <div className="w-14 h-16 bg-teal-400 rounded-full mx-auto mt-1 relative">
          {/* Large front pocket */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-teal-500 rounded-full"></div>
          
          {/* Arms holding controller */}
          <motion.div
            className="absolute top-2 -left-2 w-4 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, -15, 15, -10, 0],
              x: [0, -1, 0, -0.5, 0]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-2 -right-2 w-4 h-8 bg-orange-200 rounded-full"
            animate={{
              rotate: [0, 15, -15, 10, 0],
              x: [0, 1, 0, 0.5, 0]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
        </div>
        
        {/* Dark blue pants */}
        <div className="w-14 h-6 bg-blue-800 rounded-full mx-auto mt-1"></div>
      </motion.div>

      {/* Game Controller */}
      <motion.div
        className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-blue-800 rounded"
        animate={{
          y: [0, -1, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Controller details */}
        <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="absolute top-1 right-1 w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-1 left-2 w-1 h-1 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-1 right-2 w-1 h-1 bg-gray-400 rounded-full"></div>
        {/* Wire */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-black"></div>
      </motion.div>

      {/* Gaming Elements */}
      {/* Golden Coin */}
      <motion.div
        className="absolute top-4 left-6 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="text-xs font-bold text-yellow-800">$</div>
      </motion.div>
      
      {/* Trailing dots for coin */}
      <motion.div
        className="absolute top-8 left-6 w-1 h-1 bg-white rounded-full"
        animate={{
          y: [0, -4, 0],
          opacity: [0.8, 0.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <motion.div
        className="absolute top-10 left-6 w-1 h-1 bg-white rounded-full"
        animate={{
          y: [0, -3, 0],
          opacity: [0.6, 0.1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6
        }}
      />

      {/* Puzzle Piece */}
      <motion.div
        className="absolute top-6 right-8 w-4 h-4 bg-teal-400 rounded"
        animate={{
          y: [0, -6, 0],
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Puzzle piece details */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full"></div>
      </motion.div>
      
      {/* Trailing dots for puzzle piece */}
      <motion.div
        className="absolute top-10 right-8 w-1 h-1 bg-white rounded-full"
        animate={{
          y: [0, -3, 0],
          opacity: [0.7, 0.2, 0.7]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />

      {/* Flaming Power-up */}
      <motion.div
        className="absolute top-16 right-6 w-4 h-4 bg-gray-800 rounded relative"
        animate={{
          y: [0, -4, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Star in center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">⭐</div>
        {/* Flames */}
        <motion.div
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-orange-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      </motion.div>

      {/* Light blue circular background */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-blue-200 rounded-full opacity-30"
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  </motion.div>
);

// Enhanced background animation components
const WaveBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-full"
      animate={{
        y: [0, 30, 0],
        x: [0, 15, 0],
        scale: [1, 1.4, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full"
      animate={{
        y: [0, -20, 0],
        x: [0, -12, 0],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"
      animate={{
        y: [0, -15, 0],
        x: [0, 10, 0],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }}
    />
  </motion.div>
);

const BalanceBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        rotate: [0, 8, -8, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-32 h-2 bg-white rounded-full" />
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full" />
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const WaveHandBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-8 right-8"
      animate={{
        rotate: [0, 25, -25, 0],
        y: [0, -8, 0]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-12 h-16 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const NodBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        y: [0, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-24 h-24 bg-white rounded-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const RotateBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        rotate: [0, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className="w-20 h-20 border-3 border-white rounded-full" />
    </motion.div>
  </motion.div>
);

const GlowBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.15 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.15, 0.4, 0.15]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-32 h-32 bg-white rounded-xl" />
    </motion.div>
  </motion.div>
);

const getBackgroundComponent = (type: string) => {
  switch (type) {
    case 'waves': return <WaveBackground />;
    case 'balance': return <BalanceBackground />;
    case 'wave': return <WaveHandBackground />;
    case 'nod': return <NodBackground />;
    case 'rotate': return <RotateBackground />;
    case 'glow': return <GlowBackground />;
    default: return null;
  }
};

const getCharacterComponent = (type: string) => {
  switch (type) {
    case 'waves': return <EmotionalCharacter />;
    case 'balance': return <LegalCharacter />;
    case 'wave': return <SignLanguageCharacter />;
    case 'nod': return <HumanSupportCharacter />;
    case 'rotate': return <SupporterCharacter />;
    case 'glow': return <GamesCharacter />;
    default: return null;
  }
};

function FeatureShowcaseCard() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  const currentFeature = features[currentIndex];

  // Auto-advance every 2.5 seconds (faster)
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
    setIsAutoPlaying(false);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsAutoPlaying(false);
  };

  const goToFeature = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Main Showcase Card */}
        <motion.div
          className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
          key={currentFeature.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentFeature.gradient}`} />
          
          {/* Background Animation */}
          {getBackgroundComponent(currentFeature.animationType)}
          
          {/* Animated Character */}
          {getCharacterComponent(currentFeature.animationType)}
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                {/* Icon */}
                <motion.div
                  className="mb-6"
                  animate={animationVariants[currentFeature.animationType]}
                  whileHover={{
                    scale: 1.3,
                    filter: 'brightness(1.4) drop-shadow(0 0 30px rgba(255,255,255,0.8))',
                    transition: { duration: 0.2 }
                  }}
                >
                  <currentFeature.icon className="w-16 h-16 text-white mx-auto" />
                </motion.div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {currentFeature.title}
                </h2>
                
                {/* Subtitle */}
                <p className="text-xl text-white/90 mb-6">
                  {currentFeature.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-white/80 text-lg leading-relaxed">
                  {currentFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevFeature}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button
            onClick={nextFeature}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
        
        {/* Feature Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToFeature(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              whileHover={{ 
                scale: 1.3,
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: index === currentIndex ? 1.25 : 1,
                boxShadow: index === currentIndex ? "0 0 15px rgba(59, 130, 246, 0.6)" : "none"
              }}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default FeatureShowcaseCard;
