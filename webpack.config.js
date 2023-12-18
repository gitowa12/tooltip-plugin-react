const path = require("path");
const KintonePlugin = require("@kintone/webpack-plugin-kintone-plugin");

module.exports = {
  // webpack でバンドルする js のファイルを指定する
  mode: "development",
  entry: {
    desktop: "./src/desktop/index.js",
    config: "./src/config/index.js",
  },
  output: {
    path: path.resolve(__dirname, "plugin", "js"),
    filename: (pathData) => {
      return pathData.chunk.name === "config" ? "config.js" : "desktop.js";
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          // {
          //   loader: "ts-loader",
          //   options: {
          //     configFile: path.resolve(__dirname, "tsconfig.json"),
          //   },
          // },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "plugin", "html", "config.html"),
    },
    port: 3000,
  },
  // devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  target: "web",
  // プラグインのパッケージングに必要なファイルのパスを設定する
  plugins: [
    new KintonePlugin({
      manifestJSONPath: "./plugin/manifest.json",
      privateKeyPath: "./private.ppk",
      pluginZipPath: "./dist/plugin.zip",
    }),
  ],
};
