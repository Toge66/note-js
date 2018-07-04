'use strict';

var _fs = require('fs');

var _path = require('path');

var _util = require('util');

(0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json')).then(JSON.parse).then(function (data) {
    console.log(data);
    (0, _fs.writeFile)((0, _path.resolve)(__dirname, '../name.txt'), data.name);
});
//# sourceMappingURL=index.js.map