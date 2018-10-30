import React, { useContext } from 'react';
import { OrderContext } from '../contexts/orders.context';

export function OrderList() {
  const ctx = useContext(OrderContext);

  const findAndRenderItem = order => {
    const item = ctx.state.itemsById[order.purchase];
    if (item) {
      return (
        <div key={order.name}>
          {order.name} - {item.description} - {item.price}
        </div>
      );
    }
  };

  return (
    <div className="orders">
      <h2>Orders</h2>
      {ctx.state.orders.map(order => findAndRenderItem(order))}
    </div>
  );
}
