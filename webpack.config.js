/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

    mode: 'production',

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
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new BundleAnalyzerPlugin({
            logLevel: 'warn',
            reportFilename: 'video-report.html',
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],

};
