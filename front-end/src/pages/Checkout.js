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
    const product = item.find((e) => e.id === id);
    const deleteProduct = item.filter((e) => e.id !== id);
    if (product.quantity > 1) {
      const deleteItem = [...deleteProduct, { id,
        name: product.name,
        price: product.price,
        quantity: product.quantity -= 1 }].sort((a, b) => a.id - b.id);
      setCart(deleteItem);
      localStorage.setItem('cart', JSON.stringify(deleteItem));
    } else {
      setCart(deleteProduct);
      localStorage.setItem('cart', JSON.stringify(deleteProduct));
    }
  };

  /*   const cartTest = [
    { id: 1, name: 'teste 1', price: 2.99, quantity: 2 },
    { id: 2, name: 'teste 2', price: 1.99, quantity: 1 },
    { id: 3, name: 'teste 3', price: 4.99, quantity: 5 },
    { id: 4, name: 'teste 4', price: 6.99, quantity: 8 },
  ];
 */
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
            <td data-testid={ `element-order-table-item-number-${i}` }>{item.id}</td>
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
