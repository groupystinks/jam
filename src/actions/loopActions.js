import {RESET_LOOP, UPDATE_LOOP_ID} from './actionTypes';

export function resetLoop(existedID) {
  nx.aniItems = [];
  existedID.map((id) => Tone.Transport.clearInterval(id));
  return {
    type: RESET_LOOP,
  };
}

export function updateLoopID(existedID, id) {
  existedID.push(id);
  return {
    type: UPDATE_LOOP_ID,
    loopID: existedID,
  };
}

// export function initiateLoop(existedID, id) {
//   const newIDs = existedID.push(id);
//   return {
//     type: INITIATE_LOOP,
//     loopID: newIDs,
//   };
// }
