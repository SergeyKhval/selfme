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

    this.props.setSource(canvas);
  }

  handleBackClick() {
    this.props.toggleEditor(false);
  }

  handleCameraToggle() {
    console.log('toggled camera'); // eslint-disable-line no-console
  }

  handleShareClick() {
    console.log('clicked button to share'); // eslint-disable-line no-console
  }

  handleFiltersToggle() {
    console.log('toggle filters pane'); // eslint-disable-line no-console
  }

  handleAddFilterClick() {
    const img = new Image();
    const canvas = document.querySelector('canvas');

    img.src = this.props.source.png;

    this.props.filter.filter.reset();
    this.props.filter.filter.addFilter('sepia');

    const filteredImg = this.props.filter.filter.apply(img);

    canvas.getContext('2d').drawImage(filteredImg, 0, 0);
  }

  render() {
    const {error} = this.props.error;
    const {editorMode, cameras} = this.props.ui;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}

        <button
          className={editorMode ? 'button-back' : 'hidden'}
          onClick={::this.handleBackClick}>
          <i className="fa fa-undo" aria-hidden="true"/>
        </button>

        <button
          className={(!editorMode && cameras > 1) ? 'button-switch' : 'hidden'}
          onClick={this.handleCameraToggle}>
          <i className="fa fa-exchange" aria-hidden="true"/>
        </button>

        <video autoPlay className={editorMode ? 'hidden' : ''}/>
        <canvas className={editorMode ? '' : 'hidden'}/>

        <button
          onClick={::this.handleShotClick}
          className={editorMode ? 'hidden' : 'button-shot'}>
          <i className="fa fa-camera"/>
        </button>

        <button
          className={editorMode ? 'button-filters' : 'hidden'}
          onClick={this.handleFiltersToggle}>
          <i className="fa fa-cogs" aria-hidden="true"/>
        </button>

        <button
          className={editorMode ? 'button-share' : 'hidden'}
          onClick={this.handleShareClick}>
          <i className="fa fa-share-alt" aria-hidden="true"/>
        </button>

        <a
          href={this.props.source.png}
          download="canvas.png"
          className={editorMode ? 'button-save' : 'hidden'}>
          <i className="fa fa-floppy-o" aria-hidden="true"/>
        </a>


      </div>
    );
  }
}

AppComponent.propTypes = {
  ui: PropTypes.object,
  stream: PropTypes.object.isRequired,
  source: PropTypes.object,
  error: PropTypes.object,
  filter: PropTypes.object,
  toggleEditor: PropTypes.func,
  setSource: PropTypes.func
};

export default AppComponent;
