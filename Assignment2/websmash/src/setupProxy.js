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


// GET https://youtube.googleapis.com/youtube/v3/search?part=diablo%204&channelType=any&maxResults=10&order=relevance&type=video&videoEmbeddable=true&videoSyndicated=true&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json


// GET https://www.googleapis.com/youtube/v3/search
// type=video