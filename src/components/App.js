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
    this.props.toggleShare();
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
    const {editorMode, cameras, shareBlockVisible} = this.props.ui;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}

        <div className="header-buttons">
          <button
            className={editorMode ? 'btn btn-back' : 'hidden'}
            onClick={::this.handleBackClick}>
            <i className="fa fa-undo" aria-hidden="true"/>
          </button>

          <button
            className={(!editorMode && cameras > 1) ? 'btn btn-switch' : 'hidden'}
            onClick={this.handleCameraToggle}>
            <i className="fa fa-exchange" aria-hidden="true"/>
          </button>
        </div>

        <video autoPlay className={editorMode ? 'hidden' : ''}/>
        <canvas className={editorMode ? '' : 'hidden'}/>

        <div className="footer-buttons">
          <button
            onClick={::this.handleShotClick}
            className={editorMode ? 'hidden' : 'btn btn-shot'}>
            <i className="fa fa-camera"/>
          </button>

          <button
            className={editorMode ? 'btn btn-filters' : 'hidden'}
            onClick={::this.handleFiltersToggle}>
            <i className="fa fa-cogs" aria-hidden="true"/>
          </button>

          <button
            className={editorMode ? 'btn btn-share' : 'hidden'}
            onClick={::this.handleShareClick}>
            <i className="fa fa-share-alt" aria-hidden="true"/>
          </button>

          <a
            href={this.props.source.png}
            download="canvas.png"
            className={editorMode ? 'btn btn-save' : 'hidden'}>
            <i className="fa fa-floppy-o" aria-hidden="true"/>
          </a>
        </div>

        <div className={shareBlockVisible ? 'buttons-share' : 'buttons-share_hidden'}>
          <button className="btn btn-twitter">
            <i className="fa fa-twitter" aria-hidden="true"/>
          </button>
        </div>


      </div>
    );
  }
}

AppComponent.propTypes = {
  ui: PropTypes.object.isRequired,
  stream: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  error: PropTypes.object,
  filter: PropTypes.object.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  toggleShare: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired
};

export default AppComponent;
