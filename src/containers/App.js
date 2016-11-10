import React, {
  Component,
  PropTypes
} from 'react';
import * as actions from '../actions/';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../components/App';

import './app.scss';

class App extends Component {
  componentWillMount() {
    this.props.actions.getCamerasCount();
    this.props.actions.createStream();
  }

  componentDidMount() {
    window.addEventListener('resize', this.props.actions.createStream);
  }

  render() {
    const {toggleEditorMode, setSource, toggleShareBlock, toggleFilters} = this.props.actions;

    return (<Main
      stream={this.props.stream}
      source={this.props.source}
      error={this.props.error}
      ui={this.props.ui}
      filter={this.props.filter}
      toggleEditor={toggleEditorMode}
      toggleShare={toggleShareBlock}
      toggleFilters={toggleFilters}
      setSource={setSource}
    />);
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  stream: PropTypes.object,
  source: PropTypes.object,
  error: PropTypes.object,
  filter: PropTypes.object,
  ui: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ui: state.uiReducer,
    stream: state.streamReducer,
    source: state.sourceReducer,
    filter: state.filterReducer,
    error: state.errorsReducer
  };
}

function mapDispatchToProps(act) {
  return dispatch => ({actions: bindActionCreators(act, dispatch)});

}
export default connect(mapStateToProps, mapDispatchToProps(actions))(App);
