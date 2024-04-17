module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    config.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: '**/node_modules',
    }
    return config
  },
};
