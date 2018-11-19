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

  const section = useMenu(ctx.state.menu);

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
          <Select style={{ minWidth: '200px' }} {...purchase} inputProps={{ name: 'item', placeholder: 'item' }}>
            <MenuItem value="">none</MenuItem>
            {section.title &&
              section.items.length > 0 &&
              section.items.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.description} - ${item.price}
                </MenuItem>
              ))}
          </Select>
        </FormCtl>
        <FormCtl>
          <Button variant="outlined" color="secondary" type="submit">
            place your order!
          </Button>
        </FormCtl>
      </form>
      {ctx.state.error && <div style={{ color: 'red' }}>{ctx.state.error}</div>}
    </div>
  );
}

function useMenu(menu) {
  const sectionTitles = Object.keys(menu);
  const [index, setIndex] = useState(0);

  const title = sectionTitles[index];
  const items = menu[title];

  const next = () => {
    if (index < sectionTitles.length) {
      setIndex(index + 1);
    } else {
      setIndex(-1);
    }
  };

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else if (index < 0) {
      setIndex(sectionTitles.length - 1);
    }
  };

  return {
    title,
    items,
    next: index > -1 ? next : null,
    previous: index !== 0 ? previous : null,
  };
}

function useFormComponent(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: evt => setValue(evt.target.value),
  };
}
