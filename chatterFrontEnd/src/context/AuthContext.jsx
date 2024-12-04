import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const getTokenFromCookies = () => {
  return Cookies.get("token");
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getTokenFromCookies();

      if (token) {
        try {
          const response = await axios.get("http://localhost:4000/api/users/check-auth", {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            },
          });
          if (response.data.user) {
            setUser(response.data.user);
            navigate("/");
          } else {
            setUser(null);
            navigate("/login");
          }
        } 
        catch (error) {
          console.log(error);
          
          // handleApiError(error);
          setUser(null);
        }
      } 
      else {
        setUser(null);
        // navigate("/login");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const handleApiError = (error) => {
    if (error.response) {
      console.error("API Response Error:", error.response);
      setError(error.response.data.message || "Failed to fetch user data");
      if (error.response.status === 401) {
        setUser(null);
        // navigate("/login");
      }
    } else if (error.request) {
      console.error("No Response Error:", error.request);
      setError("No response received from server.");
    } else {
      console.error("Request Error:", error.message);
      setError("Error while setting up the request.");
    }
  };

  const LoginUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", formData);
      
      if (response.data.data.token) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 7, secure: true });
        setUser(response.data.user);
        navigate("/");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const RegisterUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/registration", formData);
      
      if (response.data.data.token) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 7, secure: true });
        setUser(response.data.user);
        navigate("/");
      } else {
        setError("Failed to register. Please try again.");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, LoginUser, RegisterUser }}>
      {children}
    </AuthContext.Provider>
  );
};
