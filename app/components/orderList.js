import React, { Component } from 'react';
import { OrderConsumer } from '../contexts/orders.context';

const by = key => (a, b) => (a[key] < b[key] ? -1 : 1);

export class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: '',
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/orders')
      .then(res => res.json())
      .then(orders => this.setState({ orders: orders.sort(by('name')) }))
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    return (
      <div className="orders">
        <h2>Orders</h2>
        <OrderConsumer>
          {ctx =>
            ctx.orders.map(order => {
              const item = ctx.itemsById[order.purchase];
              return (
                item && (
                  <div key={order.name}>
                    {order.name} - {item.description} - {item.price}
                  </div>
                )
              );
            })
          }
        </OrderConsumer>
      </div>
    );
  }
}
