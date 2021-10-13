import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { faLongArrowAltUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { utilService } from '../services/util.service';

import { getCurrentUser } from '../store/user.actions';
import { loadOrders } from '../store/order.actions';
import user from '../data/user';

export class _HostHeader extends React.Component {
  state = {
    earnings: 0,
    totalRate: 0,
  };

  async componentDidMount() {
    const { user } = this.props;
    // const filterBy = {
    //   userId: null,
    //   hostId: user._id,
    // };
    // await this.props.loadOrders(filterBy);
    await this.props.loadOrders(user._id, true);

    const earnings = this.getTotalEarnings();
    // const totalRate = this.getTotalRate();
    // totalPrice
    this.setState({ earnings });
  }

  // getTotalRate = ()=>{
  //   if (!reviews||!reviews.length) return 0;
  //   const average =
  //   reviews.reduce(function (sum, value) {
  //     return sum + value.ratings.avg;
  //   }, 0) / reviews.length;

  //   return average.toFixed(1);
  // }

  getTotalEarnings = () => {
    const { orders } = this.props;
    if (!orders || !orders.length) return 0;
    const sum = orders.reduce(function (sum, value) {
      if (!value.totalPrice) return 0;
      return sum + value.totalPrice;
    }, 0);

    return sum;
  };

  getRandomNum = () => {
    return utilService.getRandomIntInclusive(1, 5);
  };

  getAccepted = () => {
    const { orders } = this.props;
    if (!orders || !orders.length) return 0;
    var accepted = orders.filter((order) => {
      return order.status.includes('accepted');
    });
    return accepted.length;
  };
  getDeclined = () => {
    const { orders } = this.props;
    if (!orders || !orders.length) return 0;
    var declined = orders.filter((order) => {
      return order.status.includes('declined');
    });

    return declined.length;
  };
  getPending = () => {
    const { orders } = this.props;
    if (!orders || !orders.length) return 0;
    var pending = orders.filter((order) => {
      return order.status.includes('pending');
    });

    return pending.length;
  };

  getNumOfOrders = () => {
    const { orders } = this.props;
    if (!orders || !orders.length) return 0;

    const sum = orders.reduce(function (acc, order) {
      return acc + 1;
    }, 0);

    return sum;
  };

  render() {
    const { earnings, totalRate } = this.state;
    return (
      <section className='host-header'>
        <div className='card-item'>
          <p>Average Rate</p>
          <div>
            <span>
              {' '}
              <FontAwesomeIcon className='star' icon={faStar} />
              4.5/5
            </span>
            <span className='percent'>
              {this.getRandomNum()}%
              <FontAwesomeIcon className='arrow' icon={faLongArrowAltUp} />
            </span>
          </div>
        </div>

        <div className='card-item'>
          <p>Monthly Earnings</p>
          <span>${earnings.toLocaleString()}</span>
        </div>

        <div className='card-item'>
          <p>Orders</p>
          <div className='reviews-numbers'>
            <span>{this.getNumOfOrders()}</span>
            <div className='reviews-colors-container'>
              <span className='circle green-circle'></span>
              <p>{this.getAccepted()}</p>
              <span className='circle yellow-circle'></span>
              <p>{this.getPending()}</p>
              <span className='circle red-circle'></span>
              <p>{this.getDeclined()}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.userModule.user,
    orders: state.orderModule.orders,
  };
}
const mapDispatchToProps = {
  getCurrentUser,

  loadOrders,
};

export const HostHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HostHeader);
