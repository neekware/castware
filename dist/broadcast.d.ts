export declare class BroadcastService {
    private env;
    private date;
    private storageSignature;
    private broadcastMessageReceiversList;
    constructor(app: string, env?: any);
    private getUniqueBroadcastKey();
    private validateBroadcastMessage(event);
    private broadcastMessage(action, payload);
    private handleLocalStorageBroadcastEvents;
    /**
     * @Method: Returns void
     * @Param {function}
     * @Return {void}
     */
    registerBroadcastReceiver(fn: (action: string, payload: any) => void): void;
    /**
     * @Method: Returns void
     * @Param {function}
     * @Return {void}
     */
    deregisterBroadcastReceiver(fn: (action: string, payload: any) => void): void;
    /**
     * @Method: Returns void
     * @Param {action, payload}
     * @Return {void}
     */
    broadcast(action: string, payload: any): void;
}
