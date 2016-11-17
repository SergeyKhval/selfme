import React, {Component, PropTypes} from 'react';

class Header extends Component {
  handleBackClick() {
    this.props.toggleEditor(false);
  }

  handleCameraToggle() {
    this.props.toggleCamera();
    this.props.createStream();
  }

  render() {
    const {editorMode, devices} = this.props;
    return (
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
    );
  }
}

Header.propTypes = {
  editorMode: PropTypes.bool.isRequired,
  devices: PropTypes.array.isRequired,
  toggleEditor: PropTypes.func.isRequired,
  toggleCamera: PropTypes.func.isRequired,
  createStream: PropTypes.func.isRequired,
};

export default Header;
