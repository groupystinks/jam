/* global nx, joints1, joints2, joints3, joints4, */
function drawingNote(score, instrument, baseline = 0) {
  const scoreList = score.scores[instrument] || [];
  scoreList.map((sign) => {
    const timeSign = sign[0].split(':').map((strNum) => parseInt(strNum, 10));
    const bar = timeSign.shift() + 1;

    // summing up timeSign
    timeSign.unshift(0); /* always adding 0, placeholder element  */
    const beatSpotRatio = timeSign.reduce((pre, next, index) => {
      const timeFraction = Math.pow(1 / 4, index);
      return pre + timeFraction * next;
    });

    switch (bar) {
    case 1:
      const canvasWidth1 = joints1.width;
      joints1.joints.push({
        x: beatSpotRatio * canvasWidth1,
        y: baseline,
      });
      joints1.draw();
      break;
    case 2:
      const canvasWidth2 = joints2.width;
      joints2.joints.push({
        x: beatSpotRatio * canvasWidth2,
        y: baseline,
      });
      joints2.draw();
      break;
    case 3:
      const canvasWidth3 = joints3.width;
      joints3.joints.push({
        x: beatSpotRatio * canvasWidth3,
        y: baseline,
      });
      joints3.draw();
      break;
    case 4:
      const canvasWidth4 = joints4.width;
      joints4.joints.push({
        x: beatSpotRatio * canvasWidth4,
        y: baseline,
      });
      joints4.draw();
      break;
    default:
      return false;
    }
  });
}

function clearDrawing() {
  Object.keys(nx.widgets).map((key) => {
    // extract nexusUI widget name(no tailing number).
    const nexusWidget = key.replace(/\d+/, '');

    switch (nexusWidget) {
    case 'joints':
      nx.widgets[key].joints = [];
      nx.widgets[key].draw();
      break;

    default:
      return false;
    }
  });
}

module.exports = {
  drawingNote,
  clearDrawing,
};
