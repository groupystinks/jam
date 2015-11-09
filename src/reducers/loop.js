import {
  RESET_LOOP,
  INITIATE_LOOP,
  UPDATE_LOOP_ID,
} from '../actions/actionTypes';

const initialState = {
  loopID: [],
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
  case RESET_LOOP:
    return {
      ...state,
      loopID: [],
    };
  case UPDATE_LOOP_ID:
    return {
      ...state,
      loopID: action.loopID,
    };
  case INITIATE_LOOP:
    return {
      ...state,
      loopID: action.loopID,
    };
  default:
    return state;
  }
}
