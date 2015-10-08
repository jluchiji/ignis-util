/**
 * util/expressify.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = expressify;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * expressify(2)
 *
 * @description                Wraps a promise-producing function into an
 *                             express middleware that responds with the promise
 *                             results if resolved; invokes error handler stack
 *                             if rejected.
 * @param          {fn}        Promise-producing handler function.
 * @param          {status}    Status code to return on success (default: 200).
 */

function expressify(fn) {
  var status = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

  /* If fn is a generator, use coroutines */
  if (fn.isGenerator()) {
    var _ret = (function () {
      var coroutine = _bluebird2['default'].coroutine(fn);
      return {
        v: function (req, res, next) {
          return coroutine(req).then(function (data) {
            return res.status(status).send(data);
          })['catch'](next);
        }
      };
    })();

    // istanbul ignore next
    if (typeof _ret === 'object') return _ret.v;
  }

  /* Otherwise, unpromisify */
  return function (req, res, next) {
    return _bluebird2['default']['try'](function () {
      return fn(req);
    }).then(function (data) {
      res.status(status).send(data);
    })['catch'](next);
  };
}

module.exports = exports['default'];
//# sourceMappingURL=expressify.js.map
