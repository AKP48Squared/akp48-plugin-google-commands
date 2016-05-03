function Googl() {
  this.names = ['googl'];
}

Googl.prototype.respond = function (context) {
  return `This will be a goo.gl link sometime.`;
};

module.exports = Googl;
