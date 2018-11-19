import React, { useContext, useState } from 'react';

import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { OrderContext } from '../contexts/orders.context';

function FormCtl(props) {
  return <FormControl style={{ margin: '30px', minWidth: '140px' }}>{props.children}</FormControl>;
}

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
        <FormCtl>
          <Input type="text" {...name} name="name" placeholder="name" />
        </FormCtl>
        <FormCtl>
          <Select style={{minWidth: '200px'}} {...purchase} inputProps={{ name: 'item', placeholder: 'item' }}>
            <MenuItem value="">none</MenuItem>
            {/* {ctx.state.catalogue.length > 0 &&
              ctx.state.catalogue.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.description} - ${item.price}
                </MenuItem>
              ))} */}
          </Select>
        </FormCtl>
        <FormCtl>
          <Button variant="outlined" color="secondary" type="submit">place your order!</Button>
        </FormCtl>
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
