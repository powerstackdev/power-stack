module.exports = {
  plugins: [
    "gatsby-theme-core-design-system",
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `inter\:300,400,400i,500,600,700`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },
  ],
}
