module.exports = {
  plugins: [
    {
      resolve: "smooth-doc",
      options: {
        name: "Power Stack",
        description: "Supercharging digital experiences for the modern web",
        siteUrl: "https://powerstack.dev",
        author: 'Xavier Mirabelli-Montan',
        sections: [ 'Introduction', 'Core concepts', 'Development', 'Components', 'Guides', 'Reference' ],
        navItems: [{ title: 'Docs', url: '/docs/intro/overview' }, { title: 'Roadmap', url: '/roadmap' }, { title: 'Get Involved', url: '/contributing' }],
        githubRepositoryURL: 'https://github.com/power-stack-dev/power-stack/',
      },
    },
    {
      resolve: '@slixites/gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'mulish:600,900', // you can also specify font weights and styles
        ],
        preconnect: true,
        attributes: {
          rel: 'stylesheet preload prefetch',
          as: 'style',
        },
        display: 'swap',
      },
    }
  ],
};
