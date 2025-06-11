import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState("");
const navigate=useNavigate();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product-by-id/${id}`
      );
      if (data.success) {
        setProduct(data.product);
        getCategoryName(data.product.category);
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

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return; // user clicked Cancel

      await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      navigate("/dashboard/admin/products");
    } catch (e) {
      console.log(e);
    }
  };
  

  const handleEditProduct = () => {
    try {
      navigate(`/dashboard/admin/update-product/${id}`);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    if (!product) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [product, navigate]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <main className="md:w-4/5 w-full p-6 flex flex-col items-center">
          <div className="bg-white shadow-xl rounded-2xl p-6 max-w-4xl w-full relative">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                className="w-full md:w-1/2 h-full object-cover rounded-lg border-2 border-gray-200"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-pink-700 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-semibold text-green-600">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </span>
                  </div>
                  {categoryName && (
                    <p className="mt-2 text-sm text-gray-500">
                      Category: {categoryName}
                    </p>
                  )}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                    onClick={handleEditProduct}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default SingleProduct;
