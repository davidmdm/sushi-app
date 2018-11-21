import React, { useContext, useState, useRef } from 'react';

import { OrderContext } from '../contexts/orders.context';

function Welcome({ update }) {
  const inputElem = useRef(null);

  const [valid, setValid] = useState();

  const validateName = () => {
    setValid(inputElem.current && inputElem.current.value.length > 3);
  };

  return (
    <div>
      <h2>Sushi-App Alpha</h2>
      <p>Enter your name and lets get started!</p>
      <input onChange={validateName} ref={inputElem} placeholder="name" />
      {valid && (
        <button type="button" onClick={() => update(inputElem.current.value)}>
          Start ordering!
        </button>
      )}
    </div>
  );
}

function ItemForm({ section }) {
  return (
    <div>
      <h2>{section.title}</h2>

      <select>
        <option value="">none</option>
        {section.items &&
          section.items.map(item => (
            <option key={item.id} value={item.id}>
              {item.description} - ${item.price}
            </option>
          ))}
      </select>

      {section.previous && (
        <button type="button" onClick={section.previous}>
          back
        </button>
      )}
      {section.next && (
        <button type="button" onClick={section.next}>
          next
        </button>
      )}
    </div>
  );
}

export function OrderForm() {
  const [name, setName] = useState('');
  const purchase = useFormComponent('');
  const ctx = useContext(OrderContext);

  const section = useMenu(ctx.state.menu);

  const submit = evt => {
    evt.preventDefault();
    ctx.createOrder({ name: name.value, purchase: purchase.value });
  };

  return (
    <div>
      <form onSubmit={submit}>{!name ? <Welcome update={setName} /> : <ItemForm section={section} />}</form>
      {ctx.state.error && <div style={{ color: 'red' }}>{ctx.state.error}</div>}
    </div>
  );
}

function useMenu(menu) {
  const sectionTitles = Object.keys(menu);

  if (sectionTitles.length === 0) {
    return {};
  }

  const [index, setIndex] = useState(0);

  const title = sectionTitles[index];
  const items = menu[title];

  const next = () => {
    if (index < sectionTitles.length - 1) {
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
