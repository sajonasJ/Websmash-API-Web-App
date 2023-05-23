const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
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
};
