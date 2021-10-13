// import React from 'react';

// export class AddOrder extends React.Component {
//   state = {
//     checkIn: Date.now(),
//     checkOut: Date.now(),
//     guests: '',
//   };

//   handleChange = (ev) => {
//     // console.log('state in the start of handle change', this.state);
//     const field = ev.target.name;
//     const value = ev.target.value;
//     this.setState({ ...this.state, [field]: value });
//     // console.log('state in the end of handle change', this.state);
//   };

//   onAddOrder = (ev) => {
//     console.log('onAddOrder in inAddOrder');
//     ev.preventDefault();
//     // console.log('adding order ');
//     // console.log('orderin addOrder 1!', this.state);
//     if (!this.state.checkIn || !this.state.checkOut || !this.state.guests)
//       return;
//     // console.log('order in addOrder 2!', this.state);
//     this.props.onAddOrder(this.state);
//     this.clearState();
//   };

//   // onRemoveOrder = (ev) => {
//   //     console.log('onAddOrder in inAddOrder');
//   //     ev.preventDefault();
//   //     this.props.onAddOrder(this.state);
//   //     this.clearState()
//   // };

//   clearState = () => {
//     const clearTemplate = {
//       checkIn: Date.now(),
//       checkOut: Date.now(),
//       guests: '',
//     };
//     this.setState({ ...clearTemplate });
//   };

//   render() {
//     const { checkIn, checkOut, guests } = this.state;
//     // const { onAddOrder } = this.props;
//     return (
//       <div>
//         {/* <AddForm/> */}
//         <form className='add-order' onSubmit={this.onAddOrder}>
//           <p>Add Order</p>
//           <label htmlFor='order-checkIn'>checkIn:</label>
//           <input
//             type='text'
//             name='checkIn'
//             id='order-checkIn'
//             value={checkIn}
//             onChange={this.handleChange}
//             required
//           />

//           <label htmlFor='order-checkOut'>checkOut:</label>
//           <input
//             type='checkOut'
//             name='checkOut'
//             value={checkOut}
//             onChange={this.handleChange}
//             id='order-checkOut'
//             required
//           ></input>

//           <label htmlFor='order-guests'>Guests:</label>
//           <input
//             type='guests'
//             name='guests'
//             value={guests}
//             onChange={this.handleChange}
//             id='order-guests'
//             required
//           ></input>

//           <button>Enter!</button>
//         </form>

//         {/* <button onClick={()=>{this.onRemoveOrder}}>Delete</button> */}
//       </div>
//     );
//   }
// }
