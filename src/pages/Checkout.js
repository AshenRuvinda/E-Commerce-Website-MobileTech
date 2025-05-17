import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';

function Checkout() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) {
    return (
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Checkout</h2>
        <p>
          Please <Link to="/login">login</Link> to proceed with checkout.
        </p>
      </motion.div>
    );
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/profile');
      alert('Order placed successfully!');
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Checkout</h2>
      <div className="checkout-steps">
        <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>Shipping</div>
        <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>Payment</div>
        <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>Confirmation</div>
      </div>
      <div className="checkout-form">
        {step === 1 && (
          <div>
            <h3>Shipping Information</h3>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="City, State, ZIP" required />
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Payment Details</h3>
            <input type="text" placeholder="Card Number" required />
            <div className="flex">
              <input type="text" placeholder="Expiry Date" required />
              <input type="text" placeholder="CVV" required />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}
        <div className="checkout-actions">
          {step > 1 && (
            <AnimatedButton onClick={() => setStep(step - 1)}>
              Back
            </AnimatedButton>
          )}
          <AnimatedButton onClick={handleNextStep}>
            {step === 3 ? 'Place Order' : 'Next'}
          </AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
}

export default Checkout;