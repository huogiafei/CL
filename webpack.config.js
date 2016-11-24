'use strict';
var webpack = require('webpack');
require("file?name=[path][name].[ext]?[hash]!./dir/file.png")

module.exports = {
    entry: './js/login.js',
    output: {
        path: './build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack'
                ]
            },

        ]
    },
    imageWebpackLoader: {
        mozjpeg: {
            quality: 65
        },
        pngquant: {
            quality: "65-90",
            speed: 4
        },
        svgo: {
            plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    }
}