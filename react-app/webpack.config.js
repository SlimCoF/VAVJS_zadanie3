const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('static'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'static')
        },
        port: 8080,
        compress: true
    }
};