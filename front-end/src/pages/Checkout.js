import React, { useEffect, useState } from 'react';
import { requestData, setToken } from '../services/requests';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    const user = await requestData('/user');
    const seller = user.filter((u) => u.role === 'seller');
    setSellers(seller);
  };

  useEffect(() => {
    getSellers();
    const items = JSON.parse(localStorage.getItem('cart'));
    setCart(items);
    const { token } = JSON.parse(localStorage.getItem('user'));
    setToken(token);
  }, []);

  return (
    <div>
      <select name="seller" data-testid="customer_checkout__select-seller">
        {sellers.map((sel) => <option key={ sel.id + sel.name }>{sel.id}</option>)}
      </select>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Sub-Total</th>
        </tr>
        {cart && cart.map((item, i) => (
          <tr key={ i + item.name }>
            <td data-testid={ `element-order-table-item-number-${i}` }>{item.id}</td>
            <td data-testid={ `element-order-table-name-${i}` }>{item.name}</td>
            <td data-testid={ `element-order-table-unit-price-${i}` }>{item.price}</td>
            <td data-testid={ `element-order-table-quantity-${i}` }>{item.quantity}</td>
            <td data-testid={ `element-order-table-sub-total-${i}` }>
              {Number(item.quantity) * Number(item.price)}

            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
