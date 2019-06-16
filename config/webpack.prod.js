var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = false;

module.exports = {
    mode: "production",
    devtool: 'cheap-module-eval-source-map',

    entry: './ag-grid-typed-editor.ts',

    externals: {
        'ag-grid-community': 'ag-grid-community',
    },

    output: {
        path: path.resolve('./'),
        publicPath: 'http://localhost:8080/',
        filename: 'ag-grid-typed-editor.js',
        libraryTarget: 'umd'
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    resolve: {
        extensions: ['.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {allowTsInNodeModules: true}
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, syntax: 'postcss-scss', plugins: [autoprefixer()]}
                    },
                ],
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
};
