function Google(API_KEY) {
  this.api_key = API_KEY || '';
  this.google = require('googleapis');
}

Google.prototype.urlShortener = function (url) {
  var self = this;
  return new Promise((res, rej) => {
    self.google.urlshortener({ version: 'v1', auth: self.api_key }).url.insert({resource: {longUrl: url}}, (err, resp) => {
      if(err) {rej(err); return;}
      res(resp.id || 'No URL returned.');
    });
  });
};

module.exports = Google;
