import React from 'react';
import ReactDom from 'react-dom';
import { Header } from './components/header';
import { OrderForm } from './components/orderForm';
import { OrderList } from './components/orderList';
import { OrderProvider } from './contexts/orders.context';
import './index.scss';

const video = require('./assets/sushi-video.mp4');

export const Application = () => (
  <div>
  <video autoPlay loop src={video} type="video/mp4" />

    <Header />
    <OrderProvider>
      <OrderForm />
      <OrderList />
    </OrderProvider>
  </div>
);

ReactDom.render(<Application />, document.getElementById('root'));
