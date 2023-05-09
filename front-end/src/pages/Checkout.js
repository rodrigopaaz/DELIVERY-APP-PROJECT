import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestData, setToken } from '../services/requests';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [role, setRole] = useState('');
  const history = useHistory();

  const getSellers = async () => {
    const user = await requestData('/user');
    const seller = user.filter((u) => u.role === 'seller');
    setSellers(seller);
  };

  const removeItem = (id) => {
    const item = JSON.parse(localStorage.getItem('cart'));
    const index = item.findIndex((e) => e.id === id);
    item[index].quantity -= 1;

    if (item[index].quantity >= 1) {
      setCart(item);
      localStorage.setItem('cart', JSON.stringify(item));
    } else {
      const deleteProduct = item.filter((e) => e.id !== id);
      setCart(deleteProduct);
      localStorage.setItem('cart', JSON.stringify(deleteProduct));
    }
  };

  useEffect(() => {
    /*  localStorage.setItem('cart', JSON.stringify(cartTest)); */
    getSellers();
    const items = JSON.parse(localStorage.getItem('cart'));
    setCart(items);
    const { token, role: getRole } = JSON.parse(localStorage.getItem('user'));
    setRole(getRole);
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
            <td data-testid={ `element-order-table-item-number-${i}` }>{i + 1}</td>
            <td data-testid={ `element-order-table-name-${i}` }>{item.name}</td>
            <td data-testid={ `element-order-table-unit-price-${i}` }>{item.price}</td>
            <td data-testid={ `element-order-table-quantity-${i}` }>{item.quantity}</td>
            <td data-testid={ `element-order-table-sub-total-${i}` }>
              {(Number(item.quantity) * Number(item.price)).toFixed(2)}
            </td>
            <button
              type="button"
              onClick={ () => removeItem(item.id) }
            >
              remove
            </button>
          </tr>
        ))}
      </table>
      <button
        type="button"
        onClick={ () => history.push(`/${role}/order/id`) }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
