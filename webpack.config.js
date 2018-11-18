const path = require("path");
// Help from:
// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
module.exports = {
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
};
