import React from 'react';
import ReactDom from 'react-dom';
import { Header } from './components/header';
import { OrderForm } from './components/orderForm';
import { OrderList } from './components/orderList';
import { OrderProvider } from './contexts/orders.context';

export const Application = () => (
  <div>
    <Header />
    <OrderProvider>
      <OrderForm />
      <OrderList />
    </OrderProvider>
  </div>
);

ReactDom.render(<Application />, document.getElementById('root'));
