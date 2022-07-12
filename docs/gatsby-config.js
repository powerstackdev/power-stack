module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Power Stack",
        description: "Defining digital experiences for the modern web",
        siteUrl: "https://example.com",
        author: 'Xavier Mirabelli-Montan',
        sections: [ 'Introduction', 'Core concepts', 'Development', 'Components', 'Guides', 'Reference' ],
        navItems: [{ title: 'Docs', url: '/docs/intro/overview' }, { title: 'Blog', url: '/blog' }, { title: 'Contribute', url: '/contribute' }],
        githubRepositoryURL: 'https://github.com/power-stack-dev/power-stack/',
      },
    },
    // `gatsby-transformer-documentationjs`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `source`,
    //     path: `${__dirname}/../frontend/packages`,
    //   },
    // },
  ],
};
