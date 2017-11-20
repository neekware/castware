'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var errors = require('../dist/errors.js');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.window.localStorage = global.window.sessionStorage = {
    getItem: function (key) {
        return this[key];
    },
    setItem: function (key, value) {
        this[key] = value;
    },
    removeItem: function (key, value) {
        delete this[key];
    }
};
function func1(action, payload) { };
function func2(action, payload) { };

// describe('registerBroadcastReceiver() function test', () => {
//     it('should not throw exception', () => {
//         var callable = index.registerBroadcastReceiver;
//         expect(callable.bind(callable, [app, func1])).to.not.throw(errors.INVALID_ENVIRONMENT);
//     });
//     it('should throw exception', () => {
//         var callable = index.registerBroadcastReceiver;
//         expect(callable.bind(callable, [app, func1])).to.throw(errors.APP_NOT_REGISTERED);
//     });
// });

describe('registerBroadcastReceiver() function test', () => {
    before(() => {
        index.setBroadcastEnv(global.window);
        index.registerApp('app1');
    })
    after(() => {
        index.deregisterApp('app1');
    })
    it('should not throw exception', () => {
        var callable = index.registerBroadcastReceiver;
        expect(callable.bind(callable, ['app1', func1])).to.not.throw(errors.INVALID_ENVIRONMENT);
    });
    it('should throw exception', () => {
        var callable = index.registerBroadcastReceiver;
        expect(callable.bind(callable, ['app1', func1])).to.throw(errors.APP_NOT_REGISTERED);
    });
});

// describe('broadcastMessage() function test', () => {
//     it('should not throw exception', () => {
//         var app = 'app2';
//         function func1(action, payload) { };
//         var callable = index.broadcastMessage;
//         expect(callable.bind(callable, [app, 'hello', 'world'])).to.not.throw(errors.INVALID_ENVIRONMENT);
//     });
//     it('should throw exception', () => {
//         var callable = index.broadcastMessage;
//         expect(callable.bind(callable, ['app', 'hello', 'world'])).to.throw(errors.IMPROPERLY_CONFIGURED);
//     });
// });

// describe('setBroadcastEnv() function test', () => {
//     it('should not throw exception', () => {
//         var callable = index.setBroadcastEnv;
//         expect(callable.bind(callable, global.window)).to.not.throw(errors.INVALID_ENVIRONMENT);
//     });
//     it('should throw exception', () => {
//         var callable = index.setBroadcastEnv;
//         expect(callable.bind(callable, {})).to.throw(errors.INVALID_ENVIRONMENT);
//     });
// });