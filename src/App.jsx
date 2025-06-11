import React from 'react'
import Layout from './components/Layout/Layout'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContactUs from './pages/Contactus';
import Faq from './pages/Faq';
import ShippingPolicy from './pages/ShippingPolicy';
import Tos from './pages/Tos';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import AllUser from './pages/Admin/AllUser';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import SingleProduct from './pages/Admin/SingleProduct';
import UpdateProduct from './pages/Admin/UpdateProduct';
import DetailsOfProduct from './pages/DetailsOfProduct';
import SearchedProduct from './pages/SearchedProduct';
import Cart from './pages/Cart';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:keyword" element={<SearchedProduct />} />
        
        <Route path="/cart" element={<Cart />}/>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />

          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/update-product/:id" element={<UpdateProduct />} />
          
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route
            path="/dashboard/admin/product-by-id/:id"
            element={<SingleProduct />}
          />

          <Route path="admin/users" element={<AllUser />} />
        </Route>
        <Route path="product/details/:id" element={<DetailsOfProduct />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/shipping" element={<ShippingPolicy />} />
        <Route path="/terms" element={<Tos />} />
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App