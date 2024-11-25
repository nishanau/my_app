"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, message, Button, Rate, InputNumber } from "antd";
import { getProducts, addToCart } from "@/services/api";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);

        // Initialize quantities for each product
        const initialQuantities = {};
        data.forEach((product) => {
          initialQuantities[product.id] = 1; // Default quantity is 1
        });
        setQuantities(initialQuantities);

        setLoading(false);
      } catch (err) {
        message.error("Failed to load products", 0.5);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const quantity = quantities[productId];
      await addToCart(productId, quantity); // Include quantity in API call
      message.success("Product added to cart", 0.5);
    } catch (error) {
      message.error("Failed to add product to cart");
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-center">Products</h2>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              loading={loading}
              hoverable
              style={{ width: "100%" }}
              cover={
                <img
                  alt={product.name}
                  // src={product.images.length > 0 ? product.images[0].image : '/placeholder-image.png'}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              actions={[
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <InputNumber
                    min={1}
                    max={product.stock}
                    value={quantities[product.id]}
                    onChange={(value) =>
                      handleQuantityChange(product.id, value)
                    }
                    style={{ width: "60px" }}
                  />
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="middle"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </div>,
              ]}
            >
              <Meta
                title={product.name}
                description={
                  <>
                    <p style={{ margin: 0 }}>{product.category_name}</p>
                    <p style={{ margin: 0 }}>Price: ${product.price}</p>
                    <p style={{ margin: 0 }}>Stock: {product.stock}</p>
                    <div style={{ marginTop: '8px' }}>
                      <Rate
                        disabled
                        value={product.average_rating}
                        allowHalf
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListPage;
