import React, { useContext, useState } from 'react';
import { OrderContext } from '../contexts/orders.context';

export function OrderForm() {
  const name = useFormComponent('');
  const purchase = useFormComponent('');
  const ctx = useContext(OrderContext);

  const submit = evt => {
    evt.preventDefault();
    ctx.createOrder({ name: name.value, purchase: purchase.value });
  };

  return (
    <div>
      <h2>Place your order</h2>
      <form onSubmit={submit}>
        <input type="text" {...name} name="name" placeholder="name" />
        <select {...purchase} name="item">
          <option value="" />
          {ctx.state.catalogue.length > 0 &&
            ctx.state.catalogue.map(item => (
              <option key={item.id} value={item.id}>
                {item.description} - ${item.price}
              </option>
            ))}
        </select>
        <button type="submit">place your order!</button>
      </form>
      {ctx.state.error && <div style={{ color: 'red' }}>{ctx.state.error}</div>}
    </div>
  );
}

function useFormComponent(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: evt => setValue(evt.target.value),
  };
}
