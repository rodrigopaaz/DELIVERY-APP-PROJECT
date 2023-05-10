import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { requestOrders } from '../services/requests';
import CardOrders from '../components/CardsOrders';
import AppContext from '../context/Context';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { email } = useContext(AppContext);

  const handleOrders = async () => {
    try {
      const myOrders = await requestOrders('/sales/orders', { email });
      console.log('MEUS PEDIDOS', myOrders);
      setOrders(myOrders);
    } catch (error) {
      setOrders([]);
    }
  };

  useEffect(() => {
    handleOrders();
  }, [email]);

  return (
    <div>
      <Header />
      {orders.length
                && orders.map(({ id, status, saleDate, totalPrice }) => (
                  <CardOrders
                    key={ id }
                    id={ id }
                    status={ status }
                    saleDate={ saleDate }
                    totalPrice={ totalPrice }
                  />
                ))}
    </div>
  );
}
