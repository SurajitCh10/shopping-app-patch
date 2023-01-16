const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    next();
  });
};
