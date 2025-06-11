
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://shop-easy-backend-beta.vercel.app/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create or update category
  const handleCreateCategory = async () => {
    try {
      if (!category.trim()) {
        return toast.error("Category name cannot be empty");
      }

      if (editingId) {
        const { data } = await axios.put(
          `https://shop-easy-backend-beta.vercel.app/api/v1/category/update-category/${editingId}`,
          { name: category }
        );
        if (data?.success) {
          toast.success("Category updated successfully");
          setEditingId(null);
          setCategory("");
          getAllCategory();
        } else {
          toast.error(data?.message || "Failed to update category");
        }
      } else {
        const { data } = await axios.post(
          "https://shop-easy-backend-beta.vercel.app/api/v1/category/create-category",
          { name: category }
        );
        if (data?.success) {
          toast.success("Category created successfully");
          setCategory("");
          getAllCategory();
        } else {
          toast.error(data?.message || "Failed to create category");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://shop-easy-backend-beta.vercel.app/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting category");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm sm:h-70  md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Manage Categories
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                className="flex-1 min-w-[200px] px-4 py-2 rounded border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <button
                onClick={handleCreateCategory}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {editingId ? "Update" : "Submit"}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[500px] border rounded-lg shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3 border-b">Category Name</th>
                  <th className="px-6 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{c.name}</td>
                    <td className="px-6 py-4 border-b space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => {
                          setCategory(c.name);
                          setEditingId(c._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeleteCategory(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="2" className="text-center py-4 text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
