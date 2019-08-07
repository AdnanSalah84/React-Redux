const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    mode: "development",
    target: "web",
    devtool: "cheap-module-source-map", // Source maps let us see our original code when debugging in the browser
    entry: "./src/index",
    output: { // Webpack does not outpu code in development mode. It serves our app from memory
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    devServer: {
        stats: "minimal",
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        https: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            favicon: "src/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};