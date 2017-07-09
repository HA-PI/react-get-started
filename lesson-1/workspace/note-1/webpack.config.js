/**
 * Created by admini161015 on 2017/4/9.
 */
var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry:'./note/js/main.js',
    output:{
        path:path.resolve(__dirname,'./build'),
        filename:'bundle.js'
    },
    devtool:'source-map',
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.less$/,
                loader:'style-loader!less-loader'
            },
            {
                test:/\.js$/,
                loader:'react-hot-loader!babel-loader',
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:'body',
            title:'Note'
        })]
};