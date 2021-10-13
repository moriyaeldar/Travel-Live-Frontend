import Axios from 'axios';

import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { userService } from './user.service';
// import { socketService, SOCKET_EVENT_ORDER_ADDED } from './socket.service';
import Orders from '../data/order.js';
import { utilService } from './util.service';
import { getCurrentUser } from '../store/user.actions';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
const listeners = [];
const STORAGE_KEY = 'orderDB';
let gOrders = Orders;
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/order/'
    : 'http://localhost:3030/api/order/';

const axios = Axios.create({
  withCredentials: true,
});

export const orderService = {
  add,
  query,
  remove,
  subscribe,
  getOrders,
  updateOrder,
  getById,
  newOrder,
};

async function query(userId, isHost) {
  return httpService.get('order', { userId, isHost });
}

function getById(orderId) {
  return httpService.get(`order/${orderId}`);
}

function remove(orderId) {
  return httpService.delete(`order/${orderId}`);
}

async function add(order) {
  const user = await userService.getLoggedinUser();
  const miniUser = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
  };
  const orderToSave = { ...order, user: miniUser };
  return httpService.post(`order`, orderToSave);
}

async function newOrder(order) {
  const user = await userService.getLoggedinUser();
  console.log('new order in service', order);
  const addedOrder = order;

  return addedOrder;
}

async function getOrders(userId) {
  const filterBy = {
    userId,
  };

  return httpService.get('order', filterBy);
}

async function updateOrder(order) {
  return httpService.put(`order`, order);
}

function subscribe(listener) {
  listeners.push(listener);
}

function _notifySubscribersOrdersChanged(orders) {
  listeners.forEach((listener) => listener(orders));
}

window.addEventListener('storage', () => {
  query().then((orders) => {
    _notifySubscribersOrdersChanged(orders);
  });
});
