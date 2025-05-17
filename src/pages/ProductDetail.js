import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';

// Updated static products to match ProductList.js numerical IDs and structure
const staticProducts = [
  { 
    id: 1, 
    name: 'Samsung Galaxy S23', 
    price: 799, 
    brand: 'Samsung', 
    type: 'Phone', 
    image: 'https://xmobile.lk/wp-content/uploads/2023/09/1-5.jpg', 
    description: 'Latest Samsung flagship.',
    specs: {
      display: '6.7" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Triple Camera',
    },
  },
  { 
    id: 2, 
    name: 'iPhone 14 Pro', 
    price: 999, 
    brand: 'Apple', 
    type: 'Phone', 
    image: 'https://indigenousplus.com.au/cdn/shop/files/iphone14promaxwhite.jpg?v=1724456510', 
    description: "Apple's premium smartphone.",
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP Pro Camera System',
    },
  },
  { 
    id: 3, 
    name: 'iPad Air', 
    price: 599, 
    brand: 'Apple', 
    type: 'Tablet', 
    image: 'https://www.digicape.co.za/image/cache/catalog/_products/2024/ipad/13%20Air/iPad_Air_13_M2_WiFi_Blue_0-1000x1000.jpg', 
    description: 'Lightweight tablet for work.',
    specs: {
      display: '10.9" Liquid Retina',
      processor: 'M1 chip',
      camera: '12MP Wide camera',
    },
  },
  { 
    id: 4, 
    name: 'Samsung Galaxy Tab S8', 
    price: 699, 
    brand: 'Samsung', 
    type: 'Tablet', 
    image: 'https://xmobile.lk/wp-content/uploads/2023/09/1-7.jpg', 
    description: 'High-performance tablet.',
    specs: {
      display: '11" TFT LCD',
      processor: 'Snapdragon 8 Gen 1',
      camera: '13MP Main + 6MP Ultrawide',
    },
  },
  { 
    id: 5, 
    name: 'Google Pixel 8', 
    price: 699, 
    brand: 'Google', 
    type: 'Phone', 
    image: 'https://xmobile.lk/wp-content/uploads/2023/10/1-4.jpg', 
    description: "Google's AI-powered phone.",
    specs: {
      display: '6.3" OLED',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 12MP Ultrawide',
    },
  },
];
<br></br>
function ProductDetail() {
  // Get the ID from URL params
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  // Try both string and number matching for maximum compatibility
  // This makes the component more robust if the ID format changes
  const product = staticProducts.find(
    (p) => p.id === id || p.id === parseInt(id, 10) || p.id.toString() === id
  );

  // Debug information
  useEffect(() => {
    console.log("Product ID from URL:", id);
    console.log("Product ID type:", typeof id);
    console.log("Available products:", staticProducts);
    console.log("Found product:", product);
  }, [id, product]);

  if (!product) {
    return (
      <div className="container">
        <p className="error">Product not found (ID: {id})</p>
        <p>Please check the product ID and try again.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container product-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src={product.image}
        alt={product.name}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div>
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="product-detail-specs">
          <h3>Specifications</h3>
          <ul>
            <li>Display: {product.specs.display}</li>
            <li>Processor: {product.specs.processor}</li>
            <li>Camera: {product.specs.camera}</li>
          </ul>
        </div>
        <AnimatedButton onClick={() => addToCart(product)}>
          Add to Cart
        </AnimatedButton>
      </div>
    </motion.div>
  );
}

export default ProductDetail;