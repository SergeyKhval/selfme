import React, {Component, PropTypes} from 'react';

class AppComponent extends Component {
  render() {
    if (this.props.stream) {
      document.querySelector('video').srcObject = this.props.stream.stream;
    }
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
