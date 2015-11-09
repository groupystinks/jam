/* global Tone */
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import Resetting from 'components/Resetting';
import Bass from 'components/Bass';
import Piano from 'components/Piano';
import Joints from 'components/Joints';
import * as scoreActions from 'actions/scoreActions';
import * as loopActions from 'actions/loopActions';
import PureRender from 'components/PureRender';

@connect(
  state => ({
    loopID: state.loop.loopID,
    sounds: state.sound.sounds,
    scores: state.score.scores,
  }),
  dispatch => bindActionCreators({...scoreActions, ...loopActions}, dispatch),
)
@PureRender
export default class Home extends Component {
  static propTypes = {
    notes: PropTypes.array,
    initiateLoop: PropTypes.func,
    resetLoop: PropTypes.func,
    sounds: PropTypes.object,
    scores: PropTypes.object,
  }

  componentDidMount() {
    Tone.Note.parseScore(this.props.scores);

    Tone.Transport.loop = true;
    // set beats per minute
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
    this.props.resetLoop(this.props.loopID);
    Tone.Transport.stop();
  }

  _onTransportClick = () => {
    const state = Tone.Transport.state;
    if (state === 'started') {
      this.props.resetLoop(this.props.loopID);
      Tone.Transport.stop();
    } else {
      Tone.Transport.start();
    }
  }

  render() {
    return (
      <div>
        <Resetting />
        <Bass />
        <Piano />
        <button onClick={this._onTransportClick}>
          <span>Transport</span>
        </button>
        <Joints />
      </div>
    );
  }
}
