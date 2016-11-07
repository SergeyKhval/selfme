import {combineReducers} from 'redux';

import uiReducer from './ui';
import streamReducer from './stream';
import errorsReducer from './errors';

export default combineReducers({
  uiReducer,
  streamReducer,
  errorsReducer
});
