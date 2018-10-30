import React, { useContext } from 'react';
import { OrderContext } from '../contexts/orders.context';

export function OrderList() {
  const ctx = useContext(OrderContext);

  const findItem = order => ctx.state.itemsById[order.purchase];

  const renderOrder = order => (
    <div key={order.name}>
      {order.name} - {item.description} - {item.price}
    </div>
  );

  return (
    <div className="orders">
      <h2>Orders</h2>
      {ctx.state.orders.map(order => findItem(order) && renderOrder(order))}
    </div>
  );
}
