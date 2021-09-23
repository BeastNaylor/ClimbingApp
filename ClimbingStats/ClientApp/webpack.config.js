var HTMLWebpackPlugin = require("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body",
});

module.exports = {
  entry: __dirname + "/src/index.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    filename: "index.js",
    path: __dirname + "/build",
    publicPath: "",
  },
  plugins: [HTMLWebpackPluginConfig],
};
