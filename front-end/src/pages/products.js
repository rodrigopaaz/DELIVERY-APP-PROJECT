import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { requestData } from '../services/requests';
import Card from '../components/Cards';
import AppContext from '../context/Context';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, cart, role } = useContext(AppContext);
  const history = useHistory();

  const handleProducts = async () => {
    try {
      const data = await requestData('/products');
      const productsWithQuantity = data.map((product) => {
        product.quantity = 0;
        return product;
      });
      setProducts(productsWithQuantity);
    } catch (error) {
      setProducts([]);
    }
  };

  const sumTotalCart = () => {
    const pricesToNumber = cart.map((elem) => ({ ...elem, price: Number(elem.price) }));
    const totalCart = pricesToNumber
      .reduce((acc, product) => acc + (product.price * product.quantity), 0);
    const totalCartFixed = totalCart.toFixed(2);
    setTotalPrice(totalCartFixed.replace('.', ','));
  };

  useEffect(() => {
    handleProducts();
    sumTotalCart();
    localStorage.setItem('cart', JSON.stringify(cart));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="main__div__products">
      <Header />
      <div className="div__products">
        {products.length
          && products.map(({ id, name, price, urlImage, quantity }) => (
            <Card
              key={ id }
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
              quantity={ quantity }
            />
          ))}
        <button
          disabled={ !cart.length }
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => history.push(`/${role}/checkout`) }
        >
          Ver carrinho: R$
          <p data-testid="customer_products__checkout-bottom-value">
            { totalPrice }
          </p>
        </button>
      </div>
    </div>
  );
}

export default Products;
