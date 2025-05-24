import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg border-3 border-amber-500 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>

        <p className="text-justify text-gray-600">
          We’d love to hear from you! Your thoughts matter to us. Whether it’s about our customer service, products, website, or anything else you’d like to share — we’re always here to listen. Your feedback helps us grow and serve you better every day.
        </p>

        <div className="text-justify text-gray-600">
          <p>Feel free to reach out at:</p>
          <p>
            <a href="tel:+8801877507742" className="text-blue-600 hover:underline font-medium">+8801877507742</a>
          </p>
          <p>Available: 09:00 AM – 10:00 PM</p>
        </div>

        <p className="text-justify text-gray-600">
          Thank you for being with <strong>Unify Bangladesh</strong>!
        </p>
      </div>
    </div>
  );
};

export default Contact;