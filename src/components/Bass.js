import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoreActions from 'actions/scoreActions';
import * as soundActions from 'actions/soundActions';
import PureRender from 'components/PureRender';


@connect(
  state => ({
    score: state.score,
    sounds: state.sound.sounds,
  }),
  dispatch => bindActionCreators({...scoreActions, ...soundActions}, dispatch),
)
@PureRender
export default class Bass extends Component {
  static propTypes = {
    score: PropTypes.object,
    updateScore: PropTypes.func,
    sounds: PropTypes.object,
    updateSound: PropTypes.func,
  }

  _onClick = () => {
    const bassScore = {
      'Bass': [
				['0:0', 'C2', '4n'],
				['1:0', 'A2', '2n'],
				['2:0', 'F2', '4n'],
				['3:0', 'C2', '2n'],
      ]};
    this.props.updateScore(this.props.score.notes, this.props.score.scores, bassScore);
    const bassSound = new Tone.MonoSynth({
      'volume': -10,
      'envelope': {
        'attack': 0.1,
        'decay': 0.3,
        'release': 2,
      },
      'filterEnvelope': {
        'attack': 0.01,
        'decay': 0.1,
        'sustain': 0.5,
        'min': 200,
        'max': 1200,
      },
    }).toMaster();
    this.props.updateSound(this.props.sounds, {Bass: bassSound});
  }

  render() {
    return (
      <button onClick={this._onClick}>
        <span>Simple Bass</span>
      </button>
    );
  }
}
