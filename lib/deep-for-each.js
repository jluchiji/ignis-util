/**
 * deep-map.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deepForEach;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function deepForEach(obj) {
  var iterator = arguments.length <= 1 || arguments[1] === undefined ? _lodash2['default'].noop : arguments[1];

  _lodash2['default'].forEach(obj, function (v, k) {
    iterator(v, k, obj);
    if (typeof v === 'object') {
      deepForEach(v, iterator);
    }
  });
}

module.exports = exports['default'];
//# sourceMappingURL=deep-for-each.js.map
