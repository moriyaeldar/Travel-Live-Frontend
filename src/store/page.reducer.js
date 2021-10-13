const initialState = {
  currPage: '',
  modalPos: null,
  modalBottom: '',
  modalLeft: '',
  relativePos: {
    left: 0,
    top: 0,
  },
};
export function pageReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_PAGE':
      newState = { ...state, currPage: action.currPage };
      break;
    case 'SET_MODAL_POS':
      newState = { ...state, modalPos: action.modalPos };
      break;
    case 'SET_POS':
      newState = { ...state, relativePos: { ...action.relativePos } };
      break;

    default:
  }

  return newState;
}
