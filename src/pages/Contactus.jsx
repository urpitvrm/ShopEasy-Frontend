import React from "react";
import Layout from "../components/Layout/Layout";

const ContactUs = () => {
  return (
    <Layout title={"Contact Us - E-commerce App"}>
      <div className="min-h-[70vh] px-6 py-10 flex flex-col items-center text-center bg-white text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl text-base md:text-lg leading-relaxed mb-6">
          Have a question, concern, or feedback? We're here to help! Reach out
          to us anytime, and we'll get back to you as soon as possible.
        </p>
        <div className="max-w-md w-full bg-gray-100 p-6 rounded-xl shadow">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-pink-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-pink-500"
            />
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-pink-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
