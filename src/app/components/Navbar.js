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

  // Define menu items
  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: 'products',
      icon: <AppstoreOutlined />,
      label: <Link href="/products">Products</Link>,
    },
    ...(isAuthenticated
      ? [
          {
            key: 'userprofile',
            icon: <UserOutlined />,
            label: <Link href="/userprofile">Profile</Link>,
          },
          {
            key: 'cart',
            icon: <ShoppingCartOutlined />,
            label: <Link href="/cart">Cart</Link>,
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: logout,
          },
        ]
      : [
          {
            key: 'login',
            icon: <UserOutlined />,
            label: <Link href="/login">Login</Link>,
          },
          {
            key: 'register',
            icon: <UserOutlined />,
            label: <Link href="/register">Register</Link>,
          },
        ]),
  ];

  return (
    <Header>
      <div className="logo" style={{ float: 'left', color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
        <Link href="/" style={{ color: 'white' }}>E-commerce Store</Link>
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} items={menuItems} />
    </Header>
  );
};

export default Navbar;
