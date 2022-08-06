import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

interface Component {
    _id: string,
    props: any,
    _children: object,
    _meta: object,
    _element: HTMLElement,
    eventBus: any
}

class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    constructor(tagName = 'div', propsAndChildren = {}) {
        const eventBus = new EventBus();
        this._id = uuidv4();
        const { props, children } = this.getChildren(propsAndChildren);
        this.props = props;
        this._children = children;
        this.initChildren();
        this.props = this._makePropsProxy(props);

        this._meta = {
            tagName,
            props
        }
        this._registerEvents(eventBus);
        this.eventBus = () => eventBus;

        eventBus.emit(Component.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    };

    init() {
        const {tagName}: any = this._meta;
        this._element = this._createDocumentElement(tagName);
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER)
    };

    getChildren(propsAndChildren) {
        const children = {};
        const props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
                
            if (value instanceof Component) {
                children[key] = value;
            } else if (Array.isArray(value) && value.every( value => value instanceof Component)) {
                children[key] = value; 
            } else {
                props[key] = value;
            };
        });
        return { props, children }
    };

    initChildren() {}

    _createDocumentElement(tagName) {
        return document.createElement(tagName);
    };

    _componentDidMount() {
        return this._componentDidMount();
    };

    componentDidMount() {
        return true;
    };

    _componentDidUpdate() {
        return this._componentDidUpdate();
    };

    componentDidUpdate() {
        return true;
    };

    _render() {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addEvents();
        this.addAttribute();
    };

    render() {
        return document.createElement('div');
    };

    addAttribute() {
        const {attr = {}} : {attr?: Record<string, string> | undefined} = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, value);
        });
    };

    addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    };

    removeEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    };

    compile(template, props) {
        if(typeof(props) === 'undefined') {
            props = this.props;
        }
        const propsAndStubs = {...props};
        Object.entries(this._children).forEach(([key, child]) => {
            if(Array.isArray(child)) {
                propsAndStubs[key] = [];
                for (let i = 0; i < child.length; i++) {
                    propsAndStubs[key][i] = (`<div data-id="${child[i]._id}"></div>`);
                }
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
        });
        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = template(propsAndStubs);

        Object.values(this._children).forEach(child => {
            if (Array.isArray(child)) {
                for (let i = 0; i < child.length; i++) {
                    const stub = fragment.content.querySelector(`[data-id="${child[i]._id}"]`);
                    if(stub) {
                        stub.replaceWith(child[i].getContent());
                    };
                };
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

                if(stub) {
                    stub.replaceWith(child.getContent());
                };
            };
            
        });

        return fragment.content;
    }

    setProps = nextProps => {
        if (!nextProps) {
            return;
        };
        Object.assign(this.props, nextProps);
    };

    getElement() {
        return this._element;
    };

    getContent() {
        return this._element;
    }

    _makePropsProxy(props) {
        const self = this;
        const prop = new Proxy(props, {
            get(target, prop: string) {
                if (prop.startsWith('_')) {
                    throw new Error('Unavailable property');
                };
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                if (prop.startsWith('_')) {
                    throw new Error('Unavailable property');
                };
                target[prop] = value;
                self.eventBus().emit(Component.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty(): any {
                if (prop.startsWith('_')) {
                    throw new Error('Unavailable property');
                };
            }
        })
        return prop;
    };
};

export default Component;

export {Component};