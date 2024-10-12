import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../services/AuthContext";
import { Navigate } from "react-router-dom";
import { getUser } from "../axios";

const ProtectedRoute = ({ element: Element }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem("auth_token");
      if (token) {
        try {
          const response = await getUser();
          setCurrentUser(response);
          setIsLoggedIn(true);
        } catch (error) {
          console.error(error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Element />;
};

export default ProtectedRoute;
