var jshint = require('jshint').JSHINT;
var EventEmitter = require('events').EventEmitter;

function check(file, fileName) {
  var errors = this.linter.check(file, this.options) ? [] : this.linter.check.errors;
  return createCheckedFile(fileName, errors);
}

function create(options) {
  if (!options) { throw new TypeError('options is required (at least an empty object)'); }
  return Object.create(this, {
    options: { value: options },
    linter: { value: { check: jshint } }
  });
}

function validateParams(name, errors) {
  if (typeof name !== 'string') {
    throw new Error('fileName is required');
  }
  if (!Array.isArray(errors)) {
    throw new Error('errors array is required (can be empty though)');
  }
}

function createCheckedFile(name, errors) {
  validateParams(name, errors);
  return Object.create(this, {
    name: { value: name },
    errors: { value: errors }
  });
}

module.exports = new EventEmitter();
module.exports.create = create;
module.exports.check = check;
