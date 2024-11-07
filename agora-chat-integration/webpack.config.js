// webpack.config.js
const path = require('path');

module.exports = {
    entry: './src/index.js', // Your main React file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'AgoraChatIntegration',
        libraryTarget: 'window', // Exposes the library globally
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Transpile .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ],
                    },
                },
            },
            {
                test: /\.css$/, // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'], // Resolve these extensions
    },
    mode: 'production', // or 'development' for debugging
};
