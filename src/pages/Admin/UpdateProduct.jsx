import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cat, setCat] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://shop-easy-backend-beta.vercel.app/api/v1/product/get-product-by-id/${id}`
        );
        if (data.success) {
          const { name, description, price, quantity, category, photo } =
            data.product;
          setName(name);
          setDescription(description);
          setPrice(price);
          setQuantity(quantity);
          setCategory(category._id);
          setExistingPhoto(photo);
        }
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };

    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(
          "https://shop-easy-backend-beta.vercel.app/api/v1/category/get-category"
        );
        const sorted = data.categories.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCat(sorted);
      } catch (e) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchProduct();
    getAllCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedData = new FormData();
      updatedData.append("name", name);
      updatedData.append("description", description);
      updatedData.append("price", price);
      updatedData.append("category", category);
      updatedData.append("quantity", quantity);
      if (photo) updatedData.append("photo", photo);
  
      const { data } = await axios.put(
        `https://shop-easy-backend-beta.vercel.app/api/v1/product/update-product/${id}`,
        updatedData
      );
  
      if (data.success) {
        toast.success("Product updated successfully");
        navigate(`/dashboard/admin/product-by-id/${id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating product");
    }
  };
  

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
                  <AdminMenu />
                </div>
        <div className="flex-grow px-4 py-6 overflow-y-auto max-h-[650px]">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Update Product
          </h1>

          <form
            onSubmit={handleUpdate}
            className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4"
          >
            <div>
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product name"
                value={name}
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
                value={price}
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
                <option value="">Select category</option>
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Description:</label>
              <textarea
                className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter product description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {
              <div className="text-center">
                <img
                  src={
                   
                       `https://shop-easy-backend-beta.vercel.app/api/v1/product/product-photo/${id}`
                  }
                  alt="product"
                  className="mx-auto h-40 object-contain"
                />
              </div>
            }

            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Product Image:
              </label>
              <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
