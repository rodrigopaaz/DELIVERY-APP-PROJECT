import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { requestData } from '../services/requests';
import Card from '../components/Cards';
import AppContext from '../context/Context';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, cart, role } = useContext(AppContext);
  const history = useHistory();

  const handleProducts = async () => {
    try {
      const data = await requestData('/products');
      setProducts(data);
    } catch (error) {
      setProducts([]);
    }
  };

  const sumTotalCart = () => {
    const prices = cart.map((elem) => parseFloat(elem.price));
    const totalCart = prices.reduce((acc, price) => acc + price, 0);
    setTotalPrice(totalCart.toFixed(2).replace(/\./, ','));
  };

  useEffect(() => {
    handleProducts();
    sumTotalCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div>
      <Header />
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        {products.length
          && products.map(({ id, name, price, urlImage }) => (
            <Card
              key={ id }
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          ))}
      </div>
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
  );
}

export default Products;
