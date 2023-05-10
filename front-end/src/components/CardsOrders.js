import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CardOrders({ id, status, saleDate, totalPrice }) {
    const history = useHistory();
    const dateFormated = new Date(saleDate).toLocaleDateString('pt-BR');
    const correctPrice = totalPrice.replace('.', ',')
    const redirectDetails = () => {
        history.push(`orders/${id}`)
    }
    return (
        <button onClick={redirectDetails}>  
      <div>
        <p data-testid={ `customer_orders__element-order-id-${id}` }> 
            { `Pedido ${id.toString().padStart(4, '0')}`}
        </p>
        <p data-testid={ `customer_orders__element-delivery-status-${id}`  }> 
            { status }
        </p>
        <p data-testid={ `customer_orders__element-order-date-${id}` }> 
            { dateFormated }
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}`  }> 
            { `R$ ${correctPrice} ` }
        </p>
      </div>
    </button>
    );
  }
  
  CardOrders.propTypes = {}.isRequired;