import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About - E-commerce App"}>
      <div className="min-h-[70vh] px-6 py-10 flex flex-col items-center text-center bg-white text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
          About Us
        </h1>
        <p className="max-w-3xl text-base md:text-lg leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-pink-700">E-Commerce</span>, your
          one-stop destination for all your shopping needs. We offer a wide
          variety of high-quality products at competitive prices, with a
          seamless and secure shopping experience. Our mission is to provide
          value, convenience, and satisfaction to every customer through fast
          delivery, easy returns, and excellent support.
        </p>
        <div className="mt-6 max-w-4xl text-left">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Vast range of top-quality products</li>
            <li>Secure and fast checkout process</li>
            <li>Customer-first return and refund policy</li>
            <li>24/7 dedicated customer support</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
