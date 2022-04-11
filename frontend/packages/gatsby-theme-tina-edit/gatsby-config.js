module.exports = {
  plugins: [
    "gatsby-theme-core-design-system",
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        enabled: true,
      },
    },
  ],
}