import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';


function reduxStore(initialState) {
  const logger = createLogger();
  const enhancers = compose(autoRehydrate(),
    applyMiddleware(thunk, logger));
  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloadign to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  persistStore(store);

  return store;
}

export default reduxStore;
