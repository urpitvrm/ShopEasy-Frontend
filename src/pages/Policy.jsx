import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - E-commerce App"}>
      <div className="min-h-[70vh] px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4 text-center">
          Privacy Policy
        </h1>
        <div className="max-w-3xl mx-auto text-left text-base md:text-lg leading-relaxed space-y-4">
          <p>
            We value your privacy and are committed to protecting your personal
            information. This policy outlines how we collect, use, and safeguard
            your data.
          </p>
          <p>
            <strong>1. Data Collection:</strong> We collect data such as name,
            email, and address to provide better service and ensure smooth order
            processing.
          </p>
          <p>
            <strong>2. Usage:</strong> The collected data is used solely for
            communication, order tracking, and personalization.
          </p>
          <p>
            <strong>3. Security:</strong> We implement strict security measures
            to protect your data from unauthorized access.
          </p>
          <p>
            <strong>4. Sharing:</strong> We do not sell or share your
            information with third parties except for order fulfillment
            purposes.
          </p>
          <p>
            <strong>5. Updates:</strong> Our privacy policy may be updated
            occasionally. Any changes will be reflected on this page.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
