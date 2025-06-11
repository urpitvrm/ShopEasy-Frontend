import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";

function AdminOrders() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/all-orders"
      );
      if (data?.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/order-status/${orderId}`,
        {
          status: newStatus,
        }
      );
      if (data?.success) getOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const statusColors = {
    "Not Process": "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    deliverd: "bg-green-100 text-green-800",
    cancel: "bg-red-100 text-red-800",
  };

  const groupProducts = (products) => {
    const map = new Map();
    products.forEach((product) => {
      const key = product._id;
      if (map.has(key)) {
        map.get(key).qty += 1;
      } else {
        map.set(key, { ...product, qty: 1 });
      }
    });
    return Array.from(map.values());
  };

  return (
    <Layout title="All Orders - Admin">
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm md:h-screen p-3 w-auto">
          <AdminMenu />
        </div>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4 text-pink-700">
            <FaClipboardList /> All Orders
          </h1>

          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            orders.map((order, index) => {
              const grouped = groupProducts(order.products);
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md p-4 mb-6"
                >
                  <h2 className="text-lg font-semibold text-pink-600 mb-2">
                    Order #{index + 1}
                  </h2>
                  <p className="text-sm text-gray-700 mb-2">
                    Buyer:{" "}
                    <span className="font-medium">{order?.buyer?.name}</span>
                  </p>

                  <label className="text-sm text-gray-700 mb-4 block">
                    Status:
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`ml-2 px-2 py-1 rounded border ${
                        statusColors[order.status]
                      }`}
                    >
                      {[
                        "Not Process",
                        "Processing",
                        "Shipped",
                        "deliverd",
                        "cancel",
                      ].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {grouped.map((product) => (
                      <div
                        key={product._id}
                        className="border rounded-lg p-2 flex flex-col items-center"
                      >
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="w-24 h-24 object-cover mb-2 rounded"
                        />
                        <p className="text-center text-sm font-semibold text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {product.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AdminOrders;
