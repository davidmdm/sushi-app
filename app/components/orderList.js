import React, { useContext } from 'react';
import { OrderContext } from '../contexts/orders.context';

export function OrderList(props) {
  const ctx = useContext(OrderContext);

  return (
    <div className="orders">
      <h2>Orders</h2>
      {ctx.orders.map(order => {
        const item = ctx.itemsById[order.purchase];
        return (
          item && (
            <div key={order.name}>
              {order.name} - {item.description} - {item.price}
            </div>
          )
        );
      })}
    </div>
  );
}
