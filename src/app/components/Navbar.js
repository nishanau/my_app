'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HomeOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname to get current route
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const { Header } = Layout;

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Use AuthContext to determine user state
  const pathname = usePathname(); // Get the current path name
  const [selectedKey, setSelectedKey] = useState('');

  // Update selectedKey whenever the route changes
  useEffect(() => {
    if (pathname === '/') {
      setSelectedKey('home');
    } else if (pathname.startsWith('/products')) {
      setSelectedKey('products');
    } else if (pathname.startsWith('/cart')) {
      setSelectedKey('cart');
    } else if (pathname.startsWith('/userprofile')) {
      setSelectedKey('userprofile');
    } else if (pathname.startsWith('/login')) {
      setSelectedKey('login');
    } else if (pathname.startsWith('/register')) {
      setSelectedKey('register');
    } else {
      setSelectedKey(''); // Clear the selection if no match
    }
  }, [pathname]);

  return (
    <Header>
      <div className="logo" style={{ float: 'left', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link href="/" style={{ color: 'white' }}>E-commerce Store</Link>
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<AppstoreOutlined />}>
          <Link href="/products">Products</Link>
        </Menu.Item>

        {isAuthenticated ? (
          <>
            <Menu.Item key="userprofile" icon={<UserOutlined />}>
              <Link href="/userprofile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
              <Link href="/cart">Cart</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login" icon={<UserOutlined />}>
              <Link href="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<UserOutlined />}>
              <Link href="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
