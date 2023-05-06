import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllProducts } from '../services/requests';
import Card from '../components/Cards';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    try {
      const { data } = await getAllProducts();
      setProducts(data);
      console.log(data);
    } catch (error) {
      setProducts([]);
    }
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="div__products">
        { products.length && products.map((item) => (
          <Card key={ item.id + item.name } item={ item } />
        ))}
      </div>
    </div>
  );
}

export default Products;
