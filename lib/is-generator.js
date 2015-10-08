/**
 * is-generator.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license 2015 (C) Ricepo LLC. All Rights Reserved.
 * @description Various polyfills. Remove these as soon as native support
 *              arrives.
 */
/* eslint-disable no-extend-native */

/*!
 * Returns true if the function is a generator.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isGenerator;

function isGenerator(fn) {
  if (typeof fn !== 'function') {
    return false;
  }
  return fn.constructor.name === 'GeneratorFunction';
}

/*!
 * Monkey-patch Function.prototype
 */
Function.prototype.isGenerator = function () {
  return isGenerator(this);
};
module.exports = exports['default'];
//# sourceMappingURL=is-generator.js.map
