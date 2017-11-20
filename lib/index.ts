import { BroadcastService } from "./broadcast";
import * as errors from './errors';

var broadcastEnv: any = null;
var broadcastInstances: { [key: string]: BroadcastService } = {};

/**
 * @Method: Returns void.
 * @Param {Window}
 * @Return {void}
 */
export const setBroadcastEnv = (env: any) => {
	if (env.hasOwnProperty('addEventListener') && env.hasOwnProperty('localStorage')) {
		broadcastEnv = env;
	} else {
		throw new Error(errors.INVALID_ENVIRONMENT);
	}
}

/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
export const registerApp = (app: string): void => {
	if (!broadcastInstances.hasOwnProperty(app)) {
		broadcastInstances[app] = new BroadcastService(app, broadcastEnv);
	} else {
		throw new Error(`${errors.APP_ALREADY_REGISTERED} (${app})`);
	}
}

/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
export const deregisterApp = (app: string): void => {
	if (broadcastInstances.hasOwnProperty(app)) {
		delete broadcastInstances[app];
	}
}

/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
export const registerBroadcastReceiver = (app: string, fn: (action: string, payload: any) => void): void => {
	if (!broadcastInstances.hasOwnProperty(app)) {
		throw new Error(errors.APP_NOT_REGISTERED);
	}
	broadcastInstances[app].registerBroadcastReceiver(fn);
}

/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
export const deregisterBroadcastReceiver = (app: string, fn: (action: string, payload: any) => void): void => {
	if (broadcastInstances.hasOwnProperty(app)) {
		delete broadcastInstances[app];
	}
}

/**
 * @Method: Returns void.
 * @Params {string, string, any}
 * @Return {void}
 */
export const broadcastMessage = (app: string, action: string, payload: any): void => {
	if (!broadcastInstances.hasOwnProperty(app)) {
		throw new Error(errors.IMPROPERLY_CONFIGURED);
	}
	broadcastInstances[app].broadcast(action, payload);
}