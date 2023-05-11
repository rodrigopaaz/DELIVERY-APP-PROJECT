import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/Context';

export default function CardOrders({
  id, status, saleDate, totalPrice, deliveryAddress }) {
  const history = useHistory();
  const { role } = useContext(AppContext);
  const dateFormated = new Date(saleDate).toLocaleDateString('pt-BR');
  const correctPrice = totalPrice.replace('.', ',');
  const four = 4;

  const redirectDetails = () => {
    switch (role) {
    case 'customer':
      history.push(`/customer/orders/${id}`);
      break;
    case 'seller':
      history.push(`/seller/orders/${id}`);
      break;
    default:
      history.push(`/orders/${id}`);
    }
  };

  return (
    <button
      className="cards__order__button"
      onClick={ redirectDetails }
      type="button"
    >
      <div>
        <p data-testid={ `${role}_orders__element-order-id-${id}` }>
          { `
          Pedido ${id.toString().padStart(four, '0')}`}
        </p>
        <p data-testid={ `${role}_orders__element-delivery-status-${id}` }>
          { status }
        </p>
        <div>
          <p data-testid={ `${role}_orders__element-order-date-${id}` }>
            { dateFormated }
          </p>
          <p data-testid={ `${role}_orders__element-card-price-${id}` }>
            { `R$ ${correctPrice} ` }
          </p>
          { role === 'seller' && (
            <p data-testid={ `${role}_orders__element-card-address-${id}` }>
              { deliveryAddress }
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
CardOrders.propTypes = {}.isRequired;
