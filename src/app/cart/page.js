'use client';
import React, { useEffect, useState } from 'react';
import { List, Button, message } from 'antd';
import { viewCart, removeFromCart } from '@/services/api';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart data initially
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to fetch cart
  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await viewCart();
      setCart(data);
    } catch (err) {
      message.error('Failed to load cart', 2);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle item removal from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      message.success('Product removed from cart', 0.5);

      // Filter out the removed item from the cart state
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.product_id !== productId),
      }));
    } catch (error) {
      message.error('Failed to remove product from cart');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-center">Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cart && cart.items && cart.items.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={cart.items}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => handleRemoveFromCart(item.product_id)}>
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.product_name}
                description={
                  <>
                    {`x${item.quantity}`} <br />
                    {`${item.category}`} <br />
                    {`${item.price}`}
                  </>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
