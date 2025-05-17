import { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import VanillaTilt from 'vanilla-tilt';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 20,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }

    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      className="product-card"
      ref={cardRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={product.image || 'https://via.placeholder.com/150'}
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>
      <div className="product-card-actions">
        <Link to={`/product/${product.id}`}>View Details</Link>
        <motion.button
          onClick={() => addToCart(product)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductCard;