var path = require('path');
var webpack = require('webpack');
var minimize = process.env.NODE_ENV === 'production';

var config = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'app/main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].main.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.optimize.CommonsChunkPlugin('react', 'react.js')
    ],
    module: {
        rules: [
            {
                use: ["react-hot-loader/webpack", "babel-loader"],
                exclude: [
                    /(node_modules|bower_components)/,
                ],
                test: /\.jsx?$/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "url-loader",
                    options: {limit: 10000, mimetype: 'application/font-woff'}
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: "file-loader"
            }
        ]
    }
}
if (minimize) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    )
} else {
    config.entry.app.unshift('react-hot-loader/patch', "webpack-dev-server/client?http://localhost:8080/", "webpack/hot/only-dev-server");
    // only- means to only hot reload for successful updates
    config.devtool = 'source-map';
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        // prints more readable module names in the browser console on HMR updates
    );
}

module.exports = config;