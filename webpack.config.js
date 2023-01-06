const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',

    // basedir
    context: path.resolve(__dirname, 'src'),

    // devserver
    devServer: {
        static: './',
        open: true,
        hot: true
    },

    watchOptions: {
        ignored: /node_modules/
    },

    // input
    entry: ['./index.js', './style.scss'],

    // output
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ],
    },

    // plugins
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        // create dist/index.html
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        // update modules without reload
        new webpack.HotModuleReplacementPlugin(),
    ],
};
