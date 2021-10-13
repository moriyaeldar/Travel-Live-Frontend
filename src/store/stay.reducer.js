const initialState = {
  stays: [],
  currStay: null,
  filterBy: {
    city: ''
    // stayType: ''
  }
};
export function stayReducer(state = initialState, action) {
  var newState = state;
  var stays;
  switch (action.type) {
    case 'SET_STAYS':
      newState = { ...state, stays: action.stays };
      break;
    case 'REMOVE_STAY':
      
      stays = state.stays.filter((stay) => stay._id !== action.stayId);
      newState = { ...state, stays };
      break;
    case 'ADD_STAY':
      newState = { ...state, stays: [...state.stays, action.stay] };
      break;
    case 'UPDATE_STAY':
      
      stays = state.stays.map((stay) => {
        return stay._id === action._id ? action : stay;
      });
      newState = { ...state, stays };
      break;
    
    case 'SET_CURR_STAY':
      newState = { ...state, currStay: action.currStay };
      break;
    case 'FILTER_STAYS':
      newState = { ...state, filterBy: action.filter   };
      break;

    default:
  }
  return newState;
}
