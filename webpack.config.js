const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: {
        inject: './src/inject.js',
        styles: './src/css/styles.css'
    },
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.svg$/,
                exclude: /(node_modules)/,
                use: ["@svgr/webpack"]
            },
            {
                test: /\.(css)$/,
                exclude: /(node_modules)/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles",
            path: path.resolve(__dirname, 'dist')
        }),
    ]
};