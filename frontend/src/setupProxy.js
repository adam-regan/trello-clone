const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('http://localhost:3000/api', { target: 'http://localhost:5000', changeOrigin: true }))
}
