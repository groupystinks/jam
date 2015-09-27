import {
  UPDATE_BPM
} from '../actions/actionTypes';

const initialState = {
  beatsPerMinute: 0,
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
  case UPDATE_BPM:
    return {
      ...state,
      beatsPerMinute: action.bpm,
    };
  default:
    return state;
  }
}
