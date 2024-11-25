// src/app/register/page.js
'use client'
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { register } from '@/services/api';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  // Function called when the form is successfully submitted
  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    try {
      await register(values);
      message.success('Registration successful! You can now log in.');
      setLoading(false);
    } catch (error) {
      message.error('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  // Function called when the form fails to submit
  const onFinishFailed = (errorInfo) => {
    message.error('Please fill all required fields correctly.');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Register</h1>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
