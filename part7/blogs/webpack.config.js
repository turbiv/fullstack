const path = require('path');
const webpack = require("webpack");

const config = (env, argv) => {

  const backend_url = argv.mode === "production"
    ? 'https://someherokubackendserver.com'
    : "http://localhost:3003";

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      ],
    },
    plugins:[
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
};

module.exports = config;