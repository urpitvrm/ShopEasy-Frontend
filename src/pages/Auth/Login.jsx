


import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      toast.info("You are already logged in.");
      navigate("/");
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://shop-easy-backend-beta.vercel.app/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      alert("Error logging in. Please try again.");
      console.error(error);
    }
  };

  return (
    <Layout title="Login - E-Commerce" description="Login to your account">
      <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-pink-700">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
            >
              Login
            </button>
          </form>
          <p>
            <Link to="/forgot-password" className="text-pink-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
