/**
 * @Method: Returns void.
 * @Param {Window}
 * @Return {void}
 */
export declare const setBroadcastEnv: (env: any) => void;
/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
export declare const registerApp: (app: string) => void;
/**
 * @Method: Returns void.
 * @Params {string}
 * @Return {void}
 */
export declare const deregisterApp: (app: string) => void;
/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
export declare const registerBroadcastReceiver: (app: string, fn: (action: string, payload: any) => void) => void;
/**
 * @Method: Returns void.
 * @Params {string, function}
 * @Return {void}
 */
export declare const deregisterBroadcastReceiver: (app: string, fn: (action: string, payload: any) => void) => void;
/**
 * @Method: Returns void.
 * @Params {string, string, any}
 * @Return {void}
 */
export declare const broadcastMessage: (app: string, action: string, payload: any) => void;
