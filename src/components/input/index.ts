import input from "./input.hbs";
import './input.scss'
import Component from '../../utils/Component';

type InputProps = {
    inputClass: string | null,
    type: string,
    placeholder: string,
    inputName: string,
    inputIconClass: string | null,
    urlImg: string | null,
    attr: object,
    events?: object,
};

class Input extends Component<InputProps> {
    constructor(props: InputProps) {
        super('div', props);
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
        return this.compile(input, this.props);
    };

    addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element.firstElementChild)
                this._element.firstElementChild.addEventListener(eventName, events[eventName]);
        });
    };

    removeEvents() {
        const { events = {} } = this.props;
        if (this._element.firstElementChild) {
            Object.keys(events).forEach(eventName => {
                if (this._element.firstElementChild)
                    this._element.firstElementChild.removeEventListener(eventName, events[eventName]);
            });
        }
    };
}

export default Input;
