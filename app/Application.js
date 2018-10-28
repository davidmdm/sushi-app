import React from 'react';

import { OrderProvider } from './contexts/orders.context';

import { Header } from './components/header';
import { OrderForm } from './components/orderForm';
import { OrderList } from './components/orderList';

export const Application = () => (
  <div>
    <Header />
    <OrderProvider>
      <OrderForm />
      <OrderList />
    </OrderProvider>
  </div>
);
