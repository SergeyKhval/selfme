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

  handleButtonClick() {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  render() {
    const {error} = this.props.error;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}
        <video autoPlay/>
        <button onClick={this.handleButtonClick}><i className="fa fa-camera"/></button>
        <canvas />
      </div>
    );
  }
}

AppComponent.propTypes = {
  stream: PropTypes.object.isRequired,
  error: PropTypes.object
};

export default AppComponent;
