'use strict';

var fs = require('fs');
var util = require('util');

util.promisify(fs.readFile)('../package.json').then(JSON.parse).then(function (data) {
  console.log(data);
});
//# sourceMappingURL=promise.js.map