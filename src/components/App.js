import React, {Component, PropTypes} from 'react';

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
    return (
      <div className="index">
        <video autoPlay/>
        <button>Take a picture</button>
      </div>
    );
  }
}

AppComponent.propTypes = {
  stream: PropTypes.object.isRequired
};

export default AppComponent;
