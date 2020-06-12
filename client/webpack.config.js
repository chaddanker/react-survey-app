module: {
  rules: [
    {
      exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
      test: /\.js(x)?$/,
      use: [{ loader: 'babel-loader' }],
    }
  ],
}