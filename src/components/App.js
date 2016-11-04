import React, {Component, PropTypes} from 'react';

import './app.scss';

class AppComponent extends Component {
  componentDidUpdate() {
    this.setVideoStream();
  }

  setVideoStream() {
    const video = document.querySelector('video');
    const {stream} = this.props.stream;

    if (stream) {
      video.srcObject = stream;
    }
  }

  render() {
    const {error} = this.props.error;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}
        <video autoPlay/>
        <button><i className="fa fa-camera" /></button>
      </div>
    );
  }
}

AppComponent.propTypes = {
  stream: PropTypes.object.isRequired,
  error: PropTypes.object
};

export default AppComponent;
