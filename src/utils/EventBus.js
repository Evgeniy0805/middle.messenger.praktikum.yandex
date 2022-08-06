class EventBus {
    constructor() {
        this.listeners = [];
    };

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        };
        this.listeners[event].push(callback);
    };

    off(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
        } 
    };

    emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(...args));
        } else {
            throw new Error('Event not find');
        };
    };
};

export default EventBus;

export {EventBus};