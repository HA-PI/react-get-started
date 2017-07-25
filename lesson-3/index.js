var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var crypto = require('crypto');
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

var config = require("./webpack.config.js");


var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: './build',
    detool: 'source-map',
    stats: {
        colors: true,
        progress: true
    },
    publicPath: '/'
});
server.listen(8080);