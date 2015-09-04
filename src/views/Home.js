import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Bass from 'components/Bass';
import Piano from 'components/Piano';
import Joints from 'components/Joints';

@connect(
  state => ({
    sounds: state.sound.sounds,
    scores: state.score.scores,
  }),
)
export default class Home extends Component {
  static propTypes = {
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
    Tone.Note.parseScore(this.props.scores);

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
