import {
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
  default:
    return state;
  }
}
