const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './background.js',
    contentScript: './content.js',
    'popup/popup': './popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "manifest.json" },
        { from: "popup/popup.html", to: "popup" },
        { from: "popup/popup.css", to: "popup" },
        { from: "assets", to: "assets" }
      ],
    }),
  ],
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['.js']
  }
};
