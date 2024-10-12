import React, { useContext } from "react";

import AuthContext from "../services/AuthContext";
import { Link } from "react-router-dom";
import { breezeClient } from "../axios";

const Navbar = () => {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await breezeClient.post("/logout");
    sessionStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/posts" className="text-white text-xl font-bold">
          MyApp
        </Link>
        <div>
          {isLoggedIn ? (
            <>
              <span className="text-white mr-4">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
