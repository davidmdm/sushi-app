import React, { useContext, useState, useRef } from 'react';

import { OrderContext } from '../contexts/orders.context';

function Cell(props) {
  return <td className="item_cell">{props.children}</td>;
}

function Welcome({ update }) {
  const inputElem = useRef(null);
  const [valid, setValid] = useState(false);

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

function MenuSection({ section, updateOrder, order }) {
  return (
    <div>
      <h2>{section.title}</h2>

      <table>
        <tbody className="section_menu">
          {(section.items &&
            section.items.map(item => (
              <tr key={item.id}>
                <Cell>{item.id}</Cell>
                <Cell>{item.description}</Cell>
                <Cell>${item.price}</Cell>
                <Cell>
                  <input onChange={e => updateOrder(item.id, e.target.value)} type="number" />
                </Cell>
              </tr>
            ))) || <div>{JSON.stringify(order)}</div>}
        </tbody>
      </table>

      {section.previous && (
        <button type="button" style={{ float: 'left', color: 'darkred' }} onClick={section.previous}>
          back
        </button>
      )}
      {section.next && (
        <button
          type="button"
          style={{ float: 'right', color: 'darkgreen', marginRight: '50px' }}
          onClick={section.next}
        >
          next
        </button>
      )}
    </div>
  );
}

export function OrderForm() {
  const [name, setName] = useState('');
  const [purchase, setPurchase] = useState('');
  const [order, setOrder] = useState({});

  const updateOrder = (id, qty) => {
    setOrder({ ...order, [id]: qty });
  };

  const ctx = useContext(OrderContext);

  const section = useMenu(ctx.state.menu);

  const submit = evt => {
    evt.preventDefault();
    ctx.createOrder({ name: name, purchase: purchase });
  };

  return (
    <div>
      <form onSubmit={submit}>
        {name ? (
          <Welcome update={setName} />
        ) : (
          <MenuSection section={section} order={order} updateOrder={updateOrder} />
        )}
      </form>
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
