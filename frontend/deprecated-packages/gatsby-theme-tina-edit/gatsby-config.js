module.exports = {
  plugins: [
    "gatsby-theme-core-design-system",
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        editPath: `/edit/page`,
        enabled: true,
        toolbar: true,
        sidebar: {
          position: `overlay`,
        },
      },
    },
  ],
}
