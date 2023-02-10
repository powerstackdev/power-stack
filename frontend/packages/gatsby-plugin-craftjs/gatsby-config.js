module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        connectionString:`mongodb://root:example@mongo:27017/`,
        dbName: `layout`,
        collection: [`pages`]
      },
    },
  ],
}
