/**
 * test/util/expressify.spec.js
 *
 * @author  Denis-Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

const Sinon          = require('sinon');
const Chai           = require('chai');
const Bluebird       = require('bluebird');

Chai.use(require('chai-as-promised'));
const expect         = Chai.expect;

const expressify     = require('../lib/expressify');


describe('expressify(2)', function() {

  it('should produce an express middleware', function() {
    const fn = Sinon.spy(function() { return Bluebird.resolve('foo'); });
    const next = Sinon.spy();
    const res = { };
    res.status = Sinon.spy(function() { return res; });
    res.send   = Sinon.spy(function() { return res; });

    const wrapped = expressify(fn);

    expect(wrapped).to.be.a('function');
    return wrapped(null, res, next).finally(function() {
      expect(fn.calledOnce).to.equal(true);
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.calledWith(200)).to.equal(true);
      expect(res.send.calledOnce).to.equal(true);
      expect(res.send.calledWith('foo')).to.equal(true);
      expect(next.callCount).to.equal(1);
    });

  });

  it('should correctly propagate errors', function() {
    const err = new Error();
    const fn = Sinon.spy(function() { return Bluebird.reject(err); });
    const next = Sinon.spy();
    const res = { };
    res.status = Sinon.spy(function() { return res; });
    res.send   = Sinon.spy(function() { return res; });

    const wrapped = expressify(fn);

    expect(wrapped).to.be.a('function');
    return wrapped(null, res, next).finally(function() {
      expect(res.status.callCount).to.equal(0);
      expect(res.send.callCount).to.equal(0);
      expect(next.calledOnce).to.equal(true);
      expect(next.calledWith(err)).to.equal(true);
    });

  });

  it('should support custom status codes', function() {
    const fn = Sinon.spy(function() { return Bluebird.resolve('foo'); });
    const next = Sinon.spy();
    const res = { };
    res.status = Sinon.spy(function() { return res; });
    res.send   = Sinon.spy(function() { return res; });

    const wrapped = expressify(fn, null, 999);

    expect(wrapped).to.be.a('function');
    return wrapped(null, res, next).finally(function() {
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.calledWith(999)).to.equal(true);
    });
  });

});
