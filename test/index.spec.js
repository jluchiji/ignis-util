/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

var Chai           = require('chai');
Chai.use(require('sinon-chai'));
Chai.use(require('chai-as-promised'));

require('./deep-for-each.spec.js');
require('./error-is.spec.js');
require('./expressify.spec.js');
require('./unpromisify.spec.js');
require('./is-generator.spec.js');
