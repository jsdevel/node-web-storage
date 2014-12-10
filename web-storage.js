'use strict';

module.exports = function(config) {
  config = config || {};

  var stringify = config.stringify || JSON.stringify;
  var parse = config.parse || JSON.parse;

  var _localStorage = typeof localStorage !== 'undefined'
    ? localStorage
    : {};

  var _sessionStorage = typeof sessionStorage !== 'undefined'
    ? sessionStorage
    : {};

  return {
    localStorage: {
      get: function(key) {
        if (_localStorage[key]) {
          try {
            return parse(_localStorage[key]);
          } catch(e) {
            return null;
          }
        }
      },
      remove: function(key) {
        delete _localStorage[key];
      },
      set: function(key, data) {
        try {
          _localStorage[key] = stringify(data);
          return true;
        } catch(e) {
          return false;
        }
      }
    },

    sessionStorage: {
      get: function(key) {
        if (_sessionStorage[key]) {
          try {
            return parse(_sessionStorage[key]);
          } catch(e) {
            return null;
          }
        }
      },
      remove: function(key) {
        delete _sessionStorage[key];
      },
      set: function(key, data) {
        try {
          _sessionStorage[key] = stringify(data);
          return true;
        } catch(e) {
          return false;
        }
      }
    }
  };
};
