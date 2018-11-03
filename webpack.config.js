const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

var mode = process.env.NODE_ENV || 'development';

var hotreloadJS = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
]

var jsconfig = {
    context: __dirname,

    entry: {
        index: [...hotreloadJS, './static/js/index'],
        hike_list: [...hotreloadJS, './static/js/hike_list'],
    },

    output: {
        path: path.resolve('./static/bundles'),
        filename: "[name]-[hash].js",
        publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new BundleTracker({filename: './webpack-stats.json'}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ]
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,

                // vendor chunk
                vendor: {
                    // name of the chunk
                    name: 'vendor',
                    // async + async chunks
                    chunks: 'initial',
                    // import file path containing node_modules
                    test: /node_modules/,
                    enforce: true
                },

                // common chunk
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        hot: true
    },
    mode: mode,
    devtool: ('production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map'),

}


module.exports = jsconfig