import { orderService } from '../services/order.service.js';
import { userService } from '../services/user.service.js';
import { socketService } from '../services/socket.service';

import {
  showSuccessMsg,
  showErrorMsg,
  showUserMsg,
} from '../services/event-bus.service.js';

export function loadOrders(filter = null, isHost = false) {
  return async (dispatch) => {
    const orders = await orderService.query(filter, isHost);
    try {
      dispatch({
        type: 'SET_ORDER',
        orders,
      });
    } catch (err) {
      showErrorMsg('Cannot load orders');
      console.log('Cannot load orders', err);
    }
  };
}

export function newOrder(order) {
  return async (dispatch) => {
    try {
      const newOrder = await orderService.newOrder(order);

      return dispatch({
        type: 'NEW_ORDER',
        newOrder,
      });
    } catch (err) {
      console.log('Cannot remove order', err);
    }
  };
}

export function onRemoveOrder(orderId) {
  return async (dispatch) => {
    try {
      await orderService.remove(orderId);
      showSuccessMsg('Order removed');
      return dispatch({
        type: 'REMOVE_ORDER',
        orderId,
      });
    } catch (err) {
      showErrorMsg('Cannot remove order');
      console.log('Cannot remove order', err);
    }
  };
}

export function onAddOrder(order) {
  return async (dispatch) => {
    const addedOrder = await orderService.add(order);
    try {
      dispatch({
        type: 'ADD_ORDER',
        order: addedOrder,
      });
      socketService.emit(
        'sendMsg',
        `You recieved a new order : ${order.stay.title}`
      );
      showSuccessMsg('✓  Your order has been recieved  ');
      return addedOrder;
    } catch (err) {
      showErrorMsg('✗  Your Order not received,please try again ');
      console.log('Cannot add order', err);
    }
  };
}

export function setGuests(order) {
  return async (dispatch) => {
    try {
      return dispatch({
        type: 'SET_GUESTS',
        order,
      });
    } catch (err) {
      console.log('Cannot set guests in order', err);
    }
  };
}

export function onEditOrder(orderToSave) {
  return async (dispatch) => {
    try {
      const savedOrder = orderService.updateOrder(orderToSave);

      dispatch({
        type: 'UPDATE_ORDER',
        order: savedOrder,
      });
      showSuccessMsg('Order updated');
    } catch (err) {
      showErrorMsg('Cannot update order');
      console.log('Cannot save order', err);
    }
  };
}

export function onUpdateOrder(order, newStatus) {
  return async (dispatch) => {
    try {
      order.status = newStatus;
      await orderService.updateOrder(order);
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        order: order,
      });
      showSuccessMsg('Order updated');
    } catch (err) {
      showErrorMsg('Cannot update order');
      console.log('Cannot save order', err);
    }
  };
}
