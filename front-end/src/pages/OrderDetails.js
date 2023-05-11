import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { updateSale } from '../services/requests';
import Header from '../components/Header';
import AppContext from '../context/Context';
import '../styles/orders.css';

export default function OrderDetails() {
  const { cart, totalPrice, order:
    { id: orderId, saleDate, seller, status }, setOrder, role } = useContext(AppContext);
  const NUMBER_FOUR = 4;
  const dateFormated = new Date(saleDate).toLocaleDateString('pt-BR');
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      await updateSale(`/sales/${orderId}`, {
        status: 'Entregue',
      });
      setOrder({
        id: orderId, saleDate, seller, status: 'Entregue',
      });
      history.push(`/${role}/orders/`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const testId = 'customer_order_details__element';

  return (
    <div className="div__order__details">
      <Header />
      <h3>Detalhe do Pedido</h3>
      <table>
        <tbody>
          <tr>
            <td
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              { `PEDIDO
            ${orderId.toString().padStart(NUMBER_FOUR, '0')}` }
            </td>
            <td
              data-testid={ `${testId}-order-details-label-seller-name` }
            >
              { `P. Vend:
              ${seller}`}
            </td>
            <td
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {dateFormated}
            </td>
            <td
              data-testid={ `${testId}-order-details-label-delivery-status${orderId}` }
            >
              {status}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item, i) => (
            <tr key={ i + item.name }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {item.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {item.price.replace(/\./, ',')}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(Number(item.quantity) * Number(item.price)).toFixed(2).replace(/\./, ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        disabled={ status !== 'Em trânsito' }
        onClick={ handleSubmit }
      >
        MARCAR COMO ENTREGUE
      </button>
      <p data-testid="customer_order_details__element-order-total-price">
        Total: R$
        {totalPrice}
      </p>
    </div>
  );
}
