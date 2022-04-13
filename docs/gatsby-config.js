module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Power Stack",
        description: "Defining digital experiences for the modern web",
        siteUrl: "https://example.com",
        author: 'Xavier Mirabelli-Montan',
        sections: ['About', 'Guide', 'Components', 'Reference'],
        navItems: [{ title: 'Docs', url: '/docs/getting-started' }],
        twitterAccount: 'xaviemirmon',
        githubRepositoryURL: 'https://github.com/power-stack-dev/power-stack/',
      },
    },
  ],
};
