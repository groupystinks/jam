import {
  RESET_SOUND,
  UPDATE_SOUND
} from '../actions/actionTypes';

const initialState = {
  sounds: {},
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
  case UPDATE_SOUND:
    return {
      ...state,
      sounds: action.sound,
    };
  case RESET_SOUND:
    return {
      ...state,
      sounds: {},
    };
  default:
    return state;
  }
}
