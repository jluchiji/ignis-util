/**
 * util/symbols.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

/*!
 * Fallback to strings when:
 *   1) Symbols are not supported;
 *   2) In development mode for easier object inspection.
 */
var _symbol = Symbol;
/* istanbul ignore next */
if (!_symbol || /dev/i.test(process.env.NODE_ENV)) {
  _symbol = function (name) {
    return '@@' + name + '.' + _shortid2['default'].generate();
  };
}
exports['default'] = _symbol;
module.exports = exports['default'];
//# sourceMappingURL=symbol.js.map
