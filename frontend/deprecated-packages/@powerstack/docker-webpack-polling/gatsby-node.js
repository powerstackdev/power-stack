exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: "**/node_modules",
    },
  })
}
