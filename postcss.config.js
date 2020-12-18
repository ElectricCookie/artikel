const env = process.env.NODE_ENV;

module.exports = {
  plugins: [
    require('postcss-import'),

    require('postcss-url')({
      url: asset => {
        return asset.url;
      },
    }),

    require('autoprefixer'),

    require('postcss-preset-env')({
      stage: 1,
    }),
  ],
};