import {
  INVALID_ENVIRONMENT,
  RECEIVER_ALREADY_REGISTERED
} from './errors';

export class BroadcastService {
  private env: any = null;
  private date = new Date;
  private storageSignature = 'BroadcastService';
  private broadcastMessageReceiversList: { (action: string, payload: any): void }[] = [];

  constructor(app: string, env?: any) {
    this.storageSignature = `${this.storageSignature}-${app}`;
    if (env.hasOwnProperty('addEventListener')) {
      this.env = env;
    } else {
      throw new Error(INVALID_ENVIRONMENT);
    }
    this.handleLocalStorageBroadcastEvents();
  }

  private getUniqueBroadcastKey() {
    return `${this.storageSignature}:::${this.date.getMilliseconds()}`;
  }

  private validateBroadcastMessage(event: StorageEvent): Object | boolean {
    try {
      if ((event.key || '').split(':::')[0] === this.storageSignature) {
        if (typeof (event.newValue) === 'string') {
          return JSON.parse(event.newValue);
        }
      }
    } catch (e) { }
    return false;
  }

  private broadcastMessage(action: string, payload: any) {
    this.broadcastMessageReceiversList.forEach(fn => {
      fn(action, payload);
    });
  }

  private handleLocalStorageBroadcastEvents = () => {
    this.env.addEventListener('storage', (event: StorageEvent) => {
      const newValue = this.validateBroadcastMessage(event);
      if (newValue) {
        try {
          const { action, payload } = <any>newValue;
          this.broadcastMessage(action, payload);
        } catch (e) {
          console.error(e);
        }
      }
    }, false);
  }

  /**
   * @Method: Returns void
   * @Param {function}
   * @Return {void}
   */
  registerBroadcastReceiver(fn: (action: string, payload: any) => void): void {
    if (this.broadcastMessageReceiversList.filter(func => func === fn).length > 0) {
      throw new Error(RECEIVER_ALREADY_REGISTERED);      
    }
    this.broadcastMessageReceiversList.push(fn);
  }

  /**
   * @Method: Returns void
   * @Param {function}
   * @Return {void}
   */
  deregisterBroadcastReceiver(fn: (action: string, payload: any) => void): void {
    this.broadcastMessageReceiversList = this.broadcastMessageReceiversList.filter(func => func !== fn);
  }

  /**
   * @Method: Returns void
   * @Param {action, payload}
   * @Return {void}
   */
  broadcast(action: string, payload: any) {
    if (action) {
      const data = JSON.stringify({ action: action, payload: payload });
      const key = this.getUniqueBroadcastKey();
      this.env.localStorage.setItem(key, data);
      this.env.localStorage.removeItem(key);
    }
  }

}
