import React from 'react';
import { Link } from 'react-router-dom';

import { OrderPreview } from '../cmps/OrderPreview.jsx';
export function OrderList({ orders, onRemoveOrder }) {
  console.log('orders in orderList', orders);
  return (
    <div className='order-list'>
      {orders.map((order) => (
        
        <Link
        key={order._id}
          to={{ pathname: `/stay/${order.stay._id}`, orderId: order._id }}
        >
          {' '}
          <OrderPreview
            key={order._id}
            order={order}
            onRemoveOrder={onRemoveOrder}
          />
        </Link>
      ))}
    </div>
  );
}
