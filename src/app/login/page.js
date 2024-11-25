"use client";
import React, { useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // Use login from AuthContext

  // Function called when the form is successfully submitted
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Use the login function from the context
      const result = await login(values.username, values.password);
  
      if (result.success) {
        message.success("Login successful!", 1 );
      } else {
        // Handle specific status codes returned by login
        switch (result.status) {
          case 400:
            message.error("Username and password are required.");
            break;
          case 401:
            message.error("Invalid username or password.");
            break;
          default:
            message.error("An unexpected error occurred. Please try again.");
        }
      }
    } catch (err) {
      // Handle unexpected network errors
      if (err.error === "network") {
        message.error("No response from the server. Please try again later.");
      } else {
        message.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2 className="text-center">Login</h2>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
