import {
  RESET_SCORE,
  UPDATE_SCORE
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
  default:
    return state;
  }
}
