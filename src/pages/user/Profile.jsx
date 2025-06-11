import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://shop-easy-backend-beta.vercel.app/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        const localStorageAuth = JSON.parse(localStorage.getItem("auth"));
        localStorageAuth.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(localStorageAuth));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="flex flex-col md:flex-row p-4">
        <div className="shadow-sm sm:h-70 md:h-screen p-3 w-auto">
          <UserMenu />
        </div>
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="border border-gray-300 rounded-md shadow-md p-6 w-full max-w-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
              User Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter your name"
                autoFocus
              />
              <input
                type="email"
                value={email}
                disabled
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter new password"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter your phone"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Enter your address"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
