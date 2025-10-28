const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/renderer/index.tsx',
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'renderer.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      path: false,
      fs: false
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      inject: 'body'
    })
  ],
  devServer: {
    port: 3000,
    hot: true,
    liveReload: false,
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false
      },
      webSocketTransport: 'ws',
      webSocketURL: {
        hostname: 'localhost',
        port: 3000,
        protocol: 'ws'
      }
    },
    static: {
      directory: path.join(__dirname, 'dist/renderer')
    },
    historyApiFallback: true
  }
};


