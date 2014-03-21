var frontend = require('../controllers/frontend');

module.exports = function (server) {
  /*jslint regexp: true */

  // ### Frontend routes
  server.get('/rss/', frontend.rss);
  server.get('/rss/:page/', frontend.rss);
  server.get('/tag/:slug/page/:page/', frontend.tag);
  server.get('/tag/:slug/', frontend.tag);
  server.get('/page/:page/', frontend.homepage);
  server.get('/portfolio/', frontend.homepage);
  server.get('/', function (req, res, next) {
    var redirect = {};
    redirect.path = '/index/';
    return frontend.single(redirect, res, next);
  });
  server.get('*', frontend.single);
};