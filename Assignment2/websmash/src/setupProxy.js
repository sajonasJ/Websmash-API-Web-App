const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://google.com',
      changeOrigin: true,
      followRedirects: true
    })
  );
}