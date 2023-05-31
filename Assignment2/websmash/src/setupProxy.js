const { createProxyMiddleware } = require('http-proxy-middleware');
const SpotifyWebApi = require('spotify-web-api-node');

// Setup Spotify API client with your credentials
const spotifyApi = new SpotifyWebApi({
  clientId: 'b385a7550af34cb2bde8a992baf52101',
  clientSecret: 'b9c8fbb8acd64a67b1c8c4861493a12b',
  redirectUri: 'https://localhost:3000'
});

// Function to authenticate the Spotify API client using the client credentials grant flow
const authenticate = async () => {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
}

module.exports = function (app) {

  // Middleware to proxy requests to the Pexels API
  app.use(
    '/api/videos',
    createProxyMiddleware({
      target: 'https://api.pexels.com',
      changeOrigin: true,
      headers: { Authorization: 'vS9CdDTJeWceXZXxIwVWdiOoiRLeCN4LhA7Y1pe8lXOJGu2gfWjQzFJr' },
      pathRewrite: { '^/api/videos': '/videos' }  // rewrite paths from /api/videos to /videos
    })
  );

  // Middleware to proxy requests to the Flickr API
  app.use(
    '/api/flickr',
    createProxyMiddleware({
      target: 'https://www.flickr.com',
      changeOrigin: true,
      pathRewrite: { '^/api/flickr': '/services/rest' } // rewrite paths from /api/flickr to /services/rest
    })
  );

  // Middleware to proxy requests to the YouTube API
  app.use(
    '/api/youtube',
    createProxyMiddleware({
      target: 'https://www.googleapis.com/youtube/v3',
      changeOrigin: true,
      pathRewrite: { '^/api/youtube': '' } // rewrite paths from /api/youtube to ''
    })
  );

  // Authenticate Spotify API client when server starts, log an error if it fails
  authenticate().catch(error => console.error('Failed to authenticate Spotify Web API:', error));

  // Middleware to proxy requests to the Spotify API
  app.use(
    '/api/spotify',
    createProxyMiddleware({
      target: 'https://api.spotify.com',
      changeOrigin: true,
      pathRewrite: { '^/api/spotify': '' }, // rewrite paths from /api/spotify to ''
      onProxyReq: async (proxyReq, req, res) => {
        if (!spotifyApi.getAccessToken()) {
          await authenticate();
        }
        // Set the Authorization header on outgoing requests to the Spotify API
        proxyReq.setHeader('Authorization', `Bearer ${spotifyApi.getAccessToken()}`);
      },
    })
  );
};
