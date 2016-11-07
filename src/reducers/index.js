import {combineReducers} from 'redux';

import uiReducer from './ui';
import streamReducer from './stream';
import sourceReducer from './source';
import filterReducer from './filters';
import errorsReducer from './errors';

export default combineReducers({
  uiReducer,
  streamReducer,
  sourceReducer,
  filterReducer,
  errorsReducer
});
