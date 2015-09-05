/* global nx, joints1 */
import React, {Component, PropTypes} from 'react';
import Colors from './ColorMe';

export default class Home extends Component {
  static propTypes = {
    sounds: PropTypes.object,
    scores: PropTypes.object,
  }

  componentDidMount() {
    require('lib/nexusUI');
    window.onload();
    nx.onload = this._nxOnload();
  }

  _nxOnload = () => {
    nx.colorize(Colors.oceanBlue);
    joints1.nodeSize = 20;
    joints1.animate('bounce');
    joints1.init();
    joints1.draw();
  }


  render() {
    return (
      <section>
        <canvas data-nx="joints"></canvas>
      </section>
    );
  }
}
