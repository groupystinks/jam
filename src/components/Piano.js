import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoreActions from 'actions/scoreActions';
import * as soundActions from 'actions/soundActions';

@connect(
  state => ({
    score: state.score,
    sounds: state.sound.sounds,
  }),
  dispatch => bindActionCreators({...scoreActions, ...soundActions}, dispatch),
)
export default class Piano extends Component {
  static propTypes = {
    score: PropTypes.object,
    updateScore: PropTypes.func,
    sounds: PropTypes.object,
    updateSound: PropTypes.func,
  }

  _onClick = () => {
    const reverb = new Tone.JCReverb(0.2);
    const pianoScore = {
      'Piano': [
				['0:0', 'c4', '8n'],
        ['0:0:3', 'c4', '8n'],
				['1:0', 'e4', '8n'],
        ['1:0:3', 'e4', '8n'],
				['2:0', 'a4', '8n'],
        ['2:0:3', 'a4', '8n'],
				['3:0', 'c4', '8n'],
        ['3:0:3', 'c4', '8n'],
      ]};
    this.props.updateScore(this.props.score.notes, this.props.score.scores, pianoScore);

    const pianoSound = new Tone.PolySynth(6, Tone.SimpleSynth).chain(reverb).toMaster();

    // setup config
    pianoSound.set({'volume': -20});

    this.props.updateSound(this.props.sounds, {Piano: pianoSound});
  }

  render() {
    const piano = this.props.sounds.Piano;
    // console.log(piano.volume.value);
    return (
      <section>
        <button onClick={this._onClick}>
          <span>Simple Piano</span>
        </button>
        <span>{piano && piano.get('volume')}</span>
      </section>
    );
  }
}
