import React from "react";

function Card({ product }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden p-4 w-full max-w-sm transition hover:shadow-lg">
      <img
        src={
          product.image ||
          `https://shop-easy-backend-beta.vercel.app/api/v1/product/product-photo/${product._id}`
        }
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-pink-700 mb-1">
        {product.name}
      </h2>
      {/* <p className="text-gray-600 mb-2">{product.description}</p> */}
      <div className="flex justify-between items-center">
        <span className="text-pink-600 font-bold text-lg">
          ₹{product.price}
        </span>
        {/* <span className="text-sm text-gray-500">Qty: {product.quantity}</span> */}
      </div>
      <div className="flex justify-between">
        {" "}
        <button className="bg-blue-500 rounded px-2 py-1 text-white">More Details</button>
        <button className="bg-green-700 rounded px-2 py-1 text-white">Add To Card</button>
      </div>
    </div>
  );
}

export default Card;
