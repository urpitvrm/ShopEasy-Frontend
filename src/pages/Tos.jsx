import React from "react";
import Layout from "../components/Layout/Layout";

const Tos = () => {
  return (
    <Layout title={"Terms of Service - E-commerce App"}>
      <div className="min-h-[70vh] px-6 py-10 bg-white text-gray-800">
        <h1 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Terms of Service
        </h1>
        <div className="max-w-4xl mx-auto text-base md:text-lg space-y-4">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-pink-700">E-Commerce</span>. By
            accessing or using our services, you agree to the terms and
            conditions outlined below.
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            1. User Agreement
          </h2>
          <p>
            You agree to use the platform only for lawful purposes and to comply
            with all applicable laws and regulations.
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            2. Product Information
          </h2>
          <p>
            We strive to ensure accuracy in product descriptions, pricing, and
            availability. Errors may occasionally occur and we reserve the right
            to correct them.
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            3. Account Responsibility
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. Notify us immediately of any unauthorized use.
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            4. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your access to our
            services at any time without prior notice if any terms are violated.
          </p>

          <h2 className="text-xl font-semibold text-gray-700">
            5. Changes to Terms
          </h2>
          <p>
            These terms may be updated from time to time. Continued use of the
            site means you accept the revised terms.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Tos;
