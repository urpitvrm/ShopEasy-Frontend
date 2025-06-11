import React, { Profiler } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListOrdered, PlusCircle, User, Users } from "lucide-react";

function UserMenu() {
  const getLinkClass = ({ isActive }) =>
    `${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-400"
    } 
     flex items-center gap-2 p-3 rounded-lg font-medium`;

  return (
    <div className="p-5 rounded-2xl w-full max-w-sm">
      <nav className="flex flex-col space-y-2">
        <NavLink to="/dashboard/user" className={getLinkClass}>
          <LayoutDashboard className="w-5 h-5" />
          User Dashboard
        </NavLink>

        <NavLink to="/dashboard/user/orders" className={getLinkClass}>
          <ListOrdered className="w-5 h-5" />
          Orders History
        </NavLink>

       
      </nav>
    </div>
  );
}

export default UserMenu;
