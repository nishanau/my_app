// services/api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Update this URL as needed

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Register API call
export const register = async ({ username, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToCart = async (productId, quantity = 1) => {

  try {
    const response = await axios.post(
      `${API_URL}/cart/add_to_cart/`,
      { product_id: productId, quantity:quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeFromCart = async (productId) => {
  try {
  
    const response = await axios.post(
      `${API_URL}/cart/remove_from_cart/`,
      { product_id: productId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const viewCart = async () => {
  try {
    const response = await axios.get(`${API_URL}/cart/view_cart/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
