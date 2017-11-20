"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var BroadcastService = /** @class */ (function () {
    function BroadcastService(app, env) {
        var _this = this;
        this.env = null;
        this.date = new Date;
        this.storageSignature = 'BroadcastService';
        this.broadcastMessageReceiversList = [];
        this.handleLocalStorageBroadcastEvents = function () {
            _this.env.addEventListener('storage', function (event) {
                var newValue = _this.validateBroadcastMessage(event);
                if (newValue) {
                    try {
                        var _a = newValue, action = _a.action, payload = _a.payload;
                        _this.broadcastMessage(action, payload);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }, false);
        };
        this.storageSignature = this.storageSignature + "-" + app;
        if (env.hasOwnProperty('addEventListener')) {
            this.env = env;
        }
        else {
            throw new Error(errors_1.INVALID_ENVIRONMENT);
        }
        this.handleLocalStorageBroadcastEvents();
    }
    BroadcastService.prototype.getUniqueBroadcastKey = function () {
        return this.storageSignature + ":::" + this.date.getMilliseconds();
    };
    BroadcastService.prototype.validateBroadcastMessage = function (event) {
        try {
            if ((event.key || '').split(':::')[0] === this.storageSignature) {
                if (typeof (event.newValue) === 'string') {
                    return JSON.parse(event.newValue);
                }
            }
        }
        catch (e) { }
        return false;
    };
    BroadcastService.prototype.broadcastMessage = function (action, payload) {
        this.broadcastMessageReceiversList.forEach(function (fn) {
            fn(action, payload);
        });
    };
    /**
     * @Method: Returns void
     * @Param {function}
     * @Return {void}
     */
    BroadcastService.prototype.registerBroadcastReceiver = function (fn) {
        if (this.broadcastMessageReceiversList.filter(function (func) { return func === fn; }).length > 0) {
            throw new Error(errors_1.RECEIVER_ALREADY_REGISTERED);
        }
        this.broadcastMessageReceiversList.push(fn);
    };
    /**
     * @Method: Returns void
     * @Param {function}
     * @Return {void}
     */
    BroadcastService.prototype.deregisterBroadcastReceiver = function (fn) {
        this.broadcastMessageReceiversList = this.broadcastMessageReceiversList.filter(function (func) { return func !== fn; });
    };
    /**
     * @Method: Returns void
     * @Param {action, payload}
     * @Return {void}
     */
    BroadcastService.prototype.broadcast = function (action, payload) {
        if (action) {
            var data = JSON.stringify({ action: action, payload: payload });
            var key = this.getUniqueBroadcastKey();
            this.env.localStorage.setItem(key, data);
            this.env.localStorage.removeItem(key);
        }
    };
    return BroadcastService;
}());
exports.BroadcastService = BroadcastService;
