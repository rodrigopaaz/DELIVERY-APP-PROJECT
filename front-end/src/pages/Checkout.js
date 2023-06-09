import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestData, requestSale, setToken } from '../services/requests';
import Header from '../components/Header';
import AppContext from '../context/Context';
import '../styles/checkout.css';

export default function Checkout() {
  const [total, setTotal] = useState(0);
  const [info, setInfo] = useState({ seller: '2', address: '', number: '' });
  const { cart, setCart, email, role, setRole, sellers,
    setSellers } = useContext(AppContext);
  const history = useHistory();

  const getSellers = async () => {
    const user = await requestData('/user');
    const seller = user.filter((u) => u.role === 'seller');
    setSellers(seller);
  };

  const removeItem = (id) => {
    const item = JSON.parse(localStorage.getItem('cart'));
    const deleteProduct = item.filter((e) => e.id !== id);
    setCart(deleteProduct);
    localStorage.setItem('cart', JSON.stringify(deleteProduct));
  };

  // const removeItem = (id) => {
  //   const item = JSON.parse(localStorage.getItem('cart'));
  //   const product = item.find((e) => e.id === id);
  //   const deleteProduct = item.filter((e) => e.id !== id);
  //   if (product.quantity > 1) {
  //     const deleteItem = [...deleteProduct, { id,
  //       name: product.name,
  //       price: product.price,
  //       quantity: product.quantity -= 1 }].sort((a, b) => a.id - b.id);
  //     setCart(deleteItem);
  //     localStorage.setItem('cart', JSON.stringify(deleteItem));
  //   } else {
  //     setCart(deleteProduct);
  //     localStorage.setItem('cart', JSON.stringify(deleteProduct));
  //   }
  // };

  const sumTotalCart = () => {
    const pricesToNumber = cart.map((elem) => ({ ...elem, price: Number(elem.price) }));
    const totalCart = pricesToNumber
      .reduce((acc, product) => acc + (product.price * product.quantity), 0);
    setTotal(totalCart);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleCheckout = async () => {
    try {
      const { id } = await requestSale('/sales', {
        address: info.address,
        number: info.number,
        email,
        seller: info.seller,
        total,
        products: cart,
      });
      setCart([]);
      history.push(`/${role}/orders/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSellers();
    const items = JSON.parse(localStorage.getItem('cart'));
    setCart(items);
    const { token, role: getRole } = JSON.parse(localStorage.getItem('user'));
    setRole(getRole);
    setToken(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sumTotalCart();
  });

  return (
    <div className="div__checkout">
      <Header />
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item, i) => (
            <tr key={ i + item.name } className="table__tr">
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {item.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {item.quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {item.price.replace(/\./, ',')}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {(Number(item.quantity) * Number(item.price)).toFixed(2).replace(/\./, ',')}
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  onClick={ () => removeItem(item.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p data-testid="customer_checkout__element-order-total-price">
        Total: R$
        { total.toFixed(2).replace(/\./, ',') }
      </p>
      <div className="div__address">
        <h3>Detalhes e Endereço para Entrega</h3>

        <form>
          <label htmlFor="seller">
            P. Vendedora Responsável
            <select
              id="seller"
              data-testid="customer_checkout__select-seller"
              name="seller"
              value={ info.seller }
              onChange={ handleChange }
            >
              {sellers.map((sel) => (
                <option
                  key={ sel.id + sel.name }
                  value={ sel.id }
                >
                  {sel.name}
                </option>))}
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              name="address"
              required
              value={ info.address }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="number">
            Número
            <input
              type="text"
              id="number"
              data-testid="customer_checkout__input-address-number"
              name="number"
              required
              value={ info.number }
              onChange={ handleChange }
            />
          </label>
        </form>

        <button
          type="button"
          disabled={ !cart.length }
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleCheckout }
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
