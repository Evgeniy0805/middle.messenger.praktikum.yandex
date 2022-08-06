interface EventBus {
    listeners: Record<string, any>
}

class EventBus {
    constructor() {
        this.listeners = {};
    };

    on(event: string, callback: any) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        };
        this.listeners[event].push(callback);
    };

    off(event: string, callback: any) {
        if (this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
        } 
    };

    emit(event: string, ...args: any) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(...args));
        } else {
            throw new Error('Event not find');
        };
    };
};

export default EventBus;

export {EventBus};