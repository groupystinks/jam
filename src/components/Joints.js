/* global nx, joints1 */
import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import Colors from './ColorMe';
import PureRender from 'components/PureRender';
import {registerConductor} from 'components/jointsUtil';


const styles = {
  root: {
    margin: '0 auto',
    maxWidth: '500px',
  },
  canvas: {
    width: '80%',
  },
};

@connect(
  state => ({
    scores: state.score.scores,
  }),
)
@Radium
@PureRender
export default class Joints extends Component {
  static propTypes = {
    scores: PropTypes.object,
  }

  constructor() {
    super();
    this.conductor = '';
  }

  componentDidMount() {
    require('lib/nexusUI');
    window.onload();
    nx.onload = this._nxOnload();
    this.conductor = 'joints1';
    Tone.Transport.setInterval(() => {
      this.conductor = registerConductor(this.conductor);
    }, '1m');
  }

  _nxOnload = () => {
    nx.colorize(Colors.oceanBlue);
    Object.keys(nx.widgets).map((key) => {
      const instance = nx.widgets[key];
      instance.nodeSize = 20;
      instance.joints = [];
      instance.init();
      instance.draw();
    });
  }

  render() {
    const bars = ['first', 'second', 'third', 'fourth'];
    return (
      <section style={styles.root}>
        {bars.map((bar) =>
          <canvas
            data-nx="joints"
            key={bar}
            style={styles.canvas}>
          </canvas>
        )}
      </section>
    );
  }
}
