import React, { useContext, useState } from 'react';
import AppContext from '../context/Context';

export default function Card({ id, name, price, urlImage }) {
  const [quantidade, setQuantidade] = useState(0);
  const { cart, setCart } = useContext(AppContext);

  const handleChange = ({ target }) => {
    setQuantidade(target.value);
  };

  const handleIncrease = (product) => {
    setQuantidade(quantidade + 1);
    setCart([...cart, product]);
  };

  const handleDecrease = (productId) => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
      const filteredCart = cart.filter((product) => product.id !== productId);
      setCart(filteredCart);
    } else {
      setQuantidade(0);
    }
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>

      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="200"
      />

      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace(/\./, ',')}
      </p>

      <button
        type="button"
        name="add"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => handleIncrease({ id, name, price }) }
      >
        +
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        name="quantidade"
        value={ quantidade }
        onChange={ handleChange }
        placeholder="0"
        min="0"
      />

      <button
        type="button"
        name="rm"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => handleDecrease(id) }
      >
        -
      </button>
    </div>
  );
}

Card.propTypes = {}.isRequired;
