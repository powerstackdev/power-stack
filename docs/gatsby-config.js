module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Power Stack",
        description: "Defining digital experiences for the modern web",
        siteUrl: "https://example.com",
        author: 'Xavier Mirabelli-Montan',
        sections: ['About', 'Guide', 'Core concepts','Components', 'Reference'],
        navItems: [{ title: 'Docs', url: '/docs/overview' }],
        githubRepositoryURL: 'https://github.com/power-stack-dev/power-stack/',
      },
    },
  ],
};
