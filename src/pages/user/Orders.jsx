import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

function Orders() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/orders");
      if (data?.success) {
        setOrders(data.orders);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title="Orders History">
      <div className="flex flex-col md:flex-row">
        <div className="shadow-sm h-screen p-3 w-1/5">
          <UserMenu />
        </div>
        <div className="w-4/5 p-5">
          <h1 className="text-2xl font-bold text-pink-700 mb-6">Your Orders</h1>
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-lg p-5 mb-6 border"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Order #{idx + 1} | Status:{" "}
                  <span className="text-pink-600">{order.status}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(
                    order.products.reduce((acc, product) => {
                      const id = product._id;
                      if (!acc[id]) {
                        acc[id] = { ...product, quantity: 1 };
                      } else {
                        acc[id].quantity += 1;
                      }
                      return acc;
                    }, {})
                  ).map(([id, product]) => (
                    <div
                      key={id}
                      className="flex items-center bg-gray-50 p-3 rounded shadow hover:shadow-md"
                    >
                      <img
                        src={`https://shop-easy-backend-beta.vercel.app/api/v1/product/product-photo/${id}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <p className="text-md font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
