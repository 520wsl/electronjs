module.exports = {
  outputDir: 'html',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: "./",
  devServer: {
    open: false
  }
};