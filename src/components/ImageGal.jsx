import React, { useState, useEffect } from 'react';
import { ImageGallery } from 'react-image-grid-gallery';
import { IMAGE_PATHS } from '../constants/images.js';

const ImageGal = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (Array.isArray(IMAGE_PATHS)) {
      console.log('IMAGE_PATHS:', IMAGE_PATHS); // Debugging line

      const formattedImages = IMAGE_PATHS.map(image => ({
        src: image.src,
        alt: image.alt,
        caption: image.caption // Use the caption provided
      }));

      console.log('Formatted Images:', formattedImages); // Debugging line

      setImageList(formattedImages);
    } else {
      console.error('IMAGE_PATHS is not an array');
    }
  }, []);

  if (!Array.isArray(imageList) || imageList.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary mb-6 text-center">Image Gallery</h1>
      {imageList && imageList.length > 0 && (
        <ImageGallery
          imagesInfoArray={imageList}
          columnCount={"auto"}
          columnWidth={230}
          gapSize={24}
        />
      )}
    </div>
  );
};

export default ImageGal;
