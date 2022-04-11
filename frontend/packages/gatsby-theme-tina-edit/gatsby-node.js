var webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process",
        util: "util"
      }),
    ],
    resolve: {
      fallback: {
        process: "process",
        util: "util"
      }
    },
  })
}