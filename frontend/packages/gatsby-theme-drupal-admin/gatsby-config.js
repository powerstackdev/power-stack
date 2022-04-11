const path = require("path")
module.exports = {
  plugins: [
    "gatsby-theme-core-design-system",
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: path.join(__dirname, "src/pages"),
      },
    },
  ],
}