import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import AuthContext from "./services/AuthContext";
import Navbar from "./components/Navbar";
import { getUser } from "./axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const storedToken = sessionStorage.getItem("auth_token");
    if (storedToken) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}

export default App;
