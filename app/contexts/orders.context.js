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
        case 'SET_CATALOGUE':
          return {
            ...state,
            catalogue: action.catalogue,
            itemsById: action.catalogue.reduce(arrayToMapBy('id'), {}),
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
      catalogue: [],
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
    fetch('/catalogue')
      .then(res => res.json())
      .then(res => !res.ok && res.text().then(txt => Promise.reject(new Error(txt))))
      .then(catalogue =>
        dispatch({
          type: 'SET_CATALOGUE',
          catalogue,
          itemsById: catalogue.reduce(arrayToMapBy('id'), {}),
        })
      )
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

  return (
    <OrderContext.Provider value={value}>
      {props.children}
    </OrderContext.Provider>
  );
}
