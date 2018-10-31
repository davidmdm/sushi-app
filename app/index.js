import React from 'react';
import ReactDom from 'react-dom';
import { OrderForm } from './components/orderForm';
import { OrderList } from './components/orderList';
import { OrderProvider } from './contexts/orders.context';
import './index.scss';

export const Application = () => (
  <div id="application">
    <video autoPlay loop src={'/sushi-video.mp4'} type="video/mp4" />

    <div id="order-panel">
      <OrderProvider>
        <OrderForm />
        <OrderList />
      </OrderProvider>
    </div>
  </div>
);

ReactDom.render(<Application />, document.getElementById('root'));
