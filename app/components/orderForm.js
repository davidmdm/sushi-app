import React, { Component } from 'react';
import { OrderConsumer } from '../contexts/orders.context';

export class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      purchase: null,
    };

    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  update(key) {
    return evt => this.setState({ [key]: evt.target.value });
  }

  submit(ctx) {
    return evt => {
      evt.preventDefault();
      ctx.createOrder(this.state);
    };
  }

  render() {
    return (
      <div>
        <h2>Place your order</h2>

        <OrderConsumer>
          {ctx => (
            <form onSubmit={this.submit(ctx)}>
              <input type="text" onChange={this.update('name')} name="name" placeholder="name" />
              <select onChange={this.update('purchase')} name="item">
                <option />
                {ctx.catalogue.length > 0 &&
                  ctx.catalogue.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.description} - ${item.price}
                    </option>
                  ))}
              </select>
              <button type="submit">place your order!</button>
            </form>
          )}
        </OrderConsumer>
      </div>
    );
  }
}
