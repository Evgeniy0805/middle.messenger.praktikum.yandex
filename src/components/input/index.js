import input from "./input.hbs";
import './input.scss'
import Component from '../../utils/Component';

class Input extends Component {
    constructor(props) {
        super('div', props);
    };

    addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach(eventName => {
            this._element.firstElementChild.addEventListener(eventName, events[eventName]);
        });
    };

    removeEvents() {
        const { events = {} } = this.props;
        if (this._element.firstElementChild) {
            Object.keys(events).forEach(eventName => {
                this._element.firstElementChild.removeEventListener(eventName, events[eventName]);
            });
        }
    };

    render() {
        return this.compile(input, this.props);
    };
}

export default Input;
