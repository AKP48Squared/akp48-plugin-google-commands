var self = this;
function Google(API_KEY) {
  this.api_key = API_KEY || '';
  this.google = require('googleapis');
}

Google.prototype.urlShortener = function (url) {
  return new Promise((res, rej) => {
    self.google.urlShortener('v1').insert({longURL: url, key: self.API_KEY}, (err, resp) => {
      if(err) {rej(err); return;}
      res(resp.shortURL);
    });
  });
};

module.exports = Google;
