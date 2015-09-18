import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clearDrawing} from 'components/drawing';
import {resetScore} from 'actions/scoreActions';
import {resetSound} from 'actions/soundActions';

@connect(
  state => ({
    score: state.score,
  }),
  dispatch => bindActionCreators({resetScore, resetSound}, dispatch),
)
export default class Resetting extends Component {
  static propTypes = {
    score: PropTypes.object,
    resetScore: PropTypes.func,
    resetSound: PropTypes.func,
  }

  _onClick = () => {
    clearDrawing();
    this.props.resetScore(this.props.score.notes);
    this.props.resetSound();
  }

  /* noteDispose to replace Tonejs's dispose */
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
