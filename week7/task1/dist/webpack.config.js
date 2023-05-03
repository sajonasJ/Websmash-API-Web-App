const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    output: { filename: 'app.bundle.js', path: __dirname + '/dist' },
    module: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }]//css style
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html'}),//html
        new CleanWebpackPlugin()//clean
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                loader: 'file-loader',
                options: { outputPath: 'assets', esModule: false },//assets
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: { esModule: false },//html 
            },
        ]
    }
};