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

function expressify(fn, ignis) {
  var status = arguments.length <= 2 || arguments[2] === undefined ? 200 : arguments[2];

  /* Otherwise, unpromisify */
  return function (req, res, next) {
    return _bluebird2['default']['try'](function () {
      return fn(ignis, req);
    }).then(function (data) {
      res.status(status).send(data);next();
    })['catch'](next);
  };
}

module.exports = exports['default'];
//# sourceMappingURL=expressify.js.map
