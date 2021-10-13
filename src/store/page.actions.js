export function changePage(pageName) {
  return async (dispatch) => {
    try {
      const currPage = await pageName;
      dispatch({ type: 'SET_PAGE', currPage });
    } catch (err) {
      console.log('currPage : err ', err);
    }
  };
}
export function setModalPos(modalPos) {
  return async (dispatch) => {
    try {
      // console.log('modalPos in page actions is', modalPos);
      // const currPage = await pageName;
      dispatch({
        type: 'SET_MODAL_POS',
        modalPos,
      });
    } catch (err) {
      console.log('modalPos : err ', err);
    }
  };
}
export function setPos(relativePos) {
  return async (dispatch) => {
    try {
      // const currPage = await pageName;
      dispatch({
        type: 'SET_POS',
        relativePos,
      });
    } catch (err) {
      console.log('modalPos : err ', err);
    }
  };
}
