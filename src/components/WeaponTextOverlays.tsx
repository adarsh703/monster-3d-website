"use client";

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Weapon } from '@/data/weapons';

interface WeaponTextOverlaysProps {
  weapon: Weapon;
  scrollProgress: MotionValue<number>;
}

export default function WeaponTextOverlays({ weapon, scrollProgress }: WeaponTextOverlaysProps) {
  // Section 1: 0.0 -> 0.15 (fade in/out)
  const opacity1 = useTransform(scrollProgress, [0, 0.05, 0.1, 0.15], [1, 1, 0, 0]);
  const y1 = useTransform(scrollProgress, [0, 0.1], [0, -50]);

  // Section 2: 0.2 -> 0.4
  const opacity2 = useTransform(scrollProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(scrollProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

  // Section 3: 0.5 -> 0.7
  const opacity3 = useTransform(scrollProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollProgress, [0.45, 0.55, 0.65, 0.75], [50, 0, 0, -50]);

  // Section 4: 0.8 -> 1.0
  const opacity4 = useTransform(scrollProgress, [0.75, 0.85, 1, 1], [0, 1, 1, 1]);
  const y4 = useTransform(scrollProgress, [0.75, 0.85, 1, 1], [50, 0, 0, 0]);

  return (
    <div className="relative w-full h-full max-w-7xl mx-auto px-6 ">
      {/* Section 1 */}
      <motion.div 
        className="absolute top-1/4 left-6 md:left-24 max-w-xl"
        style={{ opacity: opacity1, y: y1 }}
      >
        <h1 
          className="text-4xl sm:text-5xl md:text-8xl font-bold mb-4 tracking-tighter uppercase text-[var(--text-primary)]"
          style={{ textShadow: `0 0 20px ${weapon.themeColor}80` }}
        >
          {weapon.section1.title}
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-[var(--text-primary)] opacity-90 drop-shadow-md">
          {weapon.section1.subtitle}
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        className="absolute top-1/3 right-6 md:right-24 max-w-lg text-right"
        style={{ opacity: opacity2, y: y2 }}
      >
        <h2 
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight uppercase text-[var(--text-primary)]"
          style={{ textShadow: `0 0 20px ${weapon.themeColor}80` }}
        >
          {weapon.section2.title}
        </h2>
        <p className="text-xl md:text-2xl text-[var(--text-primary)] opacity-90 drop-shadow-md">
          {weapon.section2.subtitle}
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        className="absolute top-1/2 left-6 md:left-24 max-w-lg -translate-y-1/2"
        style={{ opacity: opacity3, y: y3 }}
      >
        <h2 
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight uppercase text-[var(--text-primary)]"
          style={{ textShadow: `0 0 20px ${weapon.themeColor}80` }}
        >
          {weapon.section3.title}
        </h2>
        <p className="text-xl md:text-2xl text-[var(--text-primary)] opacity-90 drop-shadow-md">
          {weapon.section3.subtitle}
        </p>
      </motion.div>

      {/* Section 4 */}
      <motion.div 
        className="absolute bottom-1/4 right-6 md:right-24 max-w-lg text-right"
        style={{ opacity: opacity4, y: y4 }}
      >
        <h2 
          className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 tracking-tight uppercase text-[var(--text-primary)]"
          style={{ textShadow: `0 0 20px ${weapon.themeColor}80` }}
        >
          {weapon.section4.title}
        </h2>
        <p className="text-xl md:text-2xl text-[var(--text-primary)] opacity-90 drop-shadow-md">
          {weapon.section4.subtitle}
        </p>
      </motion.div>
    </div>
  );
}
