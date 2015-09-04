import React, {Component, PropTypes} from 'react';

export default class Home extends Component {
  static propTypes = {
    sounds: PropTypes.object,
    scores: PropTypes.object,
  }

  componentDidMount() {
    require('lib/nexusUI');
    window.onload();
  }

  render() {
    return (
      <section>
        <canvas data-nx="joints"></canvas>
      </section>
    );
  }
}
