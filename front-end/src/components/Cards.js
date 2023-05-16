import React, { useContext, useState } from 'react';
import AppContext from '../context/Context';
import '../styles/cards.css';

export default function Card({ id, name, price, urlImage, quantity }) {
  const { cart, setCart } = useContext(AppContext);
  const cardInCart = cart.find((item) => item.id === id && item.quantity > 0);
  const defaultQuantity = cardInCart ? cardInCart.quantity : 0;
  const [quantidade, setQuantidade] = useState(defaultQuantity);

  const handleChange = ({ target }, product) => {
    const newQuantity = target.value;
    if (product.quantity !== newQuantity) {
      setQuantidade(newQuantity);
    }
    const productFindInput = cart.findIndex((item) => item.id === product.id);
    if (productFindInput >= 0) {
      const updatedCart = cart.map((item, index) => (index === productFindInput
        ? { ...item, quantity: parseInt(newQuantity, 10) } : item));
      // Cria um novo array de itens no carrinho com a quantidade atualizada para o item correspondente//
      setCart(updatedCart.filter((item) => item.quantity > 0));
      // Atualiza o carrinho com o novo array de itens, removendo qualquer item com quantidade zero//
    } else {
      const updatedCart = [...cart, { ...product, quantity: parseInt(newQuantity, 10) }];
      // Adiciona o novo item ao carrinho com a quantidade especificada //
      setCart(updatedCart);
    }
  };

  const handleIncrease = (product) => {
    const productFind = cart.find((item) => item.id === product.id);
    if (productFind) {
      setCart(cart.map((item) => (item.id === product.id ? {
        ...item, quantity: item.quantity + 1,
      } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setQuantidade(quantidade + 1);
  };

  const handleDecrease = (product) => {
    const productFind = cart.find((item) => item.id === product.id);
    if (productFind) {
      if (productFind.quantity > 1) {
        setCart(cart.map((item) => (item.id === product.id ? {
          ...item, quantity: item.quantity - 1,
        } : item)));
      } else {
        const cartUpdated = cart.filter((item) => item.id !== product.id);
        setCart(cartUpdated);
      }
    }
    setQuantidade(quantidade - 1);
  };

  return (
    <div className="div__card">
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>

      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />

      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price.replace(/\./, ',')}
      </p>
      <div className="div__product__quantity">
        <button
          type="button"
          name="rm"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => handleDecrease({ id, name, price, quantity }) }
          disabled={ quantidade <= 0 }
        >
          -
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          name="quantidade"
          value={ quantidade }
          onChange={ (e) => handleChange(e, { id, name, price, quantity }) }
          placeholder="0"
          min="0"
        />
        <button
          type="button"
          name="add"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => handleIncrease({ id, name, price, quantity }) }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {}.isRequired;
