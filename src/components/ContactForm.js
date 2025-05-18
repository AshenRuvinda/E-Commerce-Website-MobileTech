import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

function ContactForm() {
  const [state, handleSubmit] = useForm("mnndwwzo");

  if (state.succeeded) {
    return (
      <motion.div
        className="text-green-600 text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Thanks for contacting us! We'll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-semibold">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="block mb-1 font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Your message"
          rows="4"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <motion.button
        type="submit"
        disabled={state.submitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
}

export default ContactForm;
