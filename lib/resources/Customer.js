'use strict';
var resource = require('../apiResources');

var customers  = function(config) {
  return resource.resourceActions('customers',
    ['create', 'list', 'retrieve', 'destroy', 'update', 'listCards'],
    {'key': config['secretKey']}
  );
}

module.exports = customers;