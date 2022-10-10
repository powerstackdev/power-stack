var webpack = require("webpack")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /\@nosferatu500/,
            use: loaders.null(),
          },
        ],
      },
      plugins: [
        new webpack.ProvidePlugin({
          stream: "stream-browserify",
          url: "url",
        }),
      ],
      resolve: {
        fallback: {
          stream: "stream",
          url: "url",
        },
      },
    })
  } else {
    actions.setWebpackConfig({
      plugins: [
        new webpack.ProvidePlugin({
          stream: "stream-browserify",
          url: "url",
        }),
      ],
      resolve: {
        fallback: {
          stream: "stream-browserify",
          url: "url",
        },
      },
    })
  }
}
