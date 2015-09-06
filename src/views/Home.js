/* global Tone */
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Resetting from 'components/Resetting';
import Bass from 'components/Bass';
import Piano from 'components/Piano';
import Joints from 'components/Joints';
import PureRender from 'components/PureRender';

@connect(
  state => ({
    sounds: state.sound.sounds,
    scores: state.score.scores,
  }),
)
@PureRender
export default class Home extends Component {
  static propTypes = {
    updateNote: PropTypes.func,
    notes: PropTypes.array,
    sounds: PropTypes.object,
    scores: PropTypes.object,
  }

  componentDidMount() {
    Tone.Note.parseScore(this.props.scores);

    Tone.Transport.loop = true;
    Tone.Transport.bpm.value = 90;
    Tone.Transport.setLoopPoints(0, '4m');
  }

  componentDidUpdate() {
    Object.keys(this.props.sounds).map((key) => {
      Tone.Note.route(key, (time, note, duration) => {
        this.props.sounds[key].triggerAttackRelease(note, duration, time);
      });
    });
  }

  componentWillUnmount() {
    Tone.Transport.stop();
  }

  _onClick = () => {
    const state = Tone.Transport.state;
    if (state === 'started') {
      Tone.Transport.stop();
    } else { Tone.Transport.start(); }
  }

  render() {
    return (
      <div>
        <Resetting />
        <Bass />
        <Piano />
        <button onClick={this._onClick}>
          <span>Transport</span>
        </button>
        <Joints />
      </div>
    );
  }
}
