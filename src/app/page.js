// app/page.js
'use client'
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Card } from 'antd';
import { getProducts } from '../services/api';
import Link from 'next/link';
import ProductListPage from './products/page';

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a73e8, #4285f4)',
          padding: '80px 20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Title style={{ color: 'white' }}>Welcome to Our Shop</Title>
        <Paragraph style={{ fontSize: '1.2rem' }}>
          Discover the best products at unbeatable prices.
        </Paragraph>
        <Link href="/products" passHref>
          <Button type="primary" size="large">
            Shop Now
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <Title level={2}>Why Shop With Us?</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Title level={4}>Wide Variety</Title>
              <Paragraph>
                Choose from a wide range of quality products to meet your needs.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Title level={4}>Affordable Prices</Title>
              <Paragraph>
                Get the best deals on the products you love at competitive prices.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card bordered={false}>
              <Title level={4}>Fast Delivery</Title>
              <Paragraph>
                Enjoy fast and reliable delivery right to your doorstep.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Featured Products Section */}
      <div style={{ padding: '50px 20px', textAlign: 'center' }}>
        <Title level={2}>Featured Products</Title>
        <Row gutter={[16, 16]}>
          {loading ? (
            <Paragraph>Loading products...</Paragraph>
          ) : (
            <ProductListPage />
          )}
        </Row>
      </div>
    </div>
  );
}
