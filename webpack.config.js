const moment = require("moment");
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist"
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}