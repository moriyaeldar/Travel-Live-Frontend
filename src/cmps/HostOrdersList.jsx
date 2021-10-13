import React from "react";
import { connect } from "react-redux";
import { loadOrders, onUpdateOrder } from "../store/order.actions";
import { Loader } from "../cmps/Loader";
import { userService } from "../services/user.service";
import { socketService } from "../services/socket.service";
import user from "../data/user";
class _HostOrdersList extends React.Component {
  async componentDidMount() {
    const user = await userService.getLoggedinUser();
    const filterBy = {
      userId: null,
      hostId: user._id,
    };
    this.props.loadOrders(user._id, true);
  }
  changeOrderStatus = async (order, status) => {
    await this.props.onUpdateOrder(order, status);
    socketService.emit(
      "sendMsg",
      `your order:${order.stay.title} status has change to:${status}`
    );
  };
  formattedDates = (chosenDate) => {
    if (!chosenDate) return "Add dates";
    const date = new Date(chosenDate);
    return date.toLocaleDateString("en-GB");
  };

  getUserImg = async (id) => {
    const user = await userService.getById(id);
    console.log(typeof user.imgUrl);
    return user.imgUrl;
  };

  render() {
    const { orders } = this.props;
    console.log("orders:", orders);
    return !orders || !orders.length ? (
      <Loader />
    ) : (
      <div className="host-orders-list">
        <table>
          <thead>
            <th>Name</th>
            <th></th>
            <th>Property Name</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Actions</th>
          </thead>

          {orders.map((order) => (
            <tr>
              <td>{order.user.fullname}</td>
              <td>
                <img className="host-orders-img" src={order.stay.imgUrls[0]} />
              </td>
              <td>{order.stay.title}</td>
              <td>{this.formattedDates(order.checkIn)}</td>
              <td>{this.formattedDates(order.checkOut)}</td>
              <td>
                <span className={order.status}>{order.status}</span>
              </td>{" "}
              <td>
                <button
                  className="host-accept-btn"
                  onClick={() => {
                    this.changeOrderStatus(order, "accepted");
                  }}
                >
                  Accept
                </button>
                <button
                  className="host-decline-btn"
                  onClick={() => {
                    // this.changeOrderStatus(order._id, 'declined');
                    this.changeOrderStatus(order, "declined");
                  }}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
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
  onUpdateOrder,
};

export const HostOrdersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HostOrdersList);
