import React, {
  Component,
  PropTypes
} from 'react';
import * as actions from '../actions/';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Main from '../components/App';

class App extends Component {
  componentWillMount() {
    this.props.actions.createStream();
  }

  render() {
    return <Main stream={this.props.stream}/>;
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  stream: PropTypes.object
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    stream: state.streamReducer
  };
}
function mapDispatchToProps(act) {
  return dispatch => ({actions: bindActionCreators(act, dispatch)});

}
export default connect(mapStateToProps, mapDispatchToProps(actions))(App);
