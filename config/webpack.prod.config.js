/*
 * webpack 配置
 */
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
    entry: {
        FrontEndMonitor: ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // 打包后的文件存放的地方
        filename: '[name].min.js', // 打包后输出文件的文件名
        chunkFilename: '[name].min.js',
        library: 'FrontEndMonitor', // 类库名称
        libraryTarget: 'umd', // 指定输出格式
        umdNamedDefine: true, // 会对UMD的构建过程中的AMD模块进行命名，否则就使用匿名的define
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0'],
                        plugins: ['transform-runtime'],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    // 删除输出路径下文件
    plugins: [new CleanWebpackPlugin()],
    mode: 'production',
}

module.exports = config
