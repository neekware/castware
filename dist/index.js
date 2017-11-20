"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_1 = require("./broadcast");
var errors = require("./errors");
var broadcastEnv = null;
var broadcastInstances = {};
/**
 * @Method: Returns void.
 * @Param {Window}
 * @Return {void}
 */
exports.setBroadcastEnv = function (env) {
    if (env.hasOwnProperty('addEventListener') && env.hasOwnProperty('localStorage')) {
        broadcastEnv = env;
    }
    else {
        throw new Error(errors.INVALID_ENVIRONMENT);
    }
};
/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
exports.registerApp = function (app) {
    if (!broadcastInstances.hasOwnProperty(app)) {
        broadcastInstances[app] = new broadcast_1.BroadcastService(app, broadcastEnv);
    }
    else {
        throw new Error(errors.APP_ALREADY_REGISTERED + " (" + app + ")");
    }
};
/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
exports.deregisterApp = function (app) {
    if (broadcastInstances.hasOwnProperty(app)) {
        delete broadcastInstances[app];
    }
};
/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
exports.registerBroadcastReceiver = function (app, fn) {
    if (!broadcastInstances.hasOwnProperty(app)) {
        throw new Error(errors.APP_NOT_REGISTERED);
    }
    broadcastInstances[app].registerBroadcastReceiver(fn);
};
/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
exports.deregisterBroadcastReceiver = function (app, fn) {
    if (broadcastInstances.hasOwnProperty(app)) {
        delete broadcastInstances[app];
    }
};
/**
 * @Method: Returns void.
 * @Params {string, string, any}
 * @Return {void}
 */
exports.broadcastMessage = function (app, action, payload) {
    if (!broadcastInstances.hasOwnProperty(app)) {
        throw new Error(errors.IMPROPERLY_CONFIGURED);
    }
    broadcastInstances[app].broadcast(action, payload);
};
