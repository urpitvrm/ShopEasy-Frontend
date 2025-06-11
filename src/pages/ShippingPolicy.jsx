import React from "react";
import Layout from "../components/Layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout title={"Shipping Policy - E-commerce App"}>
      <div className="min-h-[70vh] px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Shipping Policy
        </h1>
        <div className="max-w-4xl mx-auto text-base md:text-lg space-y-4">
          <p>
            At <span className="font-semibold text-pink-700">E-Commerce</span>,
            we aim to deliver your products quickly and safely.
          </p>
          <h2 className="text-xl font-semibold text-gray-700">
            Shipping Duration
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Orders are typically processed within 1–2 business days.</li>
            <li>Delivery time within India: 3–7 business days.</li>
            <li>International shipping: 7–14 business days.</li>
          </ul>
          <h2 className="text-xl font-semibold text-gray-700">
            Shipping Charges
          </h2>
          <p>
            Shipping is free for orders above ₹999. Orders below that will incur
            a flat ₹49 shipping charge.
          </p>
          <h2 className="text-xl font-semibold text-gray-700">
            Order Tracking
          </h2>
          <p>
            Once shipped, you will receive a tracking number via email/SMS. You
            can also track your order in your account.
          </p>
          <h2 className="text-xl font-semibold text-gray-700">
            International Shipping
          </h2>
          <p>
            We ship to many countries globally. Shipping charges, taxes, and
            customs duties (if any) are the responsibility of the customer.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
