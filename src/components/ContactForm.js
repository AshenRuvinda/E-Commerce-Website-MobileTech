import { useState } from 'react';
import { motion } from 'framer-motion';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setStatus('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus('Please fill in all fields.');
    }
  };

  return (
    <motion.form
      className="footer-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          required
        ></textarea>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Send Message
      </motion.button>
      {status && (
        <p className={status.includes('successfully') ? 'success' : 'error'}>
          {status}
        </p>
      )}
    </motion.form>
  );
}

export default ContactForm;