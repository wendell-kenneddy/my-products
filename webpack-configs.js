const path = require('path');

module.exports = [
  {
    mode: process.env.NODE_ENV,
    entry: __dirname + '/src/scripts/app.js',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'public', 'assets', 'scripts')
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    devtool: 'source-map'
  },

  {
    mode: process.env.NODE_ENV,
    entry: __dirname + '/src/scripts/service-worker.js',
    output: {
      filename: 'sw.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    devtool: 'source-map'
  }
];
