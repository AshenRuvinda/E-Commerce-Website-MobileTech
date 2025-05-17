import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from '../components/Carousel';

function Home() {
  return (
    <main className="home">
        <br></br>
      <Carousel />
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to MobileTech 2030
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the future of smartphones with holographic displays and AI-driven performance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </motion.div>
      </section>
      <section className="features">
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Holographic Displays</h3>
          <p>Experience visuals like never before with 3D holographic technology.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>AI-Driven Performance</h3>
          <p>Smartphones that adapt and optimize for your needs in real-time.</p>
        </motion.div>
        <motion.div
          className="feature-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Drone Delivery</h3>
          <p>Get your phone delivered to your doorstep in minutes.</p>
        </motion.div>
      </section>
    </main>
  );
}

export default Home;