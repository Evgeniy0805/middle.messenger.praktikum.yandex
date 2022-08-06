import button from './button.hbs';
import './button.scss'
import Component from '../../utils/Component';

class Button extends Component {
    constructor(props) {
        super('button', props);
    };

    render() {
        return this.compile(button, this.props);
    };
}

export default Button;
