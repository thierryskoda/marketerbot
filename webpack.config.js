var nodeExternals = require('webpack-node-externals');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'build');
const INPUT = path.join(__dirname, 'app', 'app.js');

module.exports = {
  entry: INPUT,
  output: {
      path: OUTPUT_DIR,
      filename: 'main.js'
  },
  target: 'node',
  externals: [nodeExternals()], // exclude external modules
  module: {
    loaders: [{ test: /\.js$/, loaders: ['babel'], include: __dirname, exclude: /node_modules/ }]
  }
};
