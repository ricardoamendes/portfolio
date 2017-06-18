var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var dev = process.env.NODE_ENV == 'development';

function getPlugins() {
    var plugins = [];
    plugins.push(new webpack.EnvironmentPlugin({NODE_ENV: process.env.NODE_ENV, DEBUG: dev}));
    plugins.push(new HtmlWebpackInlineSourcePlugin());
    plugins.push(new CopyWebpackPlugin([{ from: 'list.json' }]));
    plugins.push(new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html',
        filename: 'index.html',
        inject: 'body',
        inlineSource: '.js'
    }));
    if (!dev) {
        plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }));
    }
    return plugins;
}

module.exports = {
    entry: path.resolve(__dirname, './src/app/index'),
    devtool: 'source-map',
    resolve: {
        modules: [
            'src/app', 'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    output: {
        filename: 'bundle-[hash:6].js',
        path: __dirname + "/dist"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader', 'ts-loader']
            }
        ]
    },
    plugins: getPlugins()
};