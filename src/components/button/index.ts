import button from './button.hbs';
import './button.scss'
import Component from '../../utils/Component';

type ButtonProps = {
    text:string,
    attr?: Record<'class', string>,
    events?: Record<'click', (e: Event) => void>
};

class Button extends Component<ButtonProps>{
    public constructor(props: ButtonProps) {
        super('button', props);
    };

    render() {
        return this.compile(button, this.props);
    };
}

export default Button;
