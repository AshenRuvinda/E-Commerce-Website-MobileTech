import { motion } from 'framer-motion';

function AnimatedButton({ children, onClick, className }) {
  return (
    <motion.button
      onClick={onClick}
      className={`animated-button ${className || ''}`}
      whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
}

export default AnimatedButton;