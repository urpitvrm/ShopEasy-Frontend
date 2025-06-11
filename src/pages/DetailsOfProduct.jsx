import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
function DetailsOfProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productByCategory, setProductByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product-by-id/${id}`
      );
      if (data.success) {
        setProduct(data.product);
        getCategoryName(data.product.category);
        getAllProductByCat(data.product.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryName = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category/${categoryId}`
      );
      if (data.success) {
        setCategoryName(data.category.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProductByCat = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/cat/${categoryId}`
      );
      if (data.success) {
        setProductByCategory(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (!product) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [product, navigate]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;
  const handleMoreDetails=(id)=>{
    navigate(`/product/details/${id}`);
  };
  return (
    <Layout>
      <div className="flex flex-col items-center py-10 px-4 bg-gray-50 min-h-screen">
        {/* Product Detail Card */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-8">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="w-full md:w-1/2  object-cover rounded-xl border border-gray-200"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="text-3xl font-bold text-pink-700 mb-4 flex flex-row justify-between">
                <span className="font-bold text-3xl">{product.name}</span>
                <span className="text-sm text-gray-600">
                  Left: {product.quantity}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-2xl font-semibold text-gray-600">
                  {" "}
                  Price:
                  <span className="text-2xl font-semibold text-green-600">
                    {" "}
                    ₹{product.price}
                  </span>
                </span>
                <button className="bg-green-600 px-2 py-1 rounded"
                onClick={() => {setCart([...cart, product])
                                        console.log(cart)
                                        localStorage.setItem(
                                          "cart",
                                          JSON.stringify([...cart, product])
                                        );
                                      toast.success("Item Added To Cart")}}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {productByCategory.length > 1 && (
          <div className="w-full max-w-6xl mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Related Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {productByCategory
                .filter((p) => p._id !== product._id)
                .map((p) => (
                  <div
                    key={p._id}
                    className="bg-white p-4 h-full rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200"
                    onClick={() => handleMoreDetails(p._id)}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full  object-cover rounded mb-3"
                    />
                    <div className="flex flex-row justify-between">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {p.name}
                      </h4>

                      <div className="text-green-600 font-bold">
                        Price: ₹{p.price}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
  
}

export default DetailsOfProduct;
