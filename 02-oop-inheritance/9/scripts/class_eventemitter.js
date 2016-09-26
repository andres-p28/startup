export class EventEmitter {
    constructor() {
        this.events = new Map(); 
    }

    on (eventName, listener) {
        if (this.events.has(eventName)) {
            this.events.get(eventName).push(listener);
        }
        else {
            this.events.set(eventName, [listener]);
       
        }
    }

    emit(eventName, args) {
        let i;
        const listeners = this.events.get(eventName);
        for (i = 0; i < listeners.length; i++) {
            listeners[i]((`The ${eventName} has been emited`), args);        
        }
    }

    off(eventName) {
        this.events.delete(eventName);
    }
}
