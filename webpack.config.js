var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, './build'), // 图片和 JS 会打包到这里来
        publicPath: '/build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, // 用 ! 来连接多个 loader

            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },// 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
            {
                test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            },
            {
        　　　　　　 test: /\.html$/,
        　　　　　　 loader: 'html-withimg-loader'
        　　　　}

        ]
    },
    resolve: {
        extensions: ['.js', '.json', 'coffee'],
        alias:{
            jquery:"jquery/dist/jquery.min.js"
        }
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        host:"0.0.0.0",
        // progress:true,
        port:8081 //端口你可以自定义/
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]

}
