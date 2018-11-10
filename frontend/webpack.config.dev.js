import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import BundleTracker from 'webpack-bundle-tracker';
import {
  backendPath,
  frontendPath,
  DEV_SERVER,
} from './tools/exposePaths'


export default {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: {
    bundle: [
      // must be first entry to properly set public path
      './src/webpack-public-path',
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=${DEV_SERVER}__webpack_hmr&reload=true&__webpack_public_path=${DEV_SERVER}`,
      path.resolve(frontendPath, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
    ]
  },
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(frontendPath, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: DEV_SERVER,
    filename: '[name].[hash].js'
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({
      path: frontendPath,
      filename: './webpack-stats.json'
    }),
    new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    })
  ],
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')
              ],
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(backendPath, 'src', 'scss')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
