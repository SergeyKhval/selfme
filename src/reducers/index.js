import {combineReducers} from 'redux';

import uiReducer from './ui';
import streamReducer from './stream';
import filterReducer from './filters';
import errorsReducer from './errors';

export default combineReducers({
  uiReducer,
  streamReducer,
  filterReducer,
  errorsReducer
});
