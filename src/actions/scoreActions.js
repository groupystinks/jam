import { UPDATE_SCORE } from './actionTypes';
import Immutable from 'immutable';

export function updateScore(score, addedScore) {
  const newScore = Immutable.fromJS(addedScore);
  const oldScore = Immutable.fromJS(score);
  const currentScore = oldScore.mergeDeep(newScore);
  return {
    type: UPDATE_SCORE,
    score: currentScore.toJS(),
  };
}
