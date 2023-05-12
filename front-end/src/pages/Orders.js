import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { requestOrders } from '../services/requests';
import CardOrders from '../components/CardsOrders';
import AppContext from '../context/Context';
import '../styles/orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { email } = useContext(AppContext);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <div className="div__orders">
      <Header />
      {orders.length
                && orders.map(({ id, status, saleDate, totalPrice, deliveryAddress }) => (
                  <CardOrders
                    key={ id }
                    id={ id }
                    status={ status }
                    saleDate={ saleDate }
                    totalPrice={ totalPrice }
                    deliveryAddress={ deliveryAddress }
                  />
                ))}
    </div>
  );
}
