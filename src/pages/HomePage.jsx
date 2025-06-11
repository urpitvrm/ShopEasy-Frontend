import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import price from "../assets/price.json";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
function HomePage() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [category, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const productsPerPage = 12;
  const navigate = useNavigate();
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      if (data.success) {
        setProduct(data.products);
      } else {
        console.log("Product not found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      setCategories(data.categories);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckbox = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    setSearchParams({ page: 1 }); // reset to page 1
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/filter-product?page=${currentPage}&limit=${productsPerPage}`,
        { checked, priceRange }
      );
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (!checked.length && !priceRange) {
      getAllProduct();
    }
  }, [checked, priceRange]);

  useEffect(() => {
    if (checked.length || priceRange) {
      filterProduct();
    }
  }, [checked, priceRange, currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(product.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };
  const handleMoreDetails=(id)=>{
    navigate(`/product/details/${id}`);
  };

  return (
    <Layout title={"Home - E-commerce App"}>
      <div className="min-h-[70vh] px-4 py-10 bg-gray-50">
        <div className="flex gap-6">
          <div className="w-1/5 bg-white shadow p-4 rounded h-fit">
            <h1 className="font-semibold text-lg flex justify-center">
              Filters
            </h1>
            <div className="mt-4">
              <h2 className="text-md font-semibold mb-3 text-gray-700">
                Category
              </h2>
              {category.map((cat) => (
                <div key={cat._id} className="mb-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={cat._id}
                      checked={checked.includes(cat._id)} // controlled
                      onChange={(e) =>
                        handleCheckbox(e.target.checked, cat._id)
                      }
                      className="accent-pink-600"
                    />

                    <span className="text-sm text-gray-800">{cat.name}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h2 className="text-md font-semibold mb-3 text-gray-700">
                Price
              </h2>
              {price.map((p, index) => (
                <div key={index} className="mb-2">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={
                        JSON.stringify(priceRange) === JSON.stringify(p.array)
                      } // controlled
                      className="accent-pink-600"
                      onChange={() => {
                        setPriceRange(p.array);
                        setSearchParams({ page: 1 });
                      }}
                    />

                    <span className="text-sm text-gray-800">{p.label}</span>
                  </label>
                </div>
              ))}
              <button
                onClick={() => {
                  setPriceRange(null);
                  setChecked([]);
                  setSearchParams({ page: 1 });
                }}
                className="text-xs mt-2  text-blue-500"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {currentProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white shadow-md rounded-xl overflow-hidden p-4 w-full max-w-sm transition hover:shadow-lg"
                >
                  <img
                    src={
                      p.image ||
                      `http://localhost:8080/api/v1/product/product-photo/${p._id}`
                    }
                    alt={p.name}
                    className="w-full h-68 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-semibold text-pink-700 mb-1">
                    {p.name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-pink-600 font-bold text-lg">
                      ₹{p.price}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      className="bg-blue-500 rounded px-2 py-1 text-white"
                      onClick={() => handleMoreDetails(p._id)}
                    >
                      More Details
                    </button>
                    <button className="bg-green-700 rounded px-2 py-1 text-white"
                      onClick={() => {setCart([...cart, p])
                        console.log(cart)
                        localStorage.setItem("cart", JSON.stringify([...cart, p]))
                      toast.success("Item Added To Cart")}
                    }

                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {product.length > productsPerPage && (
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-sm"
                >
                  Previous
                </button>
                <span className="self-center text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
