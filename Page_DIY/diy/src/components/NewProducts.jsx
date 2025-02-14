import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/NewProducts.css';

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderImage = '/path/to/placeholder.jpg';


  useEffect(() => {

    const fetchShopsAndProducts = async () => {
      try {
        const shopResponse = await axios.get('/api/v1/shops');
        console.log(shopResponse.data);
        const shopIds = shopResponse.data.map(shop => shop.shop_id);

        const productPromises = shopIds.map(shopId =>
          axios.get(`/api/v1/products?shop_id=${shopId}&sort=create_at&order=desc&limit=1`)
        );

        const productResponses = await Promise.all(productPromises);
      
        const newProducts = productResponses
        .map(response => response.data.items[0])
        .filter(Boolean);

        setProducts(newProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops or products:', error);
        setLoading(false);
      }
    };

    fetchShopsAndProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="my-5">
      <div className="table-new">
        <th className="col-new">
          <h4>สินค้ามาใหม่</h4>
        </th>
      </div>
      <Row className="d-flex flex-wrap justify-content-center">
        {products.map((product) => {
          const primaryImage = product.images.find((img) => img.is_primary)?.image_url || placeholderImage;

          return (
            <Col key={product.id} className="d-flex justify-content-center newproduct-card">
              <Card className="mb-4 newproducts-card" style={{ width: '100%', height: 'auto' }}>
                <Link to={`product/detail/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Card.Img
                    variant="top"
                    src={primaryImage}
                    alt={product?.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="text-truncate" style={{ fontSize: '20px', color: 'black' }}>{product?.name}</Card.Title>
                      <Card.Text className="text-truncate" style={{ fontSize: '0.8rem', color: 'black' }}>{product?.description}</Card.Text>
                    </div>
                    <div>
                      <Card.Text style={{ fontSize: '0.9rem', color: 'black' }}>
                        <strong>฿{product?.price}.00</strong>
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-success me-2">New</span>
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default NewProducts;
