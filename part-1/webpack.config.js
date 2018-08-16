const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  devtool: "source-map",

  mode: "development",

  entry: {
    app: "./assets/js/index.jsx",
    styles: "./assets/scss/app.scss"
  },

  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "js/[name].js"
  },

  resolve: {
    extensions: [".web.js", ".js", ".json", ".web.jsx", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css"
    })
  ]
};
