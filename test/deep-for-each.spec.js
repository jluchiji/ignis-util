/**
 * test/util/deep-for-each.spec.js
 *
 * @author  Denis-Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

/* eslint-env mocha */

const Sinon          = require('sinon');
const Chai           = require('chai');

Chai.use(require('chai-as-promised'));
Chai.use(require('sinon-chai'));
const expect         = Chai.expect;

const deepForEach    = require('../lib/deep-for-each');


describe('deepForEach(2)', function() {

  it('should run iterator on level 1 items', function() {
    const value = {
      foo: 'bar'
    };
    const iterator = Sinon.spy();

    deepForEach(value, iterator);
    expect(iterator)
      .to.be.calledOnce.and
      .to.be.calledWith('bar', 'foo', value);
  });

  it('should run iterator on nested items', function() {
    const value = {
      test: {
        foo: 'bar'
      }
    };
    const iterator = Sinon.spy();

    deepForEach(value, iterator);
    expect(iterator)
      .to.be.calledTwice.and
      .to.be.calledWith(value.test, 'test', value).and
      .to.be.calledWith('bar', 'foo', value.test);
  });

  it('should ignore non-object properties', function() {
    const value = {
      test: { foo: 'bar' },
      hello: 'world'
    };
    const iterator = Sinon.spy();

    deepForEach(value, iterator);
    expect(iterator).to.be.calledTrice;
  });

  it('should allow undefined iterator', function() {
    deepForEach({ foo: 'bar' }); // should not throw
  });

});
