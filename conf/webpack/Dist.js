'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const OfflinePlugin = require('offline-plugin');
const WebpackBaseConfig = require('./Base');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new OfflinePlugin({
          ServiceWorker: {
            events: true
          }
        })
      ]
    };
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dist';
  }
}

module.exports = WebpackDistConfig;
