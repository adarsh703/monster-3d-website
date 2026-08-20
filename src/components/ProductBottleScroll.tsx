"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Product } from '@/data/products';

interface ProductBottleScrollProps {
  product: Product;
}

import ProductTextOverlays from './ProductTextOverlays';

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll over the ENTIRE page so the canvas stays synchronized from top to bottom
  const { scrollYProgress } = useScroll();

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameCount = 250; // Total frames for the Monster animation

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to be 3 digits (e.g., 001, 012, 250)
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${product.folderPath}/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          // Initial draw
          if (canvasRef.current && loadedImages[0]) {
            drawFrame(0, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, [product.folderPath]);

  const drawFrame = (frameIndex: number, img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
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
        // Map progress (0-1) to frame index (0-249)
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

  // We need local scroll progress just for the text overlays so they fade out before the page ends
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: textScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <>
      {/* FIXED CANVAS: This stays in the background forever */}
      <div className="fixed top-0 left-0 w-full h-screen z-[-1] bg-black">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain opacity-90"
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }} 
        />
        {/* Vignette effect over the canvas */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none" />
      </div>

      {/* TEXT OVERLAYS SPACER */}
      <div ref={containerRef} className="relative h-[300vh] w-full">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
          <ProductTextOverlays product={product} scrollProgress={textScrollProgress} />
        </div>
      </div>
    </>
  );
}
