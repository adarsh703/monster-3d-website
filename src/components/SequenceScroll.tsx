"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';
import { Weapon } from '@/data/weapons';
import WeaponTextOverlays from './WeaponTextOverlays';

interface SequenceScrollProps {
  weapon: Weapon;
}

export default function SequenceScroll({ weapon }: SequenceScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll over the ENTIRE page
  const { scrollYProgress } = useScroll();

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 240; // The actual frame count of the animation

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${weapon.folderPath}/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          if (canvasRef.current && loadedImages[0]) {
            drawFrame(0, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, [weapon.id]);

  const drawFrame = (frameIndex: number, img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual size in memory (scaled to account for extra pixel density).
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Normalize coordinate system to use css pixels.
      ctx.scale(dpr, dpr);
      
      // Match the background color to the theme mode
      ctx.fillStyle = weapon.themeMode === 'light' ? '#e0f7fa' : '#050505';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Calculate responsive sizing (cover fit) using window.innerWidth/Height
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio); // Changed from Math.min to Math.max for cover effect
      
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    requestAnimationFrame(render);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (images.length === frameCount) {
        // Map progress (0-1) to frame index (0-249) over the ENTIRE page
        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(latest * frameCount)
        );
        
        requestAnimationFrame(() => {
          drawFrame(frameIndex, images[frameIndex]);
        });
      }
    });

    const handleResize = () => {
      const currentFrame = Math.min(
        frameCount - 1,
        Math.floor(scrollYProgress.get() * frameCount)
      );
      if (images[currentFrame]) {
        drawFrame(currentFrame, images[currentFrame]);
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress, images]);

  // Local scroll progress for the text overlays
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: textContainerRef,
    offset: ["start start", "end start"]
  });

  return (
    <>
      {/* FIXED CANVAS: This stays in the background forever */}
      <div 
        className="fixed top-0 left-0 w-full h-screen z-[-1] transition-colors duration-800"
        style={{ backgroundColor: weapon.themeMode === 'light' ? '#e0f7fa' : '#050505' }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-90 mix-blend-normal"
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }} 
        />
        {/* Subtle Tech Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(${weapon.themeColor} 1px, transparent 1px), linear-gradient(90deg, ${weapon.themeColor} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center center',
            maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)'
          }}
        />
      </div>

      {/* TEXT OVERLAYS SPACER */}
      <div ref={textContainerRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
          <WeaponTextOverlays weapon={weapon} scrollProgress={textScrollProgress} />
        </div>
      </div>
    </>
  );
}
