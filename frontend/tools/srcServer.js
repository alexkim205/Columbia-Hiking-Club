// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync          from 'browser-sync';
// Required for react-router browserHistory
// see
// https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback   from 'connect-history-api-fallback';
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import httpProxyMiddleware  from 'http-proxy-middleware';
import config               from '../webpack.config.dev';
import {
  DEV_PORTS,
}                           from './exposePaths';

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: DEV_PORTS.server,
  ui: {
    port: DEV_PORTS.ui,
  },
  server: {
    baseDir: 'src',

    middleware: [
      historyApiFallback(),

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are
        // displayed to the console.
        noInfo: true,
        quiet: true,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false,
        },

        // for other settings see
        // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      // // proxy to localhost:/django
      // httpProxyMiddleware('/', {
      //   target: config.output.publicPath,
      //   ws: true,
      //   logLevel: 'error',
      //   changeOrigin: true,
      // }),
    ],
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html',
  ],
});
