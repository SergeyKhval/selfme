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


  handleFiltersToggle() {
    this.props.toggleFilters();
  }

  render() {
    const {editorMode, source} = this.props;

    return (
      <div className="footer-buttons" style={{width: `${this.props.width}px`}}>
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
          href={source.filtered || source.original}
          download={`${uuid.v4()}.png`}
          className={editorMode ? 'btn btn-save' : 'hidden'}>
          <i className="fa fa-floppy-o" aria-hidden="true"/>
        </a>
      </div>
    );
  }
}

Footer.propTypes = {
  editorMode: PropTypes.bool.isRequired,
  source: PropTypes.object.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
};

export default Footer;
