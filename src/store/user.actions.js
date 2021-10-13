import { userService } from "../services/user.service";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import {
  socketService,
  SOCKET_EMIT_USER_WATCH,
  SOCKET_EVENT_USER_UPDATED,
} from '../services/socket.service.js';
import { orderService } from '../services/order.service.js';
import order from '../data/order.js';
import { stayService } from '../services/stay.service.js';
import { useReducer } from 'react';
import { utilService } from '../services/util.service.js'

export function onLogin(credentials) {
  return async (dispatch) => {
    try {
      const user = await userService.login(credentials);
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      showErrorMsg("Cannot login");
      console.log("Cannot login", err);
    }
  };
}

export function onSignup(credentials) {
  return async (dispatch) => {
    try {
      credentials.savedNotifications = [];
      console.log("!!!", credentials);
      var randomNum = utilService.getRandomIntInclusive(1, 100);
      var gender = randomNum > 50 ? "men" : "women";

      credentials.imgUrl = `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;
      const user = await userService.signup(credentials);
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      showErrorMsg("Cannot signup");
      console.log("Cannot signup", err);
    }
  };
}
export function onUpdateUser(credentials) {
  return async (dispatch) => {
    try {
      console.log('this is on update', credentials);
      const user = await userService.update(credentials)
      console.log('user in update', user);
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      showErrorMsg("Cannot signup");
      console.log("Cannot signup", err);
    }
  };
}

export function onLogout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({
        type: "SET_USER",
        user: null,
      });
      showSuccessMsg(`Goodbye my friend`);
    } catch (err) {
      showErrorMsg("Cannot logout");
      console.log("Cannot logout", err);
    }
  };
}

export function getCurrentUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser();
      dispatch({
        type: "SET_USER",
        user,
      });
      return user;
    } catch (err) {
      showErrorMsg("No user found");
      console.log("No user found", err);
    }
  };
}

export function loadAndWatchUser(userId) {
  return async (dispatch) => {
    try {
      const user = await userService.getById(userId);
      dispatch({ type: "SET_WATCHED_USER", user });
      socketService.emit(SOCKET_EMIT_USER_WATCH, userId);
      socketService.off(SOCKET_EVENT_USER_UPDATED);
      socketService.on(SOCKET_EVENT_USER_UPDATED, (user) => {
        console.log("USER UPADTED FROM SOCKET");
        dispatch({ type: "SET_WATCHED_USER", user });
      });
    } catch (err) {
      showErrorMsg("Cannot load user");
      console.log("Cannot load user", err);
    }
  };
}

export function saveStayToUser(stayId) {
  return async (dispatch) => {
    try {
      console.log("stayId saveStayToUser", stayId);
      const user = userService.getLoggedinUser();
      console.log("user saveStayToUser1", user);
      user.savedStays.push(stayId);
      await userService.update(user);
      showSuccessMsg("saved stay");
      dispatch({
        type: 'SAVE_STAY_TO_USER',
        user,
      });
    } catch (err) {
      showErrorMsg('Cannot save stay');
      console.log('Cannot save stay', err);
    }
  };
}
export function removeStayFromUser(stayId) {
  return async (dispatch) => {
    try {
      const user = userService.getLoggedinUser();
      const savedStays = user.savedStays.filter((savedStay) => savedStay !== stayId);
      await userService.update({ ...user, savedStays });
      showSuccessMsg('saved stay');
      dispatch({
        type: 'REMOVE_STAY_FROM_USER',
        user,
      });
    } catch (err) {
      showErrorMsg("Cannot save stay");
      console.log("Cannot save stay", err);
    }
  };
}

export function saveNotifiToUser(notifi) {
  return async (dispatch) => {
    console.log('!!!!!', notifi);
    try {
      let user = await userService.getLoggedinUser();
      user = { ...user, savedNotifications: [...user.savedNotifications, notifi] };

      user.savedNotifications.push(notifi);
      await userService.update(user);
      // user = await httpService.put(`user/${user._id}`, user);
      // if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
      dispatch({
        type: "SET_USER",
        user,
      });
    } catch (err) {
      console.log("Cannot save notifi", err);
    }
  };
}
export function setNotifiStatus(status){
  return (dispatch) => {
    try {
      dispatch({
        type: "SET_NOTIFI_STATUS",
        status
      });
    } catch (err) {
      console.log("Cannot update status", err);
    }
}
}
export function loadOrdersFromUser() {
  console.log("loadOrdersFromUser");
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser();
      const orders = await orderService.getOrders(user._id);
      dispatch({ type: "LOAD_ORDERS_FROM_USER", orders });
      return orders;
    } catch (err) {
      console.log("UserActions: err in loadOrdersFromUser", err);
    }
  };
}

export function onRemoveOrderFromUser(orderId) {
  return async (dispatch) => {
    try {
      await orderService.remove(orderId);
      showSuccessMsg("Order removed");
      return dispatch({
        type: "REMOVE_ORDER_FROM_USER",
        orderId,
      });
    } catch (err) {
      showErrorMsg("Cannot remove order");
      console.log("Cannot remove order", err);
    }
  };
}

export function loadStaysFromUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedinUser();
      // const userSavedStays=user.savedStays
      // const stays = await stayService.getUserStays(user);//do i need service
      const stays = user.savedStays;
      dispatch({ type: "LOAD_USER_STAYS", stays });
      return stays;
    } catch (err) {
      console.log("UserActions: err in loadStaysFromUser", err);
    }
  };
}

// export function addOrderToUser(order) {
//   return async (dispatch) => {
//     try {
//       const user = userService.getLoggedinUser();
//       user.orders.push(order._Id);

//       await userService.update(user);
//       showSuccessMsg('Order added');
//       dispatch({
//         type: 'ADD_ORDER_TO_USER',
//         order,
//       });
//     } catch (err) {
//       showErrorMsg('Cannot add order');
//       console.log('Cannot add order', err);
//     }
//   };
// }
