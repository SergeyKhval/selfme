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

  handleShotClick() {
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    this.props.toggleEditor(true);

    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  handleBackClick() {
    this.props.toggleEditor(false);
  }

  handleAddFilterClick() {
    this.props.filter.filter.addFilter('brightness', 1);
  }

  render() {
    const {error} = this.props.error;
    const {editorMode} = this.props.ui;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}

        <button
          className={editorMode ? 'button-back' : 'hidden'}
          onClick={::this.handleBackClick}>
          <i className="fa fa-undo" aria-hidden="true"/>
        </button>

        <video autoPlay className={editorMode ? 'hidden' : ''}/>
        <canvas className={editorMode ? '' : 'hidden'}/>

        <button
          onClick={::this.handleShotClick}
          className={editorMode ? 'hidden' : 'button-shot'}>
          <i className="fa fa-camera"/>
        </button>
      </div>
    );
  }
}

AppComponent.propTypes = {
  ui: PropTypes.object,
  stream: PropTypes.object.isRequired,
  error: PropTypes.object,
  filter: PropTypes.object,
  toggleEditor: PropTypes.func
};

export default AppComponent;
