const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/videos',
    createProxyMiddleware({
      target: 'https://api.pexels.com',
      changeOrigin: true,
      headers: {
        Authorization: 'vS9CdDTJeWceXZXxIwVWdiOoiRLeCN4LhA7Y1pe8lXOJGu2gfWjQzFJr',
      },
      pathRewrite: {
        '^/api/videos': '/videos',
      },
    })
  );

  app.use(
    '/api/flickr',
    createProxyMiddleware({
      target: 'https://www.flickr.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/flickr': '/services/rest',
      },
    })
  );

  app.use(
    '/api/youtube',
    createProxyMiddleware({
      target: 'https://www.googleapis.com/youtube/v3',
      changeOrigin: true,
      pathRewrite: {
        '^/api/youtube': '',
      },
    })
  );
};