import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-500 p-4">
      <div className="flex justify-center items-center mb-2">
        <p className="text-white text-center text-sm sm:text-base">
          © 2025 Ecommerce App. All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm sm:text-base text-white text-center">
        <Link to="/policy" className="hover:text-blue-300">
          Privacy Policy
        </Link>
        
        <Link to="/terms" className="hover:text-blue-300">
          Terms of Service
        </Link>
        
        <Link to="/contact" className="hover:text-blue-300">
          Contact Us
        </Link>
        
        <Link to="/about" className="hover:text-blue-300">
          About Us
        </Link>
        
        <Link to="/faq" className="hover:text-blue-300">
          FAQ
        </Link>
        
        <Link to="/shipping" className="hover:text-blue-300">
          Shipping Policy
        </Link>
      </div>
    </div>
  );
}

export default Footer;
