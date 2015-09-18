import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {drawingNote} from 'components/drawing';
import randomAlpha from 'components/randomAlpha';
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

  constructor() {
    super();
    this.name = 'Bass-' + randomAlpha();
  }

  componentDidUpdate() {
    drawingNote(this.props.score, this.name, 150);
  }

  _onClick = () => {
    const name = this.name;
    const bassScore = {};
    bassScore[name] = [
				['0:0', 'c2', '4n'],
				['1:0', 'a2', '2n'],
				['2:0', 'f2', '4n'],
				['3:0', 'c2', '2n'],
    ];
    this.props.updateScore(this.props.score, bassScore);

    const sound = {};
    const texture = new Tone.MonoSynth({
      'volume': -10,
      'envelope': {
        'attack': 0.1,
        'decay': 0.3,
        'release': 2,
      },
      'filter': {
        'type': 'lowpass',
        'rolloff': -24,
        'Q': 6.0,
        'gain': 0.0,
      },
      'filterEnvelope': {
        'attack': 0.01,
        'decay': 0.1,
        'sustain': 0.5,
        'min': 200,
        'max': 1200,
      },
    }).toMaster();
    sound[name] = texture;
    this.props.updateSound(this.props.sounds, sound);
  }

  render() {
    return (
      <button onClick={this._onClick}>
        <span>Simple Bass</span>
      </button>
    );
  }
}
