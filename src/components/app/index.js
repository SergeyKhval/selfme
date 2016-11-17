import React, {Component, PropTypes} from 'react';
import Filters from '../filters';
import Footer from '../footer';
import Header from '../header';

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

  render() {
    const {error} = this.props.error;
    const {editorMode, filtersVisible} = this.props.ui;
    const {devices} = this.props.stream;
    const {filter} = this.props.filter;
    const {
      toggleEditor,
      toggleCamera,
      createStream,
      setSource,
      toggleFilters,
      source
    } = this.props;

    const errorTemplate = error ? '<p>{error}</p>' : '';

    return (
      <div className="container">
        {errorTemplate}

        <Header
          editorMode={editorMode}
          devices={devices}
          toggleEditor={toggleEditor}
          toggleCamera={toggleCamera}
          createStream={createStream}
        />

        <video autoPlay className={editorMode ? 'hidden' : ''}/>
        <canvas className={editorMode ? '' : 'hidden'}/>

        <Footer
          editorMode={editorMode}
          source={source}
          setSource={setSource}
          toggleEditor={toggleEditor}
          toggleFilters={toggleFilters}
        />

        <Filters
          filter={filter}
          source={source}
          setSource={setSource}
          filtersVisible={filtersVisible}
          toggleFilters={toggleFilters}
        />

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
