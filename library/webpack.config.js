const path = require('path')
const nodeExternals = require('webpack-node-externals')

const webConfig = {
  target: "web",
  entry: {
    ripple: ["./src/entry.umd.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].umd.js"
  }
}

const nodeConfig = {
  target: "node",
  mode: 'production',
  devtool: '#source-map',
  entry: {
    ripple: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: '[name].js',
    chunkFilename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()]
}

module.exports = [ webConfig, nodeConfig ]