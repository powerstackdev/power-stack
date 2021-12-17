require("dotenv").config({
  path: `../.env`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby Drupal Admin Demo`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        prismPreset: 'night-owl',
        preset: '@theme-ui/preset-roboto',
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: process.env.GATSBY_DRUPAL_HOST + `/`,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "my-tinacms-plugin",
      options: {
        enabled: process.env.NODE_ENV !== "production",
        sidebar: {
          position: "displace",
          theme: {
            color: {
              primary: {
                light: "#007043",
                medium: "#007043",
                dark: "#007043",
              },
            },
          },
        },
      },
    },
  ],
};
