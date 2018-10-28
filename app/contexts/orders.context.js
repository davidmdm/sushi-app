import React, { Component } from 'react';

export const OrderContext = React.createContext(null);

const by = key => (a, b) => (a[key] < b[key] ? -1 : 1);

const arrayToMapBy = key => (acc, value) => {
  acc[value[key]] = value;
  return acc;
};

export class OrderProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      catalogue: [],
      itemsById: {},
      fetchOrders: this.fetchOrders.bind(this),
      createOrder: this.createOrder.bind(this),
      error: '',
    };
  }

  componentDidMount() {
    this.fetchOrders();
    this.fetchCatalogue();
  }

  fetchOrders() {
    fetch('/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders: orders.sort(by('name')) }))
      .catch(console.error);
  }

  fetchCatalogue() {
    fetch('/catalogue')
      .then(res => res.json())
      .then(catalogue =>
        this.setState({
          catalogue,
          itemsById: catalogue.reduce(arrayToMapBy('id'), {}),
        })
      )
      .catch(console.error);
  }

  createOrder(order) {
    fetch('/orders', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })
      .then(() => this.fetchOrders())
      .catch(console.error);
  }

  render() {
    return <OrderContext.Provider value={this.state}>{this.props.children}</OrderContext.Provider>;
  }
}

export const OrderConsumer = OrderContext.Consumer;
