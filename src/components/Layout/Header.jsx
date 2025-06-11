import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/auth";
import { Search } from "lucide-react";
import SearchInput from "../../pages/SearchInput";
import { useCart } from "../../context/cart";
import { CiShoppingCart } from "react-icons/ci";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const [cart] =useCart();
  const navigate = useNavigate();

  // console.log(auth.user);
  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");

  };
  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
    if (dropdownOpen) {
      setDropdownOpen(false);
    }
  }
  // console.log(auth.user);

  return (
    <>
      <header
        onClick={handleClick}
        className="bg-white shadow-md z-50 sticky top-0"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink
            to="/"
            className="text-xl font-bold flex items-center text-pink-800"
          >
            <FiShoppingCart className="mr-2" />
            {/* CORRECTED: Use hidden by default, then sm:inline for visibility on larger screens */}
            <span className="hidden sm:inline">ShopEasy</span>
          </NavLink>

          <SearchInput />

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pink-700 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <nav className="hidden md:flex md:space-x-6 md:items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              Home
            </NavLink>

            {!auth?.user ? (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-500"
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-700 hover:text-blue-500"
                  }
                >
                  Login
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-700 hover:text-blue-500"
                >
                  {auth.user.role === 1 ? "Admin" : "User"} ▼
                </button>

                {dropdownOpen && (
                  <div className="absolute bg-white border rounded shadow right-0 mt-2 w-40 z-10">
                    <NavLink
                      to={
                        auth.user.role === 1
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-500"
              }
            >
              <div className="relative flex items-center gap-1 text-pink-700">
                <CiShoppingCart className="text-2xl" />
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-4 flex flex-col justify-center items-center space-y-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Home
          </NavLink>

          {!auth?.user ? (
            <>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-700 hover:text-blue-500"
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <NavLink
              to={auth.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-500"
            >
              {auth.user.role === 1 ? "Admin Dashboard" : "User Dashboard"}
            </NavLink>
          )}

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-medium"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Cart(0)
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Header;
