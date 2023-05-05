import React, { useState } from 'react';

export default function Card({ item }) {
  const { id, urlImage } = item;
  console.log(urlImage);
  const [quantidade, setQuantidade] = useState(0);

  const handleChange = ({ target }) => {
    const Inteiro = parseInt(target.value, 10);
    if (Number.isNaN(Inteiro)) {
      return setQuantidade(0);
    }
    setQuantidade(Inteiro);
  };

  const handleIncrease = () => {
    setQuantidade(quantidade + 1);
  };

  const handleDecrease = () => {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
    } else {
      setQuantidade(0);
    }
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {item.name}
      </p>

      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ item.urlImage }
        alt={ item.name }
      />

      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {item.price}

      </p>

      <button
        type="button"
        name="add"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ handleIncrease }
      >
        +
      </button>
      <input
        data-testid="shopping-cart-product-quantity"
        type="number"
        name="name"
        value={ quantidade }
        onChange={ handleChange }
        placeholder="0"
      />

      <button
        type="button"
        name="rm"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => handleDecrease() }
      >
        -
      </button>
    </div>
  );
}

Card.propTypes = {}.isRequired;
