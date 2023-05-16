import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/Context';
import { requestData, updateSale } from '../services/requests';
import '../styles/orderDetails.css';

export default function OrderDetails() {
  const [sale, setSale] = useState({
    id: 0,
    products: [],
    saleDate: '',
    seller: {},
    status: '',
    totalPrice: '',
  });

  const { role } = useContext(AppContext);
  const history = useHistory();
  const { id: idParams } = useParams();

  const NUMBER_FOUR = 4;
  const dateFormated = new Date(sale.saleDate).toLocaleDateString('pt-BR');

  const requestSale = async () => {
    const saleById = await requestData(`/sales/${idParams}`);
    setSale(saleById);
  };

  const handleStatus = async (statusToSet) => {
    try {
      await updateSale(`/sales/${idParams}`, {
        status: statusToSet,
      });
      requestSale();
      // if (role === 'seller') {
      //   history.push(`/${role}/orders/`);
      // }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    requestSale();
    if (role === 'customer') {
      history.push(`/customer/orders/${idParams}`);
    } else if (role === 'seller') {
      history.push(`/seller/orders/${idParams}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const testId = `${role}_order_details__element`;

  return (
    <div className="div__order__details">
      <Header />
      <h3>Detalhe do Pedido</h3>
      <table>
        <tbody>
          <tr>
            <td
              data-testid={
                `${testId}-order-details-label-order-id`
              }
            >
              { `PEDIDO
            ${sale.id.toString().padStart(NUMBER_FOUR, '0')}` }
            </td>
            <td
              data-testid={ `${testId}-order-details-label-seller-name` }
            >
              { `P. Vend:
              ${sale.seller.name}`}
            </td>
            <td
              data-testid={
                `${testId}-order-details-label-order-date`
              }
            >
              {dateFormated}
            </td>
            <td
              data-testid={
                `${testId}-order-details-label-delivery-status`
              }
            >
              {sale.status}
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
          {sale.products
          && sale.products.map(({ name, sales_products: sales, price }, i) => (
            <tr key={ i + name }>
              <td
                data-testid={
                  `${testId}-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `${testId}-order-table-name-${i}` }
              >
                {name}
              </td>
              <td
                data-testid={
                  `${testId}-order-table-quantity-${i}`
                }
              >
                {sales.quantity}
              </td>
              <td
                data-testid={
                  `${testId}-order-table-unit-price-${i}`
                }
              >
                {price.replace(/\./, ',')}
              </td>
              <td
                data-testid={
                  `${testId}-order-table-sub-total-${i}`
                }
              >
                {(Number(sales.quantity) * Number(price)).toFixed(2).replace(/\./, ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn__order__details">
        {
          role === 'customer'
         && (
           <button
             type="button"
             data-testid="customer_order_details__button-delivery-check"
             disabled={ sale.status !== 'Em Trânsito' }
             onClick={ () => handleStatus('Entregue') }
           >
             MARCAR COMO ENTREGUE
           </button>)
        }
        {
          role === 'seller' && (
            <div>
              <button
                type="button"
                disabled={ sale.status !== 'Pendente' }
                data-testid="seller_order_details__button-preparing-check"
                onClick={ () => handleStatus('Preparando') }
              >
                PREPARAR PEDIDO
              </button>
              <button
                type="button"
                disabled={ sale.status !== 'Preparando' }
                data-testid="seller_order_details__button-dispatch-check"
                onClick={ () => handleStatus('Em Trânsito') }
              >
                SAIU PARA ENTREGA
              </button>
            </div>
          )
        }
      </div>
      <p data-testid={ `${testId}-order-total-price` }>
        Total: R$
        {sale.totalPrice.replace(/\./, ',')}
      </p>
    </div>
  );
}
