import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    src: 'https://r3.whistleout.ca/public/images/articles/2024/05/Pixel-8a-HERO.png',
    alt: 'img1',
  },
  {
    src: 'https://api.cellphoneage.com/Upload/Article/20220127/d115d06981b842e79e6d0e4135767eb4.jpg',
    alt: 'img2',
  },
  {
    src: 'https://www.nh-hotels.com/nhpro/assets/uploads/2018/03/1000x400_2-1.png',
    alt: 'img3',
  },
  {
    src: 'https://joburg.co.za/wp-content/uploads/2025/02/Untitled.png',
    alt: 'img4',
  },
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
  
    // Auto-cycle every 5 seconds
    useEffect(() => {
      if (isPaused) return;
  
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, [isPaused]);
  
    // Handle dot click
    const handleDotClick = (index) => {
      setCurrentIndex(index);
    };
  
    return (
      <div
        className="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="carousel-image"
            custom={currentIndex}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </AnimatePresence>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }
  
  export default Carousel;