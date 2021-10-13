import { userService } from '../services/user.service.js';

const loggedUser = userService.getLoggedinUser();

const initialState = {
  user: loggedUser ? loggedUser : null,
  // savedStays: [],
  savedNotifications:[],
  watchedUser: null,
  notifiStatus:false
};
export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_USER':
      newState = { ...state, user: action.user };
      break;
    case 'SET_WATCHED_USER':
      newState = { ...state, watchedUser: action.user };
      break;
    case 'REMOVE_USER':
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
      break;
    case 'SET_USERS':
      newState = { ...state, users: action.users };
      break;
    case 'LOAD_ORDERS_FROM_USER':
      newState = { ...state, orders: action.orders };
      break;
    case 'REMOVE_ORDER_FROM_USER':
      newState = {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.orderId), 
      };
      break;

    case 'ADD_ORDER_TO_USER': {
      newState = { ...state, orders: [...state.orders, action.order] };
      break;
    }
    case 'SAVE_STAY_TO_USER': {
      newState = { ...state, user: action.user };
      break;
    }
    case 'REMOVE_STAY_FROM_USER': {
      newState = { ...state, user: action.user };
      break;
    }
    case 'SAVE_NOTIFI_TO_USER': {
      newState = { ...state, user:{ ...state.user,savedNotifications: [...state.user.savedNotifications,action.notifi]}};
      break;
    }
    case 'SET_NOTIFI_STATUS': {
      newState = { ...state,notifiStatus:action.status};
      break;
    }
    case 'LOAD_USER_STAYS': {
      newState = { ...state, savedStays: [...action.stays] };
      break;
    }
 
    default:
  }
 
  return newState;
}
// newState = { ...state, savedNotifications: [...state.savedNotifications, action.notifi] };
