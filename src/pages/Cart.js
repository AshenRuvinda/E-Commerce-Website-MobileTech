import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Your Cart</h2>
        <p>
          Your cart is empty. <Link to="/products">Shop now</Link>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Your Cart</h2>
      <div>
        {cart.map((item) => (
          <motion.div
            key={item.id}
            className="cart-item"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
              <div className="cart-item-controls">
                <AnimatedButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </AnimatedButton>
                <span>{item.quantity}</span>
                <AnimatedButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </AnimatedButton>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="cart-total"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>Total: ${total.toFixed(2)}</p>
        <Link to="/checkout">
          <AnimatedButton>Proceed to Checkout</AnimatedButton>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default Cart;