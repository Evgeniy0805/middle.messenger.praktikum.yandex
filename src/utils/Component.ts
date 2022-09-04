import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

abstract class Component<Props extends {} | boolean>{

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    private _id: string;
    protected props: Record<string, object>
    private _children: object;
    private _meta: object;
    public _element: HTMLElement;
    private eventBus: any
    public isValid?: boolean
    public value?: string

    public constructor(tagName: string = 'div', propsAndChildren: Props) {
        const eventBus = new EventBus();
        this._id = uuidv4();
        const { props, children } = this.getChildren(propsAndChildren);
        this.props = props;
        this._children = children;
        this.initChildren();
        this.eventBus = () => eventBus;
        this.props = this._makePropsProxy(props, this.eventBus);

        this._meta = {
            tagName,
            props
        }
        this._registerEvents(eventBus);
        

        eventBus.emit(Component.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
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

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    };

    private _componentDidMount() {
        return this._componentDidMount();
    };

    componentDidMount() {
        return true;
    };

    private _componentDidUpdate() {
        const response = this.componentDidUpdate();
        if (response) {
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        };
    };

    componentDidUpdate() {
        return true;
    };

    private _render() {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addEvents();
        this.addAttribute();
    };

    render() {
        return document.createDocumentFragment();
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

    public compile(template: any, props: object) {
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
                    const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child[i]._id}"]`);
                    if(stub) {
                        stub.replaceWith(child[i].getContent());
                    };
                };
            } else {
                const stub = (fragment as HTMLTemplateElement).content.querySelector(`[data-id="${child._id}"]`)

                if(stub) {
                    stub.replaceWith(child.getContent());
                };
            };
            
        });

        return (fragment as HTMLTemplateElement).content;
    }

    public setProps = (nextProps) => {
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

    private _makePropsProxy = (props, eventBus) => {
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
                eventBus().emit(Component.EVENTS.FLOW_CDU);
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

    public show() {
        this.getContent()!.style.display = "block";
    };
    
    public hide() {
        this.getContent()!.style.display = "none";
    };
};

export default Component;
