import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search"; 
import { useNavigate } from "react-router-dom";
function SearchedProduct() {
  const [values] = useSearch(); 
  const navigate = useNavigate();
  const handleMoreDetails = (id) => {
    navigate(`/product/details/${id}`);
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {values.keyword && (
          <p className="text-center text-gray-600 mb-6">
            Showing results for: "{values.keyword}"
          </p>
        )}

        {values.results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {values.results.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-xl overflow-hidden p-4 transition hover:shadow-lg flex flex-col"
              >
                <img
                  src={
                    product.image ||
                    `https://shop-easy-backend-beta.vercel.app/api/v1/product/product-photo/${product._id}`
                  }
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-pink-700 mb-1">
                  {product.name}
                </h2>

                <div className="mt-auto flex justify-between items-center pt-2">
                  {" "}
                  <span className="text-pink-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <button
                    className="bg-blue-500 rounded px-2 py-1 text-white"
                    onClick={() => handleMoreDetails(product._id)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">
            {values.keyword
              ? `No products found for "${values.keyword}".`
              : "Start searching for products!"}
          </p>
        )}
      </div>
    </Layout>
  );
}

export default SearchedProduct;
