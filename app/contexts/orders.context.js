import React, { useEffect, useReducer } from 'react';

const by = key => (a, b) => (a[key] < b[key] ? -1 : 1);

const arrayToMapBy = key => (acc, value) => {
  acc[value[key]] = value;
  return acc;
};

export const OrderContext = React.createContext(null);

export function OrderProvider(props) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_MENU':
          return {
            ...state,
            menu: action.menu,
            itemsById: action.itemsById,
          };
        case 'SET_ORDERS':
          return {
            ...state,
            orders: action.orders,
          };
        case 'SET_ERROR':
          return {
            ...state,
            error: action.error.message,
          };
      }
    },
    {
      orders: [],
      menu: [],
      itemsById: {},
      error: '',
    }
  );

  const fetchOrders = () => {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => dispatch({ type: 'SET_ORDERS', orders: orders.sort(by('name')) }))
      .catch(err => dispatch({ type: 'SET_ERROR', error: err }));
  };

  const createOrder = order => {
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    };

    fetch('/orders', options)
      .then(res => !res.ok && res.text().then(txt => Promise.reject(new Error(txt))))
      .then(() => fetchOrders())
      .catch(err => dispatch({ type: 'SET_ERROR', error: err }));
  };

  const fetchCatalogue = () => {
    fetch('/menu')
      .then(res => res.json())
      .then(menu => {
        dispatch({
          type: 'SET_MENU',
          menu,
          itemsById: Object.keys(menu).reduce((acc, key) => ({ ...acc, ...menu[key].reduce(arrayToMapBy('id')) }), {}),
        });
      })
      .catch(err => dispatch({ type: 'SET_ERROR', error: err }));
  };

  useEffect(() => {
    fetchCatalogue();
    fetchOrders();
  }, []);

  const value = {
    state,
    fetchCatalogue,
    fetchOrders,
    createOrder,
  };

  return <OrderContext.Provider value={value}>{props.children}</OrderContext.Provider>;
}
