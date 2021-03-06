import {
  RESET_SCORE,
  UPDATE_SCORE,
  UPDATE_BPM
} from '../actions/actionTypes';

const initialState = {
  scores: {},
  notes: [],
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      scores: action.score,
      notes: action.note,
    };
  case RESET_SCORE:
    return {
      ...state,
      scores: {},
      notes: [],
    };
  case UPDATE_BPM:
    return {
      ...state,
      beatsPerMinute: action.bpm,
    };
  default:
    return state;
  }
}
