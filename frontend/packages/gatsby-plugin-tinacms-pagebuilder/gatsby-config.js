module.exports = {
  plugins: [
    "gatsby-theme-core-design-system",
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        editPath: `/edit/`,
        enabled: true,
        toolbar: true,
        sidebar: {
          position: `displace`
        },
      },
    },
  ],
}