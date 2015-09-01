import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Bass from 'components/Bass';
import Piano from 'components/Piano';

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
    // add Note routes
    // const sounds = new Map(this.props.sounds);
    // for (const [key, value] of sounds.entries()) {
    //   Tone.Note.route(key, (time, note, duration) => {
    //     value.triggerAttackRelease(note, duration, time);
    //   });
    // }
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

  _onClickStart = () => {
    Tone.Transport.start();
  }

  _onClickEnd = () => {
    Tone.Transport.stop();
  }

  render() {
    return (
      <div>
        <Bass />
        <Piano />
        <button onClick={this._onClickStart}>
          <span>Transport Start</span>
        </button>
        <button onClick={this._onClickEnd}>
          <span>Transport End</span>
        </button>
      </div>
    );
  }
}
