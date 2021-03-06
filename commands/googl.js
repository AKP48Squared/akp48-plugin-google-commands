function Googl() {
  this.names = ['googl'];
}

Googl.prototype.respond = function (context) {
  return context.GoogleAPI.urlShortener(context.text).then(function(url) {
    return url;
  }, function(err) {
    return `There was an error processing that: ${err}`;
  });
};

module.exports = Googl;
