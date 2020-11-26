var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
{
  target: "electron-main",
  entry: path.resolve(__dirname, "electron.js"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "electron.js"
  },
  node: {
    __dirname: false
  }
},
{
  target: "electron-renderer",
  entry: path.resolve(__dirname, 'js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'render.js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Aurial',
      template: 'src/index.electron.html'
    }),
    new CopyWebpackPlugin([{
      from: 'src/css',
      to: 'css'
    }]),
    new CopyWebpackPlugin([{  
      from: "src/static",
      to: 'static'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
					"plugins": [
						["transform-react-jsx", { "pragma": "h" }]
					],
          "presets": ["es2015", "stage-0"]
        }
      }
    ]
  }
}];
