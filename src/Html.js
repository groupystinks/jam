import React, {Component, PropTypes} from 'react';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    webpackStats: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {webpackStats, component, store} = this.props;
    const title = 'JAM';
    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <title>{title}</title>
          <meta property="og:site_name" content={title}/>
          <meta property="og:locale" content="en_US"/>
          <meta property="og:title" content={title}/>
          <meta property="twitter:title" content={title}/>

          <link rel="shortcut icon" href="/favicon.ico" />

          <script type="text/javascript" src="http://cdn.tonejs.org/latest/Tone.min.js"></script>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: React.renderToString(component)}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          {webpackStats.script.map((src, k) => <script key={k} src={src} />)}
        </body>
      </html>
    );
  }
}
