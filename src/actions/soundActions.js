import { UPDATE_SOUND } from './actionTypes';
import Immutable from 'immutable';

export function updateSound(sound, addedSound) {
  const newSound = Immutable.fromJS(addedSound);
  const oldSound = Immutable.fromJS(sound);
  const currentSound = oldSound.mergeDeep(newSound);
  return {
    type: UPDATE_SOUND,
    sound: currentSound.toJS(),
  };
}
