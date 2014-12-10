'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();

var localStorage = global.localStorage = {};
var sessionStorage = global.sessionStorage = {};

describe('web-storage', function(){
  var sut = require('../web-storage');

  beforeEach(function(){
    Object.keys(localStorage).forEach(function(key) {
      delete localStorage[key];
    });

    Object.keys(sessionStorage).forEach(function(key) {
      delete sessionStorage[key];
    });
  });

  it('should be a factory', function(){
    sut.should.be.a('function');
  });

  describe('instance config', function(){
    var instance;

    describe('.parse', function(){
      it('should change the parse behavior', function(){
        instance = sut({parse: function() {return 'foo';}});

        instance.localStorage.set('wow', 5);
        instance.sessionStorage.set('wow', 5);

        instance.localStorage.get('wow').should.equal('foo');
        instance.sessionStorage.get('wow').should.equal('foo');
      });
    });

    describe('.stringify', function(){
      it('should change the stringify behavior', function(){
        instance = sut({stringify: function() {return 'boo';}});

        instance.localStorage.set('wow', 5);
        instance.sessionStorage.set('wow', 5);

        localStorage.wow.should.equal('boo');
        sessionStorage.wow.should.equal('boo');
      });
    });
  });

  describe('instance', function(){
    var instance;

    beforeEach(function(){
      instance = sut();
    });

    it('should have localStorage', function(){
      instance.localStorage.should.be.an.object;
    });

    it('should have sessionStorage', function(){
      instance.sessionStorage.should.be.an.object;
    });

    ['localStorage', 'sessionStorage'].forEach(function(storageType) {
      var storage = global[storageType];

      describe('.' + storageType, function(){
        describe('.get()', function(){
          it('should return undefined if nothing exists', function(){
            expect(instance[storageType].get('foo')).to.be.undefined;
          });

          it('should return valid JSON data', function(){
            global[storageType].foo = '5';
            instance[storageType].get('foo').should.equal(5);
          });

          it('should return null for invalid JSON data', function(){
            global[storageType].foo = '///@@@@';
            expect(instance[storageType].get('foo')).to.be.null;
          });
        });

        describe('.set()', function(){
          it('should set and return true for valid JSON', function(){
            var result = instance[storageType].set('foo', null);

            expect(global[storageType].foo).to.equal('null');
            expect(result).to.be.true;
          });

          it('should return false for invalid JSON', function(){
            var circular = {};
            var result;

            circular.circular = circular;
            result = instance[storageType].set('foo', circular);

            expect(global[storageType].foo).to.be.undefined;
            expect(result).to.be.false;
          });
        });

        describe('.remove()', function(){
          it('should remove an item from storage', function(){
            instance[storageType].set('foo', 5);
            expect(global[storageType].foo).to.equal('5');
            instance[storageType].remove('foo');
            expect(global[storageType].foo).to.be.undefined;
          });
        });
      });
    });
  });
});
