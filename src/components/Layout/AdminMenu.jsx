import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Users } from "lucide-react";
import { FaClipboardList } from "react-icons/fa"; // Clipboard order list

function AdminMenu() {
  const getLinkClass = ({ isActive }) =>
    `${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-400"
    } 
     flex items-center gap-2 p-3 rounded-lg font-medium`;

  return (
    <div className="p-5 rounded-2xl w-full max-w-sm">
      <nav className="flex flex-col md:space-y-2">
        <NavLink
          to="/dashboard/admin"
          className="flex items-center gap-2 p-3 rounded-lg font-medium text-gray-700"
        >
          <LayoutDashboard className="w-5 h-5" />
          Admin Dashboard
        </NavLink>
        <NavLink to="/dashboard/admin/create-category" className={getLinkClass}>
          <PlusCircle className="w-5 h-5" />
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/orders" className={getLinkClass}>
          <FaClipboardList className="w-5 h-5" />
          Orders
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className={getLinkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className={getLinkClass}>
          <LayoutDashboard className="w-5 h-5" />
          Products
        </NavLink>

        <NavLink to="/dashboard/admin/users" className={getLinkClass}>
          <Users className="w-5 h-5" />
          Users
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminMenu;
