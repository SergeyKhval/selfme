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
    const {editorMode, filtersVisible, videoDimensions} = this.props.ui;
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

        <div className="stage">
          <Header
            editorMode={editorMode}
            devices={devices}
            toggleEditor={toggleEditor}
            toggleCamera={toggleCamera}
            createStream={createStream}
            width={videoDimensions.width}
          />

          <video autoPlay className={editorMode ? 'video_hidden' : 'video'}/>
          <canvas className={editorMode ? 'canvas' : 'canvas_hidden'}/>

          <Footer
            editorMode={editorMode}
            source={source}
            setSource={setSource}
            toggleEditor={toggleEditor}
            toggleFilters={toggleFilters}
            width={videoDimensions.width}
            createStream={createStream}
          />

          <Filters
            filter={filter}
            source={source}
            setSource={setSource}
            filtersVisible={filtersVisible}
            toggleFilters={toggleFilters}
            width={videoDimensions.width}
          />
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
