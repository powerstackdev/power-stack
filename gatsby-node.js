var webpack = require('webpack');




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
          stream: 'stream-browserify',
          util: "util",
          url: "url",
          process: "process"
        }),
      ],
      resolve: {
        fallback: {
          stream: 'stream',
          util: "util",
          url: "url",
          process: "process"
        }
      },
    })
  } else {
    actions.setWebpackConfig({
        plugins: [
          new webpack.ProvidePlugin({
            stream: 'stream-browserify',
            util: "util",
            url: "url",
            process: "process"
          }),
        ],
        resolve: {
          fallback: {
            stream: 'stream-browserify',
            util: "util",
            url: "url",
            process: "process"
          }
        },
      })
  }
}