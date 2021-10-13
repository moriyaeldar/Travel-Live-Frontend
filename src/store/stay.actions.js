import { stayService } from '../services/stay.service.js';
import { userService } from '../services/user.service.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

export function loadStays(filter = {}) {
  return async (dispatch) => {
    try {
      const stays = await stayService.query(filter);
      dispatch({
        type: 'SET_STAYS',
        stays,
      });
      // dispatch({
      //   type: 'FILTER_STAYS',
      //   filter,
      // });
      return stays;
    } catch (err) {
      showErrorMsg('Cannot load stays');
      console.log('Cannot load stays', err);
    }
  };
}
export function filterStays(filter = null) {
  // return async (dispatch) => {
  //   try {
  //     const stays = await stayService.query(filter);
  //     dispatch({
  //       type: 'SET_STAYS',
  //       stays,
  //     });
  //   } catch (err) {
  //     showErrorMsg('Cannot load stays');
  //     console.log('Cannot load stays', err);
  //   }
  // };
}

export function onRemoveStay(stayId) {
  return (dispatch, getState) => {
    stayService
      .remove(stayId)
      .then(() => {
        console.log('Deleted Succesfully!');
        dispatch({
          type: 'REMOVE_STAY',
          stayId,
        });
        showSuccessMsg('Stay removed');
      })
      .catch((err) => {
        showErrorMsg('Cannot remove stay');
        console.log('Cannot remove stay', err);
      });
  };
}

export function onAddStay(stay) {
  return (dispatch) => {
    // const stay = stayService.getEmptyStay();
    const addedstay = stayService
      .save(stay)
      .then((savedStay) => {
        console.log('Added Stay', savedStay);
        dispatch({
          type: 'ADD_STAY',
          stay: savedStay,
        });
        showSuccessMsg('Stay added');
      })
      .catch((err) => {
        showErrorMsg('Cannot add stay');
        console.log('Cannot add stay', err);
      });
  };
}

export function onUpdateStay(stay) {
  return async (dispatch) => {
    try {
      const updatedStay = await stayService.save(stay);
      dispatch({
        type: 'UPDATE_STAY',
        updatedStay,
      });
      return stay;
    } catch (err) {
      showErrorMsg('Cannot update stay');
      console.log('Cannot  update stay', err);
    }
  };
}

export function onSetCurrStay(stayId) {
  return async (dispatch) => {
    try {
      const currStay = await stayService.getById(stayId);
      dispatch({
        type: 'SET_CURR_STAY',
        currStay,
      });
      return currStay;
    } catch (err) {
      showErrorMsg('Cannot onSetCurrStay ');
      console.log('Cannot  onSetCurrStay ', err);
    }
  };
}
