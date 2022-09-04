import EventBus from "./EventBus";

type Indexed<T = unknown> = {
    [key in string]: T;
};
  
function setValue(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof(path) != 'string') {
        throw new Error('path must be string');
    };
    if (typeof(object) != 'object') {
        return object;
    }
    const pathArr: string[] = path.split('.');
    const newArr = pathArr.reduceRight((acc, curr) => {
        let obj: any = {}
        obj[curr] = acc;
        return obj;
    }, value);
    return Object.assign(object as object, newArr)
};

export enum StoreEvents {
    Updated = 'updated',
    UpdatedMessages = 'updatedMessages'
};

class Store extends EventBus {
    private state: Indexed = {};
  
    public getState() {
      return this.state;
    }
  
    public set(path: string, value: unknown) {
        setValue(this.state, path, value);
        this.emit(StoreEvents.Updated);
    };
};

export default new Store();