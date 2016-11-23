import React, {Component, PropTypes} from 'react';

class Header extends Component {
  handleCameraToggle() {
    this.props.toggleCamera();
    this.props.createStream();
  }

  render() {
    const {editorMode, devices} = this.props;
    return (
      <div className="header-buttons" style={{width: `${this.props.width}px`}}>
        <button
          className={(!editorMode && devices.length > 1) ? 'btn btn_switch' : 'hidden'}
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
  width: PropTypes.number.isRequired
};

export default Header;
