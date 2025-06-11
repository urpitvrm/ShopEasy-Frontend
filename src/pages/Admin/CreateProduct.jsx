


import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function CreateProduct() {
  const [cat, setCat] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate=useNavigate()
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      const sorted = data.categories.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCat(sorted);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        navigate("/dashboard/admin/products")
        toast.success("Product created successfully");
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while creating product");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <div className="overflow-x-auto max-h-[650px] flex-grow px-4 py-6">
          <h1 className="font-semibold text-2xl text-center mb-6">
            Create Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 flex justify-between">
                <span>Price:</span>
                <span>In Rs./-</span>
              </label>
              <input
                type="number"
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Category:</label>
              <select
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Select category</option>
                {cat.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Quantity:</label>
              <input
                type="number"
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product description"
                rows="2"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height="200px"
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Product Image:
              </label>
              <div className="flex items-center gap-4">
                <label className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;
