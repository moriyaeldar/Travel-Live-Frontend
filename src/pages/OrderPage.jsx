import React from 'react';
import { connect } from 'react-redux';
import { OrderList } from '../cmps/OrderList.jsx';
import { userService } from '../services/user.service.js';
import { loadOrders, onRemoveOrder } from '../store/order.actions.js';
import {
  loadOrdersFromUser,
  onRemoveOrderFromUser,
} from '../store/user.actions';
import { changePage } from '../store/page.actions.js';
import { Loader } from '../cmps/Loader.jsx';
// import order from '../data/order.js';
class _OrderPage extends React.Component {
  state = {
    orders: [],
    sortBy: '',
    isUpcomingShown: true

  }



  async componentDidMount() {
    const { orders } = this.props;
    console.log('componentDidMount in orderPage');
    window.scrollTo(0, 0);
    this.props.changePage('order');
    const user = await userService.getLoggedinUser();
    if (!user) {
      this.props.history.push('/');
      return;
    }
    await this.props.loadOrders(user._id, false);

    this.setState({ orders })
    this.onSetFilterOrders('upcoming');
  }

  onRemoveOrder = async (orderId, ev) => {
    ev.preventDefault();
    const user = await userService.getLoggedinUser();

    // await this.props.onRemoveOrderFromUser(orderId);
    await this.props.onRemoveOrder(orderId);
    // let {orders} = this.state;
    await this.props.loadOrders(user._id, false);
    const {orders} = this.props;
    // console.log('this is orders after remove',orders);
    // orders = orders.filter(order => orderId !== order._id);
    this.setState({ orders })
    this.onSetFilterOrders('upcoming');


  };
  onSetSortOrders = (sort) => {
    const { sortBy, orders } = this.state;
    console.log('onSetFrontSort sort', sort);
    let ordersToDisplay = [];
    if (sort === 'title') {
      console.log('sort by title');
      ordersToDisplay = orders.sort((order1, order2) => {
        return this.sortByTxt(order1.stay.title, order2.stay.title)
      })

    }
    if (sort === 'status') {
      console.log('sort by status');
      ordersToDisplay = orders.sort((order1, order2) => {
        return this.sortByTxt(order1.status, order2.status)
      })

    }
    if (sort === 'checkIn') {
      console.log('sort by checkIn');
      ordersToDisplay = orders.sort((order1, order2) => {
        return this.sortByTxt(order1.checkIn, order2.checkIn)
      })

    }
    if (sort === 'checkOut') {
      console.log('sort by checkIn');
      ordersToDisplay = orders.sort((order1, order2) => {
        return this.sortByTxt(order1.checkIn, order2.checkIn)
      })

    }
    if (sort === 'price') {
      console.log('sort by price');//ITS A STRING
      ordersToDisplay = orders.sort((order1, order2) => {
        return order1.stay.totalPrice - order2.stay.totalPrice
      })
    }

    console.log('ordersToDisplay', ordersToDisplay);
    this.setState({ ...this.state, orders: ordersToDisplay }, () => {
      console.log('this.state.orders SORTED', this.state.orders);
    })

  }
  sortByTxt = (txt1, txt2) => {

    if (txt1 > txt2) {
      return 1;
    } if (txt2 > txt1) {
      return -1;
    } else {
      return 0;
    }


  }

  onSetFilterOrders = (filterBy) => {
    const { orders } = this.props;
    // this.setState({ ...this.state, orders: this.props.orders })
    // this.setState({ orders }, ()=>{
    //   console.log('this.state.orders before FILTER****', this.state.orders);
    // })----
    console.log('onSetFilterOrders: ', filterBy);
    // this.setState({ orders })
    let currDate = Date.now();
    console.log('currDate', currDate);
    let ordersToDisplay = this.props.orders;
    console.log('ordersToDisplay', ordersToDisplay);

    if (filterBy === 'upcoming') {
      ordersToDisplay = ordersToDisplay.filter((order) => {
        return order.checkIn > currDate
      })

    }
    if (filterBy === 'past') {
     
      console.log('filterby past');
      console.log('ordersToDisplay in filterby past1***', ordersToDisplay);
      ordersToDisplay = ordersToDisplay.filter((order) => {
        return order.checkIn < currDate
      })
      console.log('ordersToDisplay in filterby past2', ordersToDisplay);
  
  
  }

  console.log('ordersToDisplay in onSetFilterOrders', ordersToDisplay);
  this.setState({ ...this.state, orders: ordersToDisplay }, () => {
    console.log('this.state.orders FILTERED', this.state.orders);
    // ordersToDisplay=this.props.orders
  })

  
}


render() {
  // const { orders } = this.props;
  const { orders, isUpcomingShown } = this.state;
  // console.log('orders:', orders);
  return !orders || !orders.length ? (
    <Loader />
  ) : (
    <section className='order-page main-container'>
      <h1>Trips</h1>
      <div className='trips-page-header'>
        <div className='left-btns'>
          <button className={isUpcomingShown ? 'order-active' : ''} onClick={() => {
            this.setState({
              isUpcomingShown: true,
            }, ()=>{ this.onSetFilterOrders('upcoming')});
           
          }}>Upcoming</button>
          <button className={!isUpcomingShown ? 'order-active' : ''} onClick={() => {
            this.setState({
              isUpcomingShown: false,
            }, ()=>{this.onSetFilterOrders('past')});
            
          }}>Past</button>
        </div>
        <div className='right-btns'>
          <button onClick={() => { this.onSetSortOrders('title') }}>Stay name</button>
          <button onClick={() => { this.onSetSortOrders('checkIn') }}>Check in</button>
          <button onClick={() => { this.onSetSortOrders('checkOut') }}>Check out</button>
          <button onClick={() => { this.onSetSortOrders('price') }}>Price</button>
          <button onClick={() => { this.onSetSortOrders('status') }}>Status</button>
        </div>
      </div>
      <OrderList orders={orders} onRemoveOrder={this.onRemoveOrder} />
    </section>
  );
}
}

function mapStateToProps(state) {
  return {
    orders: state.orderModule.orders,
  };
}

const mapDispatchToProps = {
  loadOrders,
  onRemoveOrder,
  loadOrdersFromUser,
  changePage,
  onRemoveOrderFromUser,
};

export const OrderPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OrderPage);
