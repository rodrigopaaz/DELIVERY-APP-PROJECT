import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { requestOrders } from '../services/requests';
import CardOrders from '../components/CardsOrders';
import AppContext from '../context/Context';
import '../styles/orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { role, email } = useContext(AppContext);
  const history = useHistory();

  const handleOrders = async () => {
    try {
      const myOrders = await requestOrders('/sales/orders', { email });
      setOrders(myOrders);
    } catch (error) {
      setOrders([]);
    }
  };

  useEffect(() => {
    handleOrders();
    if (role === 'customer') {
      history.push('/customer/orders');
    } else if (role === 'seller') {
      history.push('/seller/orders');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, role]);

  return (
    <div className="div__orders">
      <Header />
      { orders.length > 0 && orders.map((item) => (
        <CardOrders
          key={ item.id }
          id={ item.id }
          status={ item.status }
          saleDate={ item.saleDate }
          totalPrice={ item.totalPrice }
          deliveryAddress={ item.deliveryAddress }
          deliveryNumber={ item.deliveryNumber }
        />))}
    </div>
  );
}
