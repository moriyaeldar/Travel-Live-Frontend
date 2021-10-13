const initialState = {
  orders: [],
  newOrder: {
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 0,
      kids: 0,
    },
  },
};

export function orderReducer(state = initialState, action = {}) {
  var newState = state;

  switch (action.type) {
    case 'LOAD_ORDERS':
      newState = { ...state, orders: action.orders };
      break;
    case 'SET_ORDER':
      newState = { ...state, orders: action.orders };
      break;
    case 'ADD_ORDER':
      newState = { ...state, orders: [action.order, ...state.orders] };
      break;
    case 'REMOVE_ORDER':
      newState = {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.orderId),
      };
      break;
    case 'UPDATE_ORDER':
      newState = {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.order._id ? action.order : order
        ),
      };
      break;
    case 'UPDATE_ORDER_STATUS':
      newState = {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.order._id ? action.order : order
        ),
      };
      break;
    case 'NEW_ORDER':
      newState = { ...state, newOrder: action.newOrder };
      break;
    case 'SET_GUESTS':
      newState = { ...state, newOrder: { ...action.order } };
      break;
    default:
  }
  window.orderState = newState;
  return newState;
}
