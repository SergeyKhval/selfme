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
    this.props.toggleCamera();
    this.props.createStream();
  }


  handleFiltersToggle() {
    this.props.toggleFilters();
  }

  handleAddFilterClick(e) {
    const img = new Image();
    const canvas = document.querySelector('canvas');
    const {filter} = e.target.dataset;

    img.src = this.props.source.original;

    this.props.filter.filter.reset();
    this.props.filter.filter.addFilter(filter);

    const filteredImg = this.props.filter.filter.apply(img);

    canvas.getContext('2d').drawImage(filteredImg, 0, 0);

    this.props.setSource(canvas, true);
  }

  resetFilters() {
    const img = new Image();
    const canvas = document.querySelector('canvas');

    img.src = this.props.source.original;

    this.props.filter.filter.reset();

    const filteredImg = this.props.filter.filter.apply(img);

    canvas.getContext('2d').drawImage(filteredImg, 0, 0);

    this.props.setSource(false, true);
  }

  render() {
    const {error} = this.props.error;
    const {editorMode, filtersVisible} = this.props.ui;
    const {devices} = this.props.stream;

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
            className={(!editorMode && devices.length > 1) ? 'btn btn-switch' : 'hidden'}
            onClick={::this.handleCameraToggle}>
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

          <a
            href={this.props.source.filtered || this.props.source.original}
            download="canvas.png"
            className={editorMode ? 'btn btn-save' : 'hidden'}>
            <i className="fa fa-floppy-o" aria-hidden="true"/>
          </a>
        </div>

        <div className={filtersVisible ? 'filters-pane filters-pane_visible' : 'filters-pane'}>
          <div className="filters-pane__header">
            <button className="filters-btn" onClick={::this.resetFilters}>
              Reset Filters
            </button>
            <button className="btn btn_flat" onClick={::this.handleFiltersToggle}>
              <i className="fa fa-times" aria-hidden="true"/>
            </button>
          </div>

          <div className="filters-pane__body">
            <button
              className="filters-btn"
              data-filter="negative"
              onClick={::this.handleAddFilterClick}>negative
            </button>
            <button
              className="filters-btn"
              data-filter="desaturate"
              onClick={::this.handleAddFilterClick}>desaturate
            </button>
            <button
              className="filters-btn"
              data-filter="desaturateLuminance"
              onClick={::this.handleAddFilterClick}>desaturateLuminance
            </button>
            <button
              className="filters-btn"
              data-filter="sepia"
              onClick={::this.handleAddFilterClick}>Sepia
            </button>
            <button
              className="filters-btn"
              data-filter="brownie"
              onClick={::this.handleAddFilterClick}>brownie
            </button>
            <button
              className="filters-btn"
              data-filter="vintagePinhole"
              onClick={::this.handleAddFilterClick}>vintagePinhole
            </button>
            <button
              className="filters-btn"
              data-filter="kodachrome"
              onClick={::this.handleAddFilterClick}>kodachrome
            </button>
            <button
              className="filters-btn"
              data-filter="technicolor"
              onClick={::this.handleAddFilterClick}>technicolor
            </button>
            <button
              className="filters-btn"
              data-filter="detectEdges"
              onClick={::this.handleAddFilterClick}>detectEdges
            </button>
            <button
              className="filters-btn"
              data-filter="sobelX"
              onClick={::this.handleAddFilterClick}>sobelX
            </button>
            <button
              className="filters-btn"
              data-filter="sobelY"
              onClick={::this.handleAddFilterClick}>sobelY
            </button>
            <button
              className="filters-btn"
              data-filter="polaroid"
              onClick={::this.handleAddFilterClick}>polaroid
            </button>

            <button
              className="filters-btn"
              data-filter="shiftToBGR"
              onClick={::this.handleAddFilterClick}>shiftToBGR
            </button>
          </div>
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
  toggleFilters: PropTypes.func.isRequired,
  toggleCamera: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired,
  createStream: PropTypes.func.isRequired
};

export default AppComponent;
