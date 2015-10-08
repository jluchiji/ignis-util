/**
 * test/util/error-is.spec.js
 *
 * @author  Denis-Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

const Chai           = require('chai');

Chai.use(require('chai-as-promised'));
const expect         = Chai.expect;

const errorIs        = require('../lib/error-is');

describe('errorIs(2)', function() {

  it('should reject non-error objects', function() {
    expect(errorIs(Object.create(null), Error)).to.be.false;
  });

  it('should accept if criteria is falsy', function() {
    expect(errorIs(new Error(), false)).to.be.true;
  });

  it('should check if error is an instance of criteria', function() {
    expect(errorIs(new TypeError(), Error)).to.be.true;
    expect(errorIs(new Error(), TypeError)).to.be.false;
  });

  it('should check if error name equals criteria', function() {
    const error = new Error();
    error.name = 'test';
    expect(errorIs(error, 'test')).to.be.true;
    expect(errorIs(error, 'foo')).to.be.false;
  });

  it('should check if error name matches criteria', function() {
    const error = new Error();
    error.name = 'test';
    expect(errorIs(error, /^test/)).to.be.true;
    expect(errorIs(error, /^tes$/)).to.be.false;
  });

  it('should check if error matches the criteria object', function() {
    const error = new Error();
    error.test = { foo: 'bar' };
    expect(errorIs(error, { 'test.foo': 'bar' })).to.be.true;
    expect(errorIs(error, { 'test.bar': 'foo' })).to.be.false;
  });

  it('should handle undefined error name', function() {
    const error = new Error();
    error.name = undefined;
    expect(errorIs(error, 'Error')).to.be.true;
  });

  it('should handle undefined error name and constructor name', function() {
    const error = new Error();
    error.name = undefined;
    error.constructor = undefined;
    expect(errorIs(error, 'Error')).to.be.false;
  });

  it('should throw if criteria type is unexpected', function() {
    expect(function() {
      errorIs(new Error(), 123);
    }).to.throw('Unexpected criteria type: ');
  })
;
});
