// import React from "react";
// import Layout from "../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// function Cart() {
//   const [cart, setCart] = useCart();
//   const {auth} = useAuth();
//   const navigate = useNavigate();
//   const groupedCart = cart.reduce((acc, item) => {
//     if (!acc[item.name]) {
//       acc[item.name] = { ...item, quantity: 1 };
//     } else {
//       acc[item.name].quantity += 1;
//     }
//     return acc;
//   }, {});

//   const groupedItems = Object.values(groupedCart);

//   const updateQuantity = (name, type) => {
//     const newCart = [...cart];
//     const index = newCart.findIndex((item) => item.name === name);

//     if (type === "increment") {
//       if (index !== -1) newCart.push({ ...newCart[index] });
//     } else if (type === "decrement") {
//       const itemIndex = newCart.findIndex((item) => item.name === name);
//       if (itemIndex !== -1) newCart.splice(itemIndex, 1);
//     }

//     setCart(newCart);
//     localStorage.setItem("cart", JSON.stringify(newCart));
//   };
  

//   const totalItems = groupedItems.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = groupedItems.reduce(
//     (sum, item) => sum + item.quantity * item.price,
//     0
//   );

//   const handlePlaceOrder = () => {
//     alert("Order placed successfully!");
//     setCart([]);
//   };

//   return (
//     <Layout>
//       <div className="p-4 md:flex md:justify-between">
//         {/* Cart Items */}
//         {auth?.token ? (
//           <div className="md:w-2/3">
//             {groupedItems.length > 0 ? (
//               <div>
//                 <h2 className="text-2xl font-semibold mb-6 text-pink-700">
//                   Your Cart
//                 </h2>
//                 <ul className="space-y-4">
//                   {groupedItems.map((item, index) => (
//                     <li
//                       key={index}
//                       className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center"
//                     >
//                       <div className="flex items-center"
//                         onClick={() => {
//                           navigate(`/product/details/${item._id}`);
//                         }}
//                       >
//                         <img
//                           src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
//                           alt={item.name}
//                           className="w-16 h-16 object-cover rounded-md mr-4"
//                         />
//                         <div>
//                           <h3 className="text-lg font-bold text-gray-800">
//                             {item.name}
//                           </h3>
//                           <p className="text-sm text-gray-600">
//                             <span>
//                               {" "}
//                               ₹{item.price} * {item.quantity}
//                             </span>
//                             = ₹{item.price * item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           className=" text-black px-2 text-lg font-bold border-2"
//                           onClick={() => updateQuantity(item.name, "decrement")}
//                         >
//                           -
//                         </button>
//                         <span className=" text-black px-2 text-lg font-bold border-2">
//                           {item.quantity}
//                         </span>
//                         <button
//                           className=" text-black px-2 text-lg font-bold border-2"
//                           onClick={() => updateQuantity(item.name, "increment")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p className="text-gray-500 text-center mt-10">
//                 Your cart is empty.
//               </p>
//             )}
//           </div>
//         ) : (
//           <div>
//             {auth?.user?.name} Please Login to see your Cart you have{" "}
//             {cart.length} items in your cart
//           </div>
//         )}

//         {/* Summary */}
//         {groupedItems.length > 0 && (
//           <div className="md:w-1/3 mt-8 md:mt-0 md:ml-6 fixed top-22 right-1">
//             <div className="bg-white shadow-lg rounded-xl p-6">
//               <h3 className="text-xl font-semibold text-pink-700 mb-4">
//                 Order Summary
//               </h3>
//               <div className="flex justify-between mb-2">
//                 <span>Total Items:</span>
//                 <span>{totalItems}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg text-pink-600 mb-6">
//                 <span>Total Price:</span>
//                 <span>₹{totalPrice}</span>
//               </div>
//               <button
//                 onClick={handlePlaceOrder}
//                 className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
//               >
//                 Place Order
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// export default Cart;


import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { ...item, quantity: 1 };
    } else {
      acc[item.name].quantity += 1;
    }
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);

  const updateQuantity = (name, type) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.name === name);

    if (type === "increment") {
      if (index !== -1) newCart.push({ ...newCart[index] });
    } else if (type === "decrement") {
      const itemIndex = newCart.findIndex((item) => item.name === name);
      if (itemIndex !== -1) newCart.splice(itemIndex, 1);
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const totalItems = groupedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = groupedItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const productIds = cart.map((item) => item._id);
      const { data } = await axios.post("http://localhost:8080/api/v1/order", {
        products: productIds,
        payment: {
          success: true,
          amount: totalPrice,
        },
      });
      if (data?.success) {
        toast.success("Order placed successfully");
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="p-4 md:flex md:justify-between">
        {auth?.token ? (
          <div className="md:w-2/3">
            {groupedItems.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-pink-700">
                  Your Cart
                </h2>
                <ul className="space-y-4">
                  {groupedItems.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white shadow-md p-4 rounded-xl flex justify-between items-center"
                    >
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => {
                          navigate(`/product/details/${item._id}`);
                        }}
                      >
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} × {item.quantity} = ₹
                            {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-black px-2 text-lg font-bold border-2"
                          onClick={() => updateQuantity(item.name, "decrement")}
                        >
                          -
                        </button>
                        <span className="text-black px-2 text-lg font-bold border-2">
                          {item.quantity}
                        </span>
                        <button
                          className="text-black px-2 text-lg font-bold border-2"
                          onClick={() => updateQuantity(item.name, "increment")}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Your cart is empty.
              </p>
            )}
          </div>
        ) : (
          <div>
            {auth?.user?.name}, please login to view your cart. You have{" "}
            {cart.length} items in your cart.
          </div>
        )}

        {groupedItems.length > 0 && (
          <div className="md:w-1/3 mt-8 md:mt-0 md:ml-6 fixed top-22 right-1">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-pink-600 mb-6">
                <span>Total Price:</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
