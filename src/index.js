import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './stores';
import App from './containers/App';
import runtime from 'offline-plugin/runtime';

runtime.install({
  onUpdating: () => {
    console.log('SW Event:', 'onUpdating'); // eslint-disable-line no-console
  },
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady'); // eslint-disable-line no-console
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated'); // eslint-disable-line no-console
    // Reload the webpage to load into the new version
    window.location.reload();
  },

  onUpdateFailed: () => {
    console.log('SW Event:', 'onUpdateFailed'); // eslint-disable-line no-console
  }
});

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('app')
);
