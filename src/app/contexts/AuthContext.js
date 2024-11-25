"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation instead of next/router

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // New useRouter from next/navigation

  // Load user data from localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      verifyToken(token);// Optionally, you can add user details here if available
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/verify_token/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUser({ token });
      } else {
        // Token is invalid or expired
        logout();
      }
    } catch (err) {
      console.error("Error verifying token:", err);
      logout();
    }
  };

  // Function to handle login
  const login = async (username, password) => {
    try {
      // Replace with your login API call
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setUser(data);
        setIsAuthenticated(true);
        router.push("/products");
        return { success: true };
      } else {
        // Return the status to handle it in the onFinish function
        return { success: false, status: response.status };
      }
    } catch (err) {
      console.error("Error during login:", err);
      return { success: false, error: "network" };
    }
  };
  

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
