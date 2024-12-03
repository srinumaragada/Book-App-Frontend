import React from "react";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Cart Page",
    path: "/cart",
  },
  {
    name: "Check out",
    path: "/checkout",
  },
];
function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const {currentUser, logout} = useAuth()
    
    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');

  return (
    <header className="flex justify-around gap-96 items-center my-2">
      <nav className="flex justify-center gap-3">
        <div>
          <Link to="/">
            <HiMiniBars3CenterLeft className=" size-6 mt-2" />
          </Link>
        </div>
        <div className="relative sm:w-72 w-40 space-x-2 space-y-1">
          <IoSearch className="absolute inline-block inset-y-3 left-3" />
          <input
            type="text"
            placeholder="Search here.."
            className="bg-[#EAEAEA] w-full py-1 focus:outline-none md:px-6  px-8 rounded-md"
          />
        </div>
      </nav>
      <div className="flex justify-center mt-3 gap-6">
        <div>
          {currentUser ? (
            <>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  src="/src/assets/avatar.png"
                  alt=""
                  className={`size-7 rounded-full ${
                    currentUser ? "ring-2 ring-blue-500" : ""
                  }`}
                />
              </button>
              {/* show dropdowns */}
              {isOpen && (
                <div className="absolute  mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => setIsOpen(false)}
                      >
                        <Link
                          to={item.path}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : token ? (
            <Link to="/dashboard" className="border-b-2 border-primary">
              Dashboard
            </Link>
          ) : (
            <Link to="/login">
              {" "}
              <FaRegUser className="size-6" />
            </Link>
          )}
        </div>
        <button className="hidden sm:block">
          <FaRegHeart />
        </button>
        {cartItems && cartItems.length > 0 ? (
          <Link
            to="/basket"
            className="flex items-center gap-2 bg-[#ffeb33] mt-[-5px] px-4 rounded-md"
          >
            <FiShoppingCart />
            <span className="ml-[-3px]">{cartItems.length}</span>
          </Link>
        ) : (
          <Link
            to="/basket"
            className="flex items-center gap-2 bg-[#ffeb33] mt-[-5px] px-4 rounded-md"
          >
            <FiShoppingCart />
            <span className="ml-[-3px]">0</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
