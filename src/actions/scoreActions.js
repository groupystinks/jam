/* global Tone */

import { RESET_SCORE, UPDATE_SCORE } from './actionTypes';
import Immutable from 'immutable';

export function updateScore(notes, scores, addedScore) {
  const newScore = Immutable.fromJS(addedScore);
  const oldScore = Immutable.fromJS(scores);
  const currentScore = oldScore.mergeDeep(newScore).toJS();
  notes.map((note) => {
    Tone.Transport.clearTimeline(note._timelineID);
    note.value = null;
  });
  const currentNote = Tone.Note.parseScore(currentScore);
  return {
    type: UPDATE_SCORE,
    score: currentScore,
    note: currentNote,
  };
}

export function resetScore() {
  return {
    type: RESET_SCORE,
  };
}
