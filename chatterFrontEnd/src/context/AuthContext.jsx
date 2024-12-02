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
          } 
          else {
            setUser(null);
            navigate("/login");
          }
        } 
        catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
          setUser(null);
          navigate("/login");
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

  const LoginUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", formData);
      
      if (response.data.data.token) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 7 });
        setUser(response.data.user);
        navigate("/");
      } else { 
        setError("Failed to log in. Please try again.");
      }
    } 
    catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid credentials. Please check your email and password.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Failed to reach the server. Please check your internet connection.");
      }
    }
  };

  const RegisterUser = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/users/registration", formData);
      
      if (response.data.data.token) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 7 });
        setUser(response.data.user);
        navigate("/");
      } else { 
        setError("Failed to log in. Please try again.");
      }
    } 
    catch (error) {
      console.error("Register error:", error.response ? error.response.data : error.message);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid credentials. Please check your email and password.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        setError("Failed to reach the server. Please check your internet connection.");
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, LoginUser, RegisterUser }}>
      {children}
    </AuthContext.Provider>
  );
};
