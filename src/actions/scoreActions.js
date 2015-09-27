/* global Tone */
import { RESET_SCORE, UPDATE_SCORE, UPDATE_BPM } from './actionTypes';
import Immutable from 'immutable';

export function updateScore(score, addedScore) {
  const newScore = Immutable.fromJS(addedScore);
  const oldScore = Immutable.fromJS(score.scores);
  const currentScore = oldScore.mergeDeep(newScore).toJS();
  // clean old score instance
  score.notes.map((note) => {
    Tone.Transport.clearTimeline(note._timelineID);
    note.value = null;
  });
  // create current score instance
  const currentNote = Tone.Note.parseScore(currentScore);
  return {
    type: UPDATE_SCORE,
    score: currentScore,
    note: currentNote,
  };
}

export function resetScore(notes) {
  notes.map((note) => {
    Tone.Transport.clearTimeline(note._timelineID);
    note.value = null;
  });
  return {
    type: RESET_SCORE,
  };
}

export function updateBPM(rate) {
  Tone.Transport.bpm.value = rate;
  return {
    type: UPDATE_BPM,
    bpm: rate,
  };
}
