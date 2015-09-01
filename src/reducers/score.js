import {
  UPDATE_SCORE
} from '../actions/actionTypes';

const initialState = {
  scores: {},
};

export default function update(state = initialState, action = {}) {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      scores: action.score,
    };
  default:
    return state;
  }
}
