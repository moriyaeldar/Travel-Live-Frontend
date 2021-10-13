import React from 'react';

export function OrderPreview({ order, onRemoveOrder }) {
 
  const formattedDates = (chosenDate) => {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    if (!chosenDate) return 'Add dates';
    const date = new Date(chosenDate);
    // return date.toLocaleDateString('en-GB');
    return date.toLocaleDateString('en-US', options);
    // return date.toISOString();
  };

  if (!order) return;
  return (
    <div className='order-preview'>
      <section className='order-gallery'>
        <img src={order.stay.imgUrls[0]} className='order-img' />
        <img src={order.stay.imgUrls[1]} className='order-img' />
        <img src={order.stay.imgUrls[2]} className='order-img' />
      </section>
      <div className="order-prev-text">
        <h6 className="order-prev-title">{order.stay.title}
          {/* <p className="order-prev-dates">
      <span>{formattedDates(order.checkIn)}</span>
      <span>{formattedDates(order.checkOut)}</span>
      </p> */}
        </h6>
        <p>${order.stay.totalPrice}</p>
        <p>{order.status}</p>
        <p className='non-refundable'>Non-refundable</p> 
        
       
        <p className="order-prev-dates check-in">{formattedDates(order.checkIn)}</p>
        <p className="order-prev-dates check-out"> {formattedDates(order.checkOut)}</p>
        
       {order.checkIn >Date.now() && <button onClick={(ev) => {  onRemoveOrder(order._id, ev);}}>
          Cancel order
        </button>}

      </div>
    </div>
  );
}
