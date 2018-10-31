var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var mode = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname,

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './static/js/index'
    ],

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
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    mode: mode,
    devtool: (mode === 'development') ? 'inline-source-map' : false,

};