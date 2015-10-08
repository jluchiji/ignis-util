/**
 * test/util/is-generator.spec.js
 *
 * @author  Denis-Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

const Chai           = require('chai');

Chai.use(require('chai-as-promised'));
const expect         = Chai.expect;

const isGenerator    = require('../lib/is-generator');


describe('isGenerator(1)', function() {

  it('should recognize a generator', function() {
    const fn = function*() { };
    const actual = isGenerator(fn);

    expect(actual).to.be.true;
  });

  it('should recognize a non-generator', function() {
    const fn = function() { };
    const actual = isGenerator(fn);

    expect(actual).to.be.false;
  });

  it('should recognize a generator (monkey-patch)', function() {
    const fn = function*() { };
    const actual = fn.isGenerator();

    expect(actual).to.be.true;
  });

  it('should recognize a non-generator (monkey-patch)', function() {
    const fn = function() { };
    const actual = fn.isGenerator();

    expect(actual).to.be.false;
  });

  it('should return false for non-function args', function() {
    const fn = 1;
    const actual = isGenerator(fn);

    expect(actual).to.be.false;
  });

});
