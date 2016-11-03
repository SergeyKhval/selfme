import {combineReducers} from 'redux';

import streamReducer from './stream';
import errorsReducer from './errors';

export default combineReducers({
  streamReducer,
  errorsReducer
});
