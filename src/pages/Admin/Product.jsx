
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "https://shop-easy-backend-beta.vercel.app/api/v1/product/get-product"
      );
      if (data.success) {
        setProducts(data.products);
      } else {
        console.log("Products not found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleOnClick = (id) => {
    navigate(`/dashboard/admin/product-by-id/${id}`);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <main className="flex-1 p-4 ">
          <div className="flex flex-wrap justify-center gap-6 overflow-x-auto max-h-160">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => handleOnClick(p._id)}
                className="cursor-pointer bg-gray-50 shadow rounded-2xl overflow-hidden p-4 w-full sm:w-[47%] md:w-[31%] xl:w-[23%] transition hover:shadow-lg"
              >
                <img
                  src={`https://shop-easy-backend-beta.vercel.app/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="w-86 h-48 object-cover rounded-md mb-3 border-4"
                />
                <div className="mt-4 font-semibold mb-1 flex justify-between">
                  <h2 className="text-lg font-semibold text-pink-700 mb-1">
                    {p.name}
                  </h2>
                  <p className="text-pink-600 font-bold text-lg">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Product;
