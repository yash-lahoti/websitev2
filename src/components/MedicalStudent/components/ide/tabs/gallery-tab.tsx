"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

// Gallery images from public/gallary folder
const galleryImages = [
  "/gallary/cover.jpg",
  "/gallary/hero.jpg",
  "/gallary/gallery-1.jpg",
  "/gallary/ewp-114.jpg",
  "/gallary/ewp-343.jpg",
  "/gallary/cr_patoo.png",
  "/gallary/iceland_falls.png",
  "/gallary/tnc_corona.png",
  "/gallary/turkey_olives.png",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

export function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [fullImageLoaded, setFullImageLoaded] = useState(false);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleFullImageLoad = () => {
    setFullImageLoaded(true);
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    setFullImageLoaded(false); // Reset loading state when new image is selected
  };

  return (
    <div className="min-h-full p-4 md:p-8 lg:p-12 font-sans overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground mb-2">
            Visual Portfolio
          </p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 md:w-16 h-px bg-primary" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Gallery
            </h1>
            <div className="w-12 md:w-16 h-px bg-primary" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            {galleryImages.length} {galleryImages.length === 1 ? 'image' : 'images'}
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative aspect-square overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => handleImageSelect(image)}
            >
              {!loadedImages.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/80">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              )}
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(index)}
                onError={(e) => {
                  console.error("Failed to load image:", image);
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 bg-card hover:bg-secondary border border-border rounded-lg text-foreground transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div
              className="max-w-7xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {!fullImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/50 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary"></div>
                </div>
              )}
              <img
                src={selectedImage}
                alt="Full size gallery image"
                className={`max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                  fullImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={handleFullImageLoad}
                onError={(e) => {
                  console.error("Failed to load full image:", selectedImage);
                  setFullImageLoaded(true); // Show error state
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
