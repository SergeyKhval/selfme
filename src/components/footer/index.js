import React, {Component, PropTypes} from 'react';
import uuid from 'node-uuid';

class Footer extends Component {
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

  handleFiltersToggle() {
    this.props.toggleFilters();
  }

  handleChangeResolution(e) {
    const {width, height} = e.target.dataset;
    this.props.toggleEditor(false);
    this.props.createStream(width, height);
  }

  render() {
    const {editorMode, source} = this.props;

    return (
      <div className="footer-buttons" style={{width: `${this.props.width}px`}}>
        <div className="footer-buttons__left">
          <button
            className={editorMode ? 'btn btn_filters' : 'hidden'}
            onClick={::this.handleFiltersToggle}>
            <i className="fa fa-cogs" aria-hidden="true"/>
          </button>

          <a
            href={source.filtered || source.original}
            download={`${uuid.v4()}.png`}
            className={editorMode ? 'btn btn_save' : 'hidden'}>
            <i className="fa fa-floppy-o" aria-hidden="true"/>
          </a>
        </div>

        <div className="footer-buttons__right">
          <button
            className="btn btn_resolution"
            data-width="640"
            data-height="480"
            onClick={::this.handleChangeResolution}>SD
          </button>

          <button
            className="btn btn_resolution"
            data-width="1280"
            data-height="720"
            onClick={::this.handleChangeResolution}>HD
          </button>


          <button
            onClick={::this.handleShotClick}
            className={editorMode ? 'hidden' : 'btn btn_shot'}>
            <i className="fa fa-camera"/>
          </button>

          <button
            className={editorMode ? 'btn btn_back' : 'hidden'}
            onClick={::this.handleBackClick}>
            <i className="fa fa-undo" aria-hidden="true"/>
          </button>
        </div>

      </div>
    );
  }
}

Footer.propTypes = {
  editorMode: PropTypes.bool.isRequired,
  source: PropTypes.object.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired,
  createStream: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

export default Footer;
