/* global joints1, joints2, joints3, joints4, */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {drawingNote} from 'components/jointsUtil';
import randomAlpha from 'components/randomAlpha';
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

  constructor() {
    super();
    this.name = 'Piano-' + randomAlpha();
  }

  componentDidUpdate() {
    drawingNote(this.props.score, this.name, 50);
  }

  _onClick = () => {
    const name = this.name;
    const reverb = new Tone.JCReverb(0.2);
    const pianoScore = {};
    pianoScore[name] = [
				['0:0', 'c4', '8n'],
        ['0:0:3', 'c4', '8n'],
				['1:0', 'e4', '8n'],
        ['1:0:3', 'e4', '8n'],
				['2:0', 'a4', '8n'],
        ['2:0:3', 'a4', '8n'],
				['3:0', 'c4', '8n'],
        ['3:0:3', 'c4', '8n'],
    ];
    this.props.updateScore(this.props.score, pianoScore);

    // setup sound texture
    const sound = {};
    const texture = new Tone.PolySynth(6, Tone.SimpleSynth).chain(reverb).toMaster();
    sound[name] = texture;
    texture.set({'volume': -10});
    this.props.updateSound(this.props.sounds, sound);
  }

  render() {
    const piano = this.props.sounds.Piano;
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
