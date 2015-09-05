import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetScore} from 'actions/scoreActions';
import {resetSound} from 'actions/soundActions';

@connect(
  state => ({
    scores: state.score.scores,
    notes: state.score.notes,
  }),
  dispatch => bindActionCreators({resetScore, resetSound}, dispatch),
)
export default class Resetting extends Component {
  static propTypes = {
    notes: PropTypes.array,
    scores: PropTypes.object,
    resetScore: PropTypes.func,
    resetSound: PropTypes.func,
  }

  _onClick = () => {
    const cleanUPList = this.props.notes.map((note) => new Promise((resolve, reject) => {
      if (!Tone.Transport.clearTimeline(note._timelineID)) {
        reject(false);
      }
      note.value = null;

      resolve(true);
    }));

    Promise.all(cleanUPList)
    .then(() => {
      Tone.Transport.dispose();
      this.props.resetScore();
      this.props.resetSound();
    });
  }

  /* noteDispose to replace Tonejs's broken dispose */
  _noteDispose = () => {
    Tone.Note.prototype.dispose = function dispose() {
      Tone.Transport.clearTimeline(this._timelineID);
      this.value = null;
      return this;
    };
    Tone.Note.prototype.dispose();
  };

  render() {
    return (
      <button onClick={this._onClick}>
        <span>Reset</span>
      </button>
    );
  }
}
