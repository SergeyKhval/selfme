import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

function reduxStore(initialState) {
  const logger = createLogger();
  const middleWare = applyMiddleware(thunk, logger);
  const store = createStore(rootReducer, initialState, middleWare);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloadign to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
