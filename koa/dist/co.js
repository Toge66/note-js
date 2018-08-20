'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');
var fetch = require('node-fetch');

co( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var res, movie, summary;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch('https://api.douban.com/v2/movie/1291843');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          movie = _context.sent;
          summary = movie.summary;

          console.log(summary);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
//# sourceMappingURL=co.js.map