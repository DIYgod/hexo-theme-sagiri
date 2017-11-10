/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {

    bail: true,

    devtool: 'source-map',

    entry: {
        'sagiri': './src/index.js'
    },

    output: {
        path: path.resolve(__dirname, 'source', 'js'),
        filename: '[name].min.js',
        publicPath: '/'
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            compact: true,
                            presets: ['env']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            DPLAYER_VERSION: `"${require('./package.json').version}"`,
            GIT_HASH: JSON.stringify(gitRevisionPlugin.version())
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,
                ascii_only: true
            },
            sourceMap: true
        })
    ],

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }

};
