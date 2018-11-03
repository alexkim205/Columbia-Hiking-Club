const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


var mode = process.env.NODE_ENV || 'development';

var hotreloadJS = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
]

var JSFiles = [
    // Hike Blog
    'blog/hike_detail',
    'blog/hike_list',
    'blog/hike_register',

    // Accounts
    'accounts/login',
    'accounts/logged_out',
    // 'accounts/password_change',
    // 'accounts/password_change_done',
    'accounts/password_reset_form',
    'accounts/password_reset_done',
    'accounts/password_reset_confirm',
    'accounts/password_reset_complete',
    // 'accounts/password_reset_email',
]


function build_entries(listOfJS) {
    let entries = {}
    let hotter = ('production' === process.env.NODE_ENV ? [] : hotreloadJS)
    const STATIC_CONTEXT = path.resolve('./static/js')

    listOfJS.forEach(url => {
        entries[url] = [...hotter, path.resolve(STATIC_CONTEXT, url)]
    })
    return entries
}

function isExternal(module) {
    var context = module.context;

    if (typeof context !== 'string') {
        return false;
    }

    return context.indexOf('node_modules') !== -1;
}

var jsconfig = {
    context: __dirname,

    entry: build_entries(JSFiles),

    output: {
        path: path.resolve('./static/bundles'),
        filename: "[name]-[hash].js",
        publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                parallel: true,
                unused: true,
                dead_code: true, // big one--strip code that will never execute
                warnings: false, // good for prod apps so users can't peek behind curtain
                drop_debugger: true,
                conditionals: true,
                evaluate: true,
                drop_console: true, // strips console statements
                sequences: true,
                booleans: true,
                ie8: false,
                compress: {
                    warnings: false, // Suppress uglification warnings
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                },
                output: {
                    comments: false,
                },
            }

        }),
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
                // vendor chunk
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    test: /node_modules/,
                    priority: 10,
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
        },

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