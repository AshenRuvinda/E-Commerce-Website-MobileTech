import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div
      className="container form-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Contact Us</h2>
      <ContactForm />
    </motion.div>
  );
}

export default Contact;