import React, { useState } from "react";
import Layout from "../components/Layout/Layout";

const faqData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for all unused items in original packaging with proof of purchase.",
  },
  {
    question: "Do you provide international shipping?",
    answer:
      "Yes, we ship globally. Shipping charges and delivery times vary by country.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with tracking details.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept credit/debit cards, UPI, PayPal, and net banking.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout title="FAQ - E-commerce App">
      <div className="min-h-[70vh] px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 transition"
              >
                {item.question}
                <span className="text-pink-600 text-xl font-bold">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-gray-600 border-t bg-white">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
