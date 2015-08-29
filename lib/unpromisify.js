/**
 * util/unpromisify.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unpromisify;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * unpromisify(1)
 *
 * @description                Wraps a promise-returning function into a
 *                             universal function that returns a promise AND
 *                             accepts a node-style callback.
 * @param          {fn}        promise-returning function to wrap.
 * @returns        {Function}  Node-style callback-accepting function.
 */

function unpromisify(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var callback = function callback() {};

    /* If last argument is a callback, separate it out */
    if (typeof _lodash2['default'].last(args) === 'function') {
      callback = _lodash2['default'].last(args);
      args = _lodash2['default'].take(args, args.length - 1);
    }

    /* Call the function and wrap the promise */
    return _bluebird2['default']['try'](function () {
      return fn.apply(undefined, _toConsumableArray(args));
    }).nodeify(callback);
  };
}

module.exports = exports['default'];
//# sourceMappingURL=unpromisify.js.map