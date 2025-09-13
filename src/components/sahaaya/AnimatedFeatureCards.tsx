"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Scale, 
  Hand, 
  Users, 
  Key, 
  Gamepad2,
  Sparkles,
  Shield,
  MessageCircle,
  BookOpen,
  UserCheck,
  Zap
} from 'lucide-react';

interface FeatureCard {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  gradient: string;
  animationType: 'waves' | 'balance' | 'wave' | 'nod' | 'rotate' | 'glow';
}

const features: FeatureCard[] = [
  {
    id: 'emotional',
    icon: Heart,
    title: 'Emotional Support',
    subtitle: 'Talk, share, and feel heard',
    gradient: 'from-blue-500 to-cyan-400',
    animationType: 'waves'
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal Support',
    subtitle: 'Know your rights clearly',
    gradient: 'from-purple-500 to-pink-400',
    animationType: 'balance'
  },
  {
    id: 'sign-language',
    icon: Hand,
    title: 'Sign Language',
    subtitle: 'Communicate with ease',
    gradient: 'from-pink-500 to-rose-400',
    animationType: 'wave'
  },
  {
    id: 'human',
    icon: Users,
    title: 'Human Support',
    subtitle: 'Real humans ready to help',
    gradient: 'from-green-500 to-emerald-400',
    animationType: 'nod'
  },
  {
    id: 'supporter',
    icon: Key,
    title: 'Supporter Portal',
    subtitle: 'For registered helpers',
    gradient: 'from-indigo-500 to-blue-400',
    animationType: 'rotate'
  },
  {
    id: 'games',
    icon: Gamepad2,
    title: 'Stress Relief Games',
    subtitle: 'Play & relax instantly',
    gradient: 'from-yellow-500 to-orange-400',
    animationType: 'glow'
  }
];

// Animation variants for different types
const animationVariants = {
  waves: {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  balance: {
    animate: {
      rotate: [0, 3, -3, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  wave: {
    animate: {
      rotate: [0, 15, -15, 0],
      y: [0, -5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  nod: {
    animate: {
      y: [0, -3, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  rotate: {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  glow: {
    animate: {
      scale: [1, 1.1, 1],
      filter: [
        'brightness(1)',
        'brightness(1.3)',
        'brightness(1)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Background animation components
const WaveBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full"
      animate={{
        y: [0, 20, 0],
        x: [0, 10, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full"
      animate={{
        y: [0, -15, 0],
        x: [0, -8, 0],
        scale: [1, 0.8, 1]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
  </motion.div>
);

const BalanceBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-20 h-1 bg-white rounded-full" />
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full" />
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const WaveHandBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-4 right-4"
      animate={{
        rotate: [0, 20, -20, 0],
        y: [0, -5, 0]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-8 h-12 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const NodBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        y: [0, -3, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-16 h-16 bg-white rounded-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full" />
    </motion.div>
  </motion.div>
);

const RotateBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
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
      <div className="w-12 h-12 border-2 border-white rounded-full" />
    </motion.div>
  </motion.div>
);

const GlowBackground = () => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-20 h-20 bg-white rounded-lg" />
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

export function AnimatedFeatureCards() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-12">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const animationVariant = animationVariants[feature.animationType];
            
            return (
              <motion.div
                key={feature.id}
                className="group relative"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={`
                    relative w-full h-48 rounded-2xl p-6
                    bg-gradient-to-br ${feature.gradient}
                    shadow-lg hover:shadow-2xl
                    cursor-pointer overflow-hidden
                    border border-white/10
                    backdrop-blur-sm
                  `}
                  whileHover={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Background Animation */}
                  {getBackgroundComponent(feature.animationType)}
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                      className="mb-4"
                      variants={animationVariant}
                      animate="animate"
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <IconComponent 
                        className="w-8 h-8 text-white" 
                      />
                    </motion.div>
                    
                    {/* Text Content */}
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})`
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
