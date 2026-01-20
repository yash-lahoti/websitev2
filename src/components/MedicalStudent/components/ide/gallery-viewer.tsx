"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { assetUrl } from "../../lib/utils";

interface GalleryViewerProps {
  onClose: () => void;
}

// Gallery images - add assets under `public/` and reference them with absolute paths
const galleryImages = [
  "/images/profile_full.jpg",
  "/images/profile.jpg",
  "/medicalstudent/projects/cardiac-tinyml/cover.png",
  "/medicalstudent/projects/spine-segmentation/figure-1.png",
  "/medicalstudent/projects/spine-segmentation/figure-2-1.png",
  "/medicalstudent/projects/spine-segmentation/figure-2-2.png",
  "/medicalstudent/projects/scoliosis-cobb/figure-1.png",
  "/medicalstudent/projects/radimagenet/figure-1.png",
  "/medicalstudent/projects/spinesight/cover.jpeg",
];

export function GalleryViewer({ onClose }: GalleryViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentImage = galleryImages[selectedIndex];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsZoomed(false);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && !isZoomed) {
      nextImage();
    }
    if (isRightSwipe && !isZoomed) {
      prevImage();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        setIsZoomed(false);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-xs md:text-sm font-medium text-foreground">Gallery</h2>
          <span className="text-xs text-muted-foreground">
            {selectedIndex + 1} / {galleryImages.length}
          </span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-sm transition-colors"
            aria-label={isZoomed ? "Zoom Out" : "Zoom In"}
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 md:p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/30 rounded-sm transition-colors"
            aria-label="Close Gallery"
          >
            <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>
      </div>

      {/* Main Gallery Area */}
      <div className="flex-1 flex items-center justify-center p-2 md:p-4 relative overflow-hidden">
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-card/80 hover:bg-card border border-border rounded-lg text-foreground hover:text-primary transition-colors backdrop-blur-sm touch-manipulation"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-card/80 hover:bg-card border border-border rounded-lg text-foreground hover:text-primary transition-colors backdrop-blur-sm touch-manipulation"
          aria-label="Next Image"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        {/* Image Container */}
        <div className="max-w-full max-h-full flex items-center justify-center w-full">
          <div
            className={`relative transition-transform duration-300 w-full flex items-center justify-center ${
              isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {!loadedImages.has(selectedIndex) && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/50">
                <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <img
              src={assetUrl(currentImage)}
              alt={`Gallery image ${selectedIndex + 1}`}
              className={`max-w-full max-h-[calc(100vh-10rem)] md:max-h-[calc(100vh-8rem)] object-contain rounded-lg shadow-2xl ${
                loadedImages.has(selectedIndex) ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
              onLoad={() => handleImageLoad(selectedIndex)}
              onError={(e) => {
                console.error("Failed to load image:", currentImage);
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="h-20 md:h-24 bg-card border-t border-border overflow-x-auto shrink-0">
        <div className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 h-full">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setIsZoomed(false);
              }}
              className={`relative flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden border-2 transition-all touch-manipulation ${
                selectedIndex === index
                  ? "border-primary scale-110"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img
                src={assetUrl(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {selectedIndex === index && (
                <div className="absolute inset-0 bg-primary/20"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
